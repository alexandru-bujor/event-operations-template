import React from "react";
import { ScrollText, Search } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { useState } from "react";

export default function AuditLog() {
    const { audit } = useApp();
    const [q, setQ] = useState("");
    const rows = audit.filter((a) => !q || a.action.toLowerCase().includes(q.toLowerCase()) || a.user.toLowerCase().includes(q.toLowerCase()) || a.entity.toLowerCase().includes(q.toLowerCase()));
    return (
        <div>
            <PageHeader title="Audit Log" subtitle="Jurnal operațional" icon={ScrollText} />
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card mb-4 w-72">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filtru…" className="bg-transparent text-sm outline-none flex-1" />
            </div>
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                    <thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border bg-secondary/30">
                        <th className="py-3 px-3 font-semibold">Timp</th><th className="py-3 px-3 font-semibold">Utilizator</th><th className="py-3 px-3 font-semibold">Rol</th><th className="py-3 px-3 font-semibold">Acțiune</th><th className="py-3 px-3 font-semibold">Entitate</th><th className="py-3 px-3 font-semibold">Rezultat</th>
                    </tr></thead>
                    <tbody className="divide-y divide-border">
                    {rows.map((a, i) => (
                        <tr key={i} className="hover:bg-secondary/30">
                            <td className="py-2.5 px-3 font-mono text-xs text-muted-foreground tabular">{a.time}</td>
                            <td className="py-2.5 px-3 font-medium">{a.user}</td>
                            <td className="py-2.5 px-3 text-muted-foreground">{a.role}</td>
                            <td className="py-2.5 px-3">{a.action}</td>
                            <td className="py-2.5 px-3 text-muted-foreground">{a.entity}</td>
                            <td className="py-2.5 px-3"><StatusBadge tone={String(a.result).match(/GRANTED|PASS|OK|Qualified/i) ? "emerald" : String(a.result).match(/DENIED|FAIL|RED/i) ? "red" : "sky"}>{a.result}</StatusBadge></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}