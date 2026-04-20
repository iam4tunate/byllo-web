"use client";

import { Button } from "@/components/Button";
import ErrorMsg from "@/components/ErrorMsg";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api/auth";
import { signIn } from "next-auth/react";

export default function SIgnUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.firstName.trim() ||
      !formData.lastName.trim()
    ) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      await authApi.signup({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: "vendor",
      });
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email.trim(),
        password: formData.password,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      router.push(`/verify-email`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to sign up. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 mb-10">
        <h2 className="text-[32px] font-extrabold text-primary tracking-tight">
          Create an account
        </h2>
        <p className="text-base text-muted font-medium">
          Join Byllo and start managing your business effortlessly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <ErrorMsg error={error} />}
        <div className="flex gap-4">
          <Input
            id="firstName"
            type="text"
            label="First name"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            disabled={isLoading}
            required
          />
          <Input
            id="lastName"
            type="text"
            label="Last name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            disabled={isLoading}
            required
          />
        </div>
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
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          disabled={isLoading}
          hint="Must be at least 6 characters long."
          required
        />

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full mt-4 shadow-lg shadow-brand/25 active:scale-[0.98] transition-all"
        >
          Get Started
        </Button>
      </form>

      <div className="mt-8 text-center text-sm font-medium text-ink-tertiary">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-brand font-bold hover:text-brand-dark transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
