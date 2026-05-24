import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

export const resend = new Proxy({} as Resend, {
  get: (_, prop) => {
    const client = getResend();
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? (value as Function).bind(client) : value;
  },
});

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
