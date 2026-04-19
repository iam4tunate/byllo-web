import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface ExtUser extends User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  emailVerified: boolean;
  role: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in", // Redirects here when user is not authenticated
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const res = await fetch(`${apiUrl}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          const result = await res.json();

          if (res.ok && result.success) {
            const { token, user } = result.data;

            return {
              id: user._id, // Mapping MongoDB _id to NextAuth id
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              emailVerified: user.emailVerified,
              token: token,
              role: user.role,
            };
          }
          return null;
        } catch (error) {
          console.error("Login Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const u = user as ExtUser;
        token.accessToken = u.token;
        token.firstName = u.firstName;
        token.lastName = u.lastName;
        token.emailVerified = u.emailVerified;
        token.role = u.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        const u = session.user as ExtUser;
        u.token = token.accessToken as string;
        u.firstName = token.firstName as string;
        u.lastName = token.lastName as string;
        u.emailVerified = token.emailVerified as boolean;
        u.role = token.role as string;
      }
      return session;
    },
  },
};
