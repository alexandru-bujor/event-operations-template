import React from "react";
import { Handshake } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";

export default function Sponsori() {
    const { SPONSORS } = useApp();
    return (
        <div>
            <PageHeader title="Sponsori" subtitle="Pachete & livrări" icon={Handshake} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {SPONSORS.map((s) => (
                    <div key={s.id} className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between mb-2"><h3 className="font-semibold">{s.name}</h3><StatusBadge tone={s.pkg === "Title" ? "amber" : s.pkg === "Gold" ? "amber" : s.pkg === "Silver" ? "slate" : "orange"}>{s.pkg}</StatusBadge></div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                            <div>🎟️ {s.tickets} bilete</div><div>📍 {s.area}</div><div>📋 {s.deliverables}</div>
                        </div>
                        <div className="mt-3"><div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Livrat</span><span>{s.completion}%</span></div><div className="h-1.5 rounded-full bg-secondary overflow-hidden"><div className="h-full bg-primary" style={{ width: `${s.completion}%` }} /></div></div>
                    </div>
                ))}
            </div>
        </div>
    );
}