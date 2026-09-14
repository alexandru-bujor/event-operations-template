import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarFront, Search } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge, { statusTone } from "@/components/ui/StatusBadge";

export default function Masini() {
    const { CARS } = useApp();
    const nav = useNavigate();
    const [q, setQ] = useState("");
    const cars = CARS.filter((c) => c.model.toLowerCase().includes(q.toLowerCase()) || c.driver.toLowerCase().includes(q.toLowerCase()) || c.number.includes(q));

    return (
        <div>
            <PageHeader title="Mașini Drift" subtitle={`${CARS.length} mașini înregistrate`} icon={CarFront} />
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card mb-4 w-72">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută mașină…" className="bg-transparent text-sm outline-none flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cars.map((c) => (
                    <div key={c.id} onClick={() => nav(`/masina/${c.id}`)} className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 cursor-pointer transition">
                        <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-secondary/40 flex items-center justify-center"><span className="text-4xl font-display font-bold text-foreground/15">#{c.number}</span></div>
                        <div className="p-3">
                            <div className="font-semibold text-sm truncate">{c.model}</div>
                            <div className="text-xs text-muted-foreground truncate">{c.driver}</div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted-foreground">{c.power} HP</span>
                                <StatusBadge tone={statusTone(c.techStatus)}>{c.techStatus}</StatusBadge>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}