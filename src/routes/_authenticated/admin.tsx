import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";


export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Registrations | Apex Fit Club Admin" },
      { name: "description", content: "Private list of Apex Fit Club registrations." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const [tab, setTab] = useState<"male" | "female">("male");
  const rows = data?.filter((r) => r.gender === tab) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="display text-base font-black uppercase tracking-[0.18em] text-primary">
              Apex Fit Club
            </span>
            <h1 className="text-lg leading-none">Registrations</h1>
          </div>
          <Button variant="secondary" size="sm" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex gap-2" role="tablist" aria-label="Registration section">
          {(
            [
              ["male", "Gents"],
              ["female", "Ladies"],
            ] as const
          ).map(([value, label]) => (
            <Button
              key={value}
              role="tab"
              aria-selected={tab === value}
              variant={tab === value ? "default" : "secondary"}
              size="sm"
              onClick={() => setTab(value)}
            >
              {label} ({data?.filter((r) => r.gender === value).length ?? 0})
            </Button>
          ))}
        </div>

        {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : null}
        {error ? (
          <p className="text-sm text-destructive">
            You don't have permission to view registrations. Ask the owner to grant admin access.
          </p>
        ) : null}
        {data && rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No {tab === "male" ? "gents" : "ladies"} registrations yet.
          </p>
        ) : null}
        {rows.length > 0 ? (
          <div className="surface-card overflow-x-auto rounded-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  {["Date", "Name", "Phone", "ID", "Address", "Plan", "Type"].map((h) => (
                    <th key={h} className="whitespace-nowrap px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-border/60">
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{r.full_name}</td>
                    <td className="whitespace-nowrap px-4 py-3">{r.phone}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {r.id_number ? `${r.id_number} ` : "—"}
                      {r.id_number ? (
                        <span className="text-muted-foreground">({r.id_type})</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">{r.address || "—"}</td>
                    <td className="px-4 py-3">{r.plan ?? "—"}</td>
                    <td className="px-4 py-3">{r.kind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </main>
    </div>
  );
}
