import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _public: SupabaseClient | null = null;
let _admin: SupabaseClient | null = null;

export function getSupabasePublic(): SupabaseClient {
  if (!_public) {
    _public = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _public;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    _admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
  }
  return _admin;
}

function lazyProxy(getter: () => SupabaseClient): SupabaseClient {
  return new Proxy({} as SupabaseClient, {
    get: (_, prop) => {
      const client = getter();
      const value = (client as unknown as Record<string | symbol, unknown>)[prop];
      return typeof value === "function" ? (value as Function).bind(client) : value;
    },
  });
}

export const supabasePublic = lazyProxy(getSupabasePublic);
export const supabaseAdmin = lazyProxy(getSupabaseAdmin);
