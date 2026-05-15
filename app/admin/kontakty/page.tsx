"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Contact } from "@/types";

const SOURCES = ["manual", "landing_page", "instagram", "facebook", "iný"];

export default function KontaktyPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/contacts");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Nepodarilo sa načítať");
      setContacts(data.contacts);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chyba");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return contacts;
    return contacts.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [contacts, query]);

  async function toggleSubscribed(c: Contact) {
    const next = !c.subscribed;
    setContacts((prev) => prev.map((x) => (x.id === c.id ? { ...x, subscribed: next } : x)));
    const res = await fetch(`/api/contacts/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscribed: next }),
    });
    if (!res.ok) load();
  }

  async function handleDelete(c: Contact) {
    const res = await fetch(`/api/contacts/${c.id}`, { method: "DELETE" });
    if (res.ok) {
      setContacts((prev) => prev.filter((x) => x.id !== c.id));
    }
    setConfirmDelete(null);
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin" className="text-muted hover:text-white text-sm">
          ← Späť na dashboard
        </Link>
        <div className="text-accent text-xs uppercase tracking-widest font-bold">Kontakty</div>
      </div>

      <header className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Správa kontaktov</h1>
          <p className="text-muted text-sm mt-1">{contacts.length} kontaktov celkom</p>
        </div>
        <div className="flex gap-3">
          <a
            href="/api/contacts/export"
            className="px-4 py-2 rounded-md border border-border hover:border-accent transition text-sm"
          >
            Exportovať CSV
          </a>
          <button
            onClick={() => setShowAdd(true)}
            className="px-5 py-2 rounded-md bg-accent hover:bg-accentHover transition font-semibold text-sm"
          >
            + Pridať kontakt
          </button>
        </div>
      </header>

      <input
        placeholder="Hľadať podľa mena alebo emailu..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6"
      />

      {error && (
        <div className="bg-red-950/40 border border-red-900 text-red-300 rounded p-3 mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="bg-panel border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-muted text-sm">Načítavam...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-muted text-sm">
            {contacts.length === 0 ? "Zatiaľ žiadne kontakty." : "Žiadny výsledok."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted text-xs uppercase tracking-widest border-b border-border">
                  <th className="px-4 py-3 font-semibold">Meno</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Telefón</th>
                  <th className="px-4 py-3 font-semibold">Zdroj</th>
                  <th className="px-4 py-3 font-semibold">Prihlásený</th>
                  <th className="px-4 py-3 font-semibold">Dátum</th>
                  <th className="px-4 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-white font-semibold">{c.name}</td>
                    <td className="px-4 py-3 text-soft">{c.email}</td>
                    <td className="px-4 py-3 text-muted">{c.phone || "—"}</td>
                    <td className="px-4 py-3 text-muted">{c.source || "—"}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleSubscribed(c)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          c.subscribed
                            ? "bg-accent/15 text-accent border border-accent/30"
                            : "bg-panel2 text-muted border border-border"
                        }`}
                      >
                        {c.subscribed ? "áno" : "nie"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {new Date(c.created_at).toLocaleDateString("sk-SK")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setConfirmDelete(c)}
                        className="text-muted hover:text-red-400 text-xs"
                      >
                        Zmazať
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAdd && <AddPanel onClose={() => setShowAdd(false)} onAdded={load} />}

      {confirmDelete && (
        <Dialog onClose={() => setConfirmDelete(null)}>
          <div className="text-lg font-bold mb-2">Zmazať kontakt?</div>
          <div className="text-muted text-sm mb-6">
            {confirmDelete.name} ({confirmDelete.email})
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setConfirmDelete(null)}
              className="px-4 py-2 rounded-md border border-border hover:border-accent text-sm"
            >
              Zrušiť
            </button>
            <button
              onClick={() => handleDelete(confirmDelete)}
              className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-sm font-semibold"
            >
              Zmazať
            </button>
          </div>
        </Dialog>
      )}
    </main>
  );
}

function AddPanel({ onClose, onAdded }: { onClose: () => void; onAdded: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("manual");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone: phone || null, source }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setErr(data.error || "Chyba");
      return;
    }
    onAdded();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-w-md bg-panel border-l border-border h-full p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Pridať kontakt</h2>
          <button onClick={onClose} className="text-muted hover:text-white">
            ✕
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
              Meno *
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
              Email *
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
              Telefón
            </label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
              Zdroj
            </label>
            <select value={source} onChange={(e) => setSource(e.target.value)}>
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {err && <div className="text-red-400 text-sm">{err}</div>}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-md bg-accent hover:bg-accentHover disabled:opacity-50 transition font-semibold"
          >
            {saving ? "Ukladám..." : "Pridať"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Dialog({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative bg-panel border border-border rounded-lg p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
