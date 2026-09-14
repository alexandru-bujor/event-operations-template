import React from "react";
import { HardHat, CheckCircle2, Circle } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";

export default function Staff() {
    const { staff } = useApp();
    const totalPresent = staff.reduce((s, d) => s + d.present, 0);
    const totalTotal = staff.reduce((s, d) => s + d.total, 0);
    return (
        <div>
            <PageHeader title="Staff" subtitle="Check-in pe departamente" icon={HardHat} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                <StatCard label="Prezent" value={totalPresent} tone="emerald" />
                <StatCard label="Total" value={totalTotal} />
                <StatCard label="Rată" value={`${Math.round((totalPresent / totalTotal) * 100)}%`} tone="sky" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staff.map((d) => (
                    <div key={d.id} className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">{d.name}</h3>
                            <span className="text-sm tabular font-bold">{d.present} / {d.total}</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden mb-3"><div className="h-full bg-primary" style={{ width: `${(d.present / d.total) * 100}%` }} /></div>
                        <div className="grid grid-cols-5 gap-1.5">
                            {Array.from({ length: d.total }).map((_, i) => (
                                <div key={i} className={cn("aspect-square rounded flex items-center justify-center", i < d.present ? "bg-emerald-500/20 text-emerald-400" : "bg-secondary text-muted-foreground")}>
                                    {i < d.present ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}