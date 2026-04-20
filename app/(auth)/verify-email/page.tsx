"use client";

import { Button } from "@/components/Button";
import ErrorMsg from "@/components/ErrorMsg";
import { Mail } from "lucide-react";
import { OtpInput } from "@/components/OtpInput";
import { authApi } from "@/lib/api/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

const RESEND_COOLDOWN = 60; // seconds

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, update } = useSession();
  const email = session?.user?.email;
  console.log(session);

  // Resend cooldown
  const [resendSeconds, setResendSeconds] = useState(RESEND_COOLDOWN);
  const [isResending, setIsResending] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setResendSeconds((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  const handleVerify = useCallback(
    async (code: string) => {
      if (isLoading) return;
      setError(null);

      setIsLoading(true);
      try {
        await authApi.verifyEmail({ email, code });
        await update({ emailVerified: true });
        router.push("/vendor/dashboard");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Invalid code. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, router, email, update],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    handleVerify(otp);
  };

  const handleResend = async () => {
    if (resendSeconds > 0 || isResending) return;
    setIsResending(true);
    setError(null);
    try {
      if (!email) {
        throw new Error("Unable to identify email address.");
      }
      await authApi.resendVerification({ email });
      setResendSeconds(RESEND_COOLDOWN);
      setOtp("");
      timerRef.current = setInterval(() => {
        setResendSeconds((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } catch {
      setError("Failed to resend the code. Try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-center mb-8">
        <div className="relative w-16 h-16 flex items-center justify-center rounded-xl bg-brand/10 border border-brand/20 shadow-lg shadow-brand/10">
          <Mail size={36} className="text-brand" strokeWidth={1.75} />
          <span className="absolute -top-1 -right-1 w-4 h-4 flex">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-40" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand border-2 border-white/10" />
          </span>
        </div>
      </div>

      <div className="text-center space-y-2 mb-10">
        <h2 className="text-[32px] font-extrabold text-primary tracking-tight">
          Check your inbox
        </h2>
        <p className="text-base text-muted font-medium">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-ink">{email}</span>.
          <br />
          Enter it below to verify your account.
        </p>
      </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <ErrorMsg error={error} />}

          <OtpInput value={otp} onChange={setOtp} disabled={isLoading} />

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={otp.length < 6}
            className="w-full shadow-lg shadow-brand/25 active:scale-[0.98] transition-all"
          >
            Verify Email
          </Button>

          <div className="text-center text-sm font-medium text-ink-tertiary">
            Didn&apos;t receive a code?{" "}
            {resendSeconds > 0 ? (
              <span className="text-ink-tertiary">
                Resend in{" "}
                <span className="font-bold text-brand tabular-nums">
                  {resendSeconds}s
                </span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-brand font-bold hover:text-brand-dark transition-colors disabled:opacity-50"
              >
                {isResending ? "Sending…" : "Resend code"}
              </button>
            )}
          </div>
        </form>
    </div>
  );
}
