import React from "react";
import { IdCard } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";

export default function Acreditari() {
    const { ACCREDITATION_TYPES, ACCREDITATIONS_SEED } = useApp();
    return (
        <div>
            <PageHeader title="Acreditări" subtitle="Tipuri & zone permise" icon={IdCard} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {ACCREDITATION_TYPES.map((a) => (
                    <div key={a.id} className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between mb-2"><h3 className="font-semibold">{a.name}</h3><StatusBadge tone={a.color}>{a.color}</StatusBadge></div>
                        <div className="flex flex-wrap gap-1.5">{a.zones.map((z) => <span key={z} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">{z}</span>)}</div>
                    </div>
                ))}
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Acreditări emise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {ACCREDITATIONS_SEED.map((a) => {
                    const type = ACCREDITATION_TYPES.find((t) => t.name === a.type);
                    return (
                        <div key={a.id} className="rounded-xl border border-border bg-card p-4">
                            <div className="flex items-center justify-between"><span className="font-mono text-xs text-muted-foreground">{a.id}</span><StatusBadge tone={type?.color || "slate"}>{a.type}</StatusBadge></div>
                            <div className="font-semibold mt-1">{a.holder}</div>
                            <div className="flex flex-wrap gap-1.5 mt-2">{a.zones.map((z) => <span key={z} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">{z}</span>)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}