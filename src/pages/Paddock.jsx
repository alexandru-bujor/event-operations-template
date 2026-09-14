import React from "react";
import { Building2, Users, Car, Wrench } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";

export default function Paddock() {
    const { DRIVERS } = useApp();
    const groups = { A: DRIVERS.filter((d) => d.group === "A"), B: DRIVERS.filter((d) => d.group === "B") };
    return (
        <div>
            <PageHeader title="Paddock" subtitle="Organizare boxe piloți" icon={Building2} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                <StatCard label="Piloți în paddock" value={DRIVERS.length} icon={Users} />
                <StatCard label="Boxe ocupate" value={DRIVERS.length} tone="sky" icon={Car} />
                <StatCard label="Mecanici" value={DRIVERS.length} tone="amber" icon={Wrench} />
                <StatCard label="Grupa A / B" value={`${groups.A.length} / ${groups.B.length}`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["A", "B"].map((g) => (
                    <div key={g} className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between mb-3"><h3 className="font-semibold">Grupa {g}</h3><StatusBadge tone={g === "A" ? "sky" : "amber"}>{groups[g].length} piloți</StatusBadge></div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {groups[g].map((d) => (
                                <div key={d.id} className="rounded-lg border border-border p-2.5">
                                    <div className="flex items-center justify-between"><span className="font-mono font-bold text-primary text-sm">#{d.number}</span><StatusBadge tone={d.status === "On Track" ? "amber" : "emerald"}>{d.status === "On Track" ? "Pistă" : "Boxă"}</StatusBadge></div>
                                    <div className="text-xs font-medium mt-1 truncate">{d.name}</div>
                                    <div className="text-[10px] text-muted-foreground truncate">{d.car}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}