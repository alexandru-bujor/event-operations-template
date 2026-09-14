import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Search } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge, { statusTone } from "@/components/ui/StatusBadge";

export default function Piloti() {
    const { DRIVERS } = useApp();
    const nav = useNavigate();
    const [q, setQ] = useState("");
    const [group, setGroup] = useState("ALL");
    const filtered = DRIVERS.filter((d) =>
        (group === "ALL" || d.group === group) &&
        (d.name.toLowerCase().includes(q.toLowerCase()) || d.number.includes(q) || d.car.toLowerCase().includes(q.toLowerCase()))
    );

    return (
        <div>
            <PageHeader title="Piloți" subtitle={`${DRIVERS.length} piloți înscriși`} icon={Users} />
            <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută pilot, număr, mașină…" className="bg-transparent text-sm outline-none w-56" />
                </div>
                {["ALL", "A", "B"].map((g) => (
                    <button key={g} onClick={() => setGroup(g)} className={`px-3 py-2 rounded-lg text-sm font-semibold border ${group === g ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>{g === "ALL" ? "Toate" : `Grupa ${g}`}</button>
                ))}
            </div>
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                    <thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border bg-secondary/30">
                        <th className="py-3 px-3 font-semibold">#</th><th className="py-3 px-3 font-semibold">Pilot</th><th className="py-3 px-3 font-semibold">Mașină</th><th className="py-3 px-3 font-semibold">Grupa</th><th className="py-3 px-3 font-semibold">Tehnic</th><th className="py-3 px-3 font-semibold">Fun Day</th><th className="py-3 px-3 font-semibold">Competiție</th><th className="py-3 px-3 font-semibold">Drift Taxi</th><th className="py-3 px-3 font-semibold">Status</th>
                    </tr></thead>
                    <tbody className="divide-y divide-border">
                    {filtered.map((d) => (
                        <tr key={d.id} onClick={() => nav(`/pilot/${d.id}`)} className="hover:bg-secondary/30 cursor-pointer">
                            <td className="py-2.5 px-3"><span className="font-mono font-bold text-primary">#{d.number}</span></td>
                            <td className="py-2.5 px-3 font-medium">{d.name}</td>
                            <td className="py-2.5 px-3 text-muted-foreground">{d.car}</td>
                            <td className="py-2.5 px-3"><StatusBadge tone={d.group === "A" ? "sky" : "amber"}>Grupa {d.group}</StatusBadge></td>
                            <td className="py-2.5 px-3"><StatusBadge tone={statusTone(d.techStatus)}>{d.techStatus}</StatusBadge></td>
                            <td className="py-2.5 px-3 text-muted-foreground">{d.funDay}</td>
                            <td className="py-2.5 px-3"><StatusBadge tone={d.competition === "Registered" ? "emerald" : "amber"}>{d.competition}</StatusBadge></td>
                            <td className="py-2.5 px-3"><StatusBadge tone={d.driftTaxi === "Enabled" ? "emerald" : "slate"}>{d.driftTaxi}</StatusBadge></td>
                            <td className="py-2.5 px-3"><StatusBadge tone={statusTone(d.status)} dot>{d.status}</StatusBadge></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}