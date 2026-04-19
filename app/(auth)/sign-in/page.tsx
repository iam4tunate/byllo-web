"use client";

import { Button } from "@/components/Button";
import ErrorMsg from "@/components/ErrorMsg";
import { Input } from "@/components/Input";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Email and password are required");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        const session = await getSession();
        console.log("Session",session)
        
        if (session?.user?.emailVerified) {
          router.push("/vendor/dashboard");
        } else {
          router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
        }
        
        router.refresh();
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to login. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 mb-10">
        <h2 className="text-[32px] font-extrabold text-primary tracking-tight">
          Welcome back
        </h2>
        <p className="text-base text-muted font-medium">
          Enter your credentials to access your vendor account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <ErrorMsg error={error} />}
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isLoading}
          required
        />
        <div className="space-y-1.5 w-full">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-ink"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={formData.password}
            placeholder="••••••••"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isLoading}
            required
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full mt-2 shadow-lg shadow-brand/25 active:scale-[0.98] transition-all"
        >
          Sign In
        </Button>
      </form>

      <div className="mt-8 text-center text-sm font-medium text-ink-tertiary">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-brand font-bold hover:text-brand-dark transition-colors"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
