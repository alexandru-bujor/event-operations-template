import React, { useState } from "react";
import { Flag, AlertTriangle, ShieldAlert, Wrench, CheckCircle2, Clock } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

export default function ControlPista() {
    const { trackStatus, trackChange, setTrackStatus, session } = useApp();
    const [confirmRed, setConfirmRed] = useState(false);

    const critical = trackStatus === "RED";
    const label = critical ? "🔴 RED FLAG" : trackStatus === "YELLOW" ? "🟡 YELLOW FLAG" : trackStatus === "CLOSED" ? "PISTA ÎNCHISĂ" : "🟢 PISTA DESCHISĂ";

    const Btn = ({ status, lbl, icon: Icon, color, onClick }) => (
        <button onClick={onClick ?? (() => status === "RED" ? setConfirmRed(true) : setTrackStatus(status, lbl))}
                className={cn("flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition hover:scale-[1.02]", color)}>
            <Icon className="w-6 h-6" /><span className="text-xs font-bold uppercase tracking-wider">{lbl}</span>
        </button>
    );

    return (
        <div>
            <PageHeader title="Control Pistă" subtitle="Race Control · Comenzi critice" icon={Flag}
                        actions={<StatusBadge tone="red" dot>RACE CONTROL</StatusBadge>} />

            <div className={cn("rounded-2xl border-2 p-6 mb-4 transition-colors",
                critical ? "border-red-500 bg-red-500/10 pulse-critical" : "border-border bg-card")}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Status curent</div>
                        <div className={cn("text-4xl font-display font-bold mt-1", critical ? "text-red-400 text-glow-red" : "")}>{label}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <Info label="Sesiune curentă" value={session.name} />
                        <Info label="Piloți pe pistă" value={session.driversOnTrack} />
                        <Info label="Ultima schimbare" value={trackChange.status} />
                        <Info label="Modificat de" value={trackChange.by} />
                        <Info label="Ora schimbării" value={trackChange.time} />
                        <Info label="Echipa Recovery" value={critical ? "PE PISTĂ" : "În așteptare"} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
                <Btn status="OPEN" lbl="Deschide pista" icon={Flag} color="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10" />
                <Btn status="CLOSED" lbl="Închide pista" icon={Flag} color="border-slate-500/40 text-slate-300 hover:bg-slate-500/10" />
                <Btn status="YELLOW" lbl="Yellow Flag" icon={AlertTriangle} color="border-amber-500/40 text-amber-400 hover:bg-amber-500/10" />
                <Btn status="RED" lbl="🔴 Red Flag" icon={ShieldAlert} color="border-red-500/60 text-red-400 hover:bg-red-500/10" />
                <Btn status="RECOVERY" lbl="Recovery pe pistă" icon={Wrench} color="border-orange-500/40 text-orange-400 hover:bg-orange-500/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionCard title="Sesiune curentă" accent>
                    <div className="space-y-2 text-sm">
                        <Info label="Grupa" value={session.name} />
                        <Info label="Fereastra" value={session.window} />
                        <Info label="Piloți pe pistă" value={session.driversOnTrack} />
                        <Info label="Următoarea" value={`${session.next} · ${session.nextTime}`} />
                    </div>
                </SectionCard>
                <SectionCard title="Istoric schimbări" accent>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-muted-foreground">{trackChange.time}</span><span className="font-medium">{trackChange.status}</span><span className="text-muted-foreground">· {trackChange.by}</span></div>
                        <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="w-3.5 h-3.5" /> 14:30 · PISTA DESCHISĂ · Race Control</div>
                        <div className="flex items-center gap-2 text-muted-foreground"><AlertTriangle className="w-3.5 h-3.5" /> 14:05 · YELLOW FLAG · Comisar T2</div>
                    </div>
                </SectionCard>
            </div>

            {confirmRed && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setConfirmRed(false)}>
                    <div className="bg-card border-2 border-red-500 rounded-2xl max-w-md w-full p-6 pulse-critical" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center text-center">
                            <ShieldAlert className="w-16 h-16 text-red-500 mb-3" />
                            <h2 className="text-2xl font-display font-bold text-red-400">CONFIRMĂ RED FLAG</h2>
                            <p className="text-sm text-muted-foreground mt-2">Aceasta va opri IMMEDIAT toate activitățile pe pistă. Toți piloții vor fi notificați.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-5">
                            <button onClick={() => setConfirmRed(false)} className="py-3 rounded-lg border border-border hover:bg-secondary font-semibold">Anulează</button>
                            <button onClick={() => { setTrackStatus("RED", "RED FLAG"); setConfirmRed(false); }} className="py-3 rounded-lg bg-red-500 text-white font-bold uppercase tracking-wider hover:bg-red-600">Activează RED FLAG</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Info({ label, value }) {
    return <div className="flex justify-between gap-4"><span className="text-muted-foreground">{label}</span><span className="font-semibold text-right">{value}</span></div>;
}