import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    token: string;
    // refresh_token?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    emailVerified?: boolean;
    role: string;
  }
  
  interface Session {
    user: {
      token: string;
    //   refresh_token?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      emailVerified?: boolean;
      role: string;
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token?: string;
    // refresh_token?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    emailVerified?: boolean;
    role?: string;
  }
}
