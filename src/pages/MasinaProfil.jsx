import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Wrench, AlertTriangle } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import StatusBadge, { statusTone } from "@/components/ui/StatusBadge";
import SectionCard from "@/components/ui/SectionCard";

export default function MasinaProfil() {
    const { id } = useParams();
    const nav = useNavigate();
    const { CARS } = useApp();
    const car = CARS.find((c) => c.id === id) || CARS[0];

    return (
        <div>
            <button onClick={() => nav("/masini")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="w-4 h-4" /> Înapoi la mașini</button>
            <div className="rounded-2xl border border-border bg-card overflow-hidden mb-4">
                <div className="aspect-[16/6] bg-gradient-to-br from-secondary to-secondary/40 flex items-center justify-center"><span className="text-6xl font-display font-bold text-foreground/10">#{car.number}</span></div>
                <div className="p-5">
                    <h1 className="text-2xl font-display font-bold">{car.model}</h1>
                    <div className="text-sm text-muted-foreground">Pilot: {car.driver} · #{car.number}</div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionCard title="Specificații" accent>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <F label="Model" value={car.model} /><F label="Motor" value={car.engine} /><F label="Putere" value={`${car.power} HP`} /><F label="Culoare" value={car.color} /><F label="Număr competiție" value={`#${car.number}`} />
                    </div>
                    <div className="mt-3 flex items-center justify-between"><span className="text-sm text-muted-foreground">Status tehnic</span><StatusBadge tone={statusTone(car.techStatus)}>{car.techStatus}</StatusBadge></div>
                </SectionCard>
                <SectionCard title="Istoric inspecții" accent>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">13.09.2027 10:15</span><StatusBadge tone="emerald">PASS</StatusBadge></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">12.09.2027 16:40</span><StatusBadge tone="amber">CONDITIONAL</StatusBadge></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">10.09.2027 11:20</span><StatusBadge tone="emerald">PASS</StatusBadge></div>
                    </div>
                </SectionCard>
                <SectionCard title="Incidente" accent className="md:col-span-2">
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground"><AlertTriangle className="w-4 h-4 text-amber-400" /> 12.09 · Contact barieră Turn 4 — rezolvat</div>
                        <div className="flex items-center gap-2 text-muted-foreground"><Wrench className="w-4 h-4 text-sky-400" /> 08.09 · Schimb ambreiaj — preventiv</div>
                    </div>
                </SectionCard>
            </div>
        </div>
    );
}
function F({ label, value }) {
    return <div className="rounded-lg bg-secondary/30 p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div><div className="font-semibold mt-0.5">{value}</div></div>;
}