import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import StatusBadge, { statusTone } from "@/components/ui/StatusBadge";
import { RON } from "@/lib/format";
import { cn } from "@/lib/utils";

const TABS = ["Overview", "Mașină", "Echipă", "Program", "Drift Taxi", "Tehnic", "Competiție", "Documente", "Activitate"];

export default function PilotProfil() {
    const { id } = useParams();
    const nav = useNavigate();
    const { DRIVERS, taxiDrivers } = useApp();
    const driver = DRIVERS.find((d) => d.id === id) || DRIVERS[0];
    const taxi = taxiDrivers.find((t) => t.id === driver.id);
    const [tab, setTab] = useState("Overview");

    return (
        <div>
            <button onClick={() => nav("/piloti")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="w-4 h-4" /> Înapoi la piloți</button>
            <div className="rounded-2xl border border-border bg-card p-5 mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-amber-500/30 to-amber-700/30 flex items-center justify-center font-display font-bold text-3xl text-amber-300">#{driver.number}</div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-display font-bold">{driver.name}</h1>
                        <div className="text-sm text-muted-foreground">{driver.car} · {driver.team} · Club {driver.club}</div>
                        <div className="flex gap-2 mt-2">
                            <StatusBadge tone={statusTone(driver.status)} dot>{driver.status}</StatusBadge>
                            <StatusBadge tone={driver.group === "A" ? "sky" : "amber"}>Grupa {driver.group}</StatusBadge>
                            <StatusBadge tone={statusTone(driver.techStatus)}>Tehnic: {driver.techStatus}</StatusBadge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
                {TABS.map((t) => (
                    <button key={t} onClick={() => setTab(t)} className={cn("px-3 py-1.5 rounded-md text-xs font-semibold border", tab === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground")}>{t}</button>
                ))}
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
                {tab === "Overview" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <F label="Număr" value={`#${driver.number}`} /><F label="Mașină" value={driver.car} /><F label="Motor" value={driver.engine} />
                        <F label="Putere" value={`${driver.power} HP`} /><F label="Grupa" value={`Grupa ${driver.group}`} /><F label="Club" value={driver.club} />
                        <F label="Fun Day" value={driver.funDay} /><F label="Competiție" value={driver.competition} /><F label="Drift Taxi" value={driver.driftTaxi} />
                    </div>
                )}
                {tab === "Mașină" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <F label="Model" value={driver.car} /><F label="Motor" value={driver.engine} /><F label="Putere" value={`${driver.power} HP`} />
                        <F label="Număr competiție" value={`#${driver.number}`} /><F label="Status tehnic" value={driver.techStatus} />
                    </div>
                )}
                {tab === "Echipă" && <div className="space-y-2 text-sm"><F label="Echipă" value={driver.team} /><F label="Club" value={driver.club} /><F label="Mecanic șef" value="Ion Mechanic" /></div>}
                {tab === "Program" && (
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">12:00–13:00</span><span>Grupa {driver.group} — Runda 1</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">15:00–16:00</span><span>Grupa {driver.group} — Runda 2</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">14:00</span><span>Drift Taxi</span></div>
                    </div>
                )}
                {tab === "Drift Taxi" && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <F label="Preț cursă" value={RON(driver.driftTaxiPrice)} /><F label="Disponibilitate" value={driver.availability} />
                        <F label="Curse vândute" value={taxi?.sold || 0} /><F label="Finalizate" value={taxi?.completed || 0} />
                    </div>
                )}
                {tab === "Tehnic" && (
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span>Ultima inspecție</span><StatusBadge tone="emerald">PASS</StatusBadge></div>
                        <div className="flex justify-between"><span>Data</span><span>13.09.2027 10:15</span></div>
                        <div className="flex justify-between"><span>Inspector</span><span>Radu Inspector</span></div>
                    </div>
                )}
                {tab === "Competiție" && <div className="text-sm text-muted-foreground">Qualifying: Run 1 = 87, Run 2 = 91, Best = 91 · Status: Qualified (locul 1)</div>}
                {tab === "Documente" && <div className="space-y-2 text-sm"><div className="flex justify-between"><span>Licență pilot</span><StatusBadge tone="emerald">Validă</StatusBadge></div><div className="flex justify-between"><span>Asigurare</span><StatusBadge tone="emerald">Validă</StatusBadge></div></div>}
                {tab === "Activitate" && <div className="space-y-2 text-sm text-muted-foreground"><div>14:41 · Bilet Drift Taxi vândut</div><div>10:15 · Inspecție tehnică PASS</div><div>09:05 · Check-in pilot</div></div>}
            </div>
        </div>
    );
}

function F({ label, value }) {
    return <div className="rounded-lg bg-secondary/30 p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div><div className="font-semibold mt-0.5">{value}</div></div>;
}