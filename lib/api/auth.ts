import { api } from "./client";

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  email: string | undefined;
  code: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export const authApi = {
  signup: (data: SignupRequest) =>
    api.post("/auth/signup", data),

  verifyEmail: (data: VerifyEmailRequest) =>
    api.post("/auth/verify-email", data),

  resendVerification: (data: ResendVerificationRequest) =>
    api.post("/auth/resend-verification", data),
};