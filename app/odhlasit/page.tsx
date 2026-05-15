import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Unsubscribe({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email?.trim().toLowerCase();
  let status: "ok" | "missing" | "notfound" | "error" = "missing";

  if (email) {
    const { data, error } = await supabaseAdmin
      .from("contacts")
      .update({ subscribed: false })
      .eq("email", email)
      .select("id")
      .maybeSingle();
    if (error) status = "error";
    else if (!data) status = "notfound";
    else status = "ok";
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-panel border border-border rounded-lg p-8 max-w-md w-full text-center">
        <div className="text-accent text-xs uppercase tracking-widest font-bold mb-3">
          ZAJO Reality
        </div>
        <h1 className="text-2xl font-bold mb-4">Odhlásenie z newslettera</h1>
        {status === "ok" && (
          <p className="text-soft">
            Email <span className="text-accent">{email}</span> bol odhlásený. Ďakujeme, že ste boli s nami.
          </p>
        )}
        {status === "missing" && <p className="text-muted">Chýba parameter emailu.</p>}
        {status === "notfound" && (
          <p className="text-muted">Email nebol nájdený v databáze.</p>
        )}
        {status === "error" && (
          <p className="text-red-400">Niečo sa pokazilo. Skús to neskôr alebo napíš na zajac@zajoreality.sk.</p>
        )}
      </div>
    </main>
  );
}
