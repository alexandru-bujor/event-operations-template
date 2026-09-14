import React from "react";
import {
    Ticket, Users, Car, Wallet, Flag, AlertTriangle, GalleryThumbnails, HardHat,
    Activity, ArrowUpRight,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";
import StatCard from "@/components/ui/StatCard";
import SectionCard from "@/components/ui/SectionCard";
import StatusBadge, { statusTone, priorityTone } from "@/components/ui/StatusBadge";
import { RON, NUM } from "@/lib/format";
import { useNavigate } from "react-router-dom";

export default function PanouCentral() {
    const { kpis, trackStatus, trackChange, session, taxiDrivers, incidents, activity, openIncidents, staff } = useApp();
    const nav = useNavigate();
    const taxiWaiting = taxiDrivers.reduce((s, d) => s + d.queue.length, 0);
    const taxiCompleted = taxiDrivers.reduce((s, d) => s + d.completed, 0);
    const taxiRevenue = taxiDrivers.reduce((s, d) => s + d.revenue + d.sold * d.driftTaxiPrice, 0);
    const staffPresent = staff.reduce((s, d) => s + d.present, 0);
    const staffTotal = staff.reduce((s, d) => s + d.total, 0);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-display font-bold tracking-tight">Centru de Comandă</h1>
                    <p className="text-sm text-muted-foreground">Operațiuni live · {new Date().toLocaleDateString("ro-RO", { weekday: "long", day: "numeric", month: "long" })}</p>
                </div>
                <StatusBadge tone="red" dot>LIVE</StatusBadge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <StatCard label="Bilete vândute" value={NUM(kpis.ticketsSold)} icon={Ticket} sub={`+${NUM(kpis.peopleInside)} în interior`} />
                <StatCard label="Persoane în interior" value={NUM(kpis.peopleInside)} icon={Users} tone="sky" />
                <StatCard label="Curse Drift Taxi" value={NUM(kpis.driftTaxiRides)} icon={Car} tone="amber" sub={`${taxiWaiting} în așteptare`} />
                <StatCard label="Venit cash" value={RON(kpis.cashRevenue)} icon={Wallet} tone="emerald" />
                <StatCard label="Piloți activi" value={`${kpis.driversActive} / 20`} icon={Flag} sub="pe pistă & paddock" />
                <StatCard label="Incidente deschise" value={openIncidents} icon={AlertTriangle} tone={openIncidents > 0 ? "red" : "emerald"} />
                <StatCard label="Mașini Expo" value={kpis.expoCars} icon={GalleryThumbnails} tone="violet" sub="check-in" />
                <StatCard label="Staff prezent" value={`${staffPresent} / ${staffTotal}`} icon={HardHat} tone="sky" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* LIVE OPERATIONS */}
                <SectionCard title="Operațiuni live" accent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs uppercase tracking-wider text-muted-foreground">Status pistă</span>
                                <StatusBadge tone={trackStatus === "OPEN" ? "emerald" : trackStatus === "RED" ? "red" : "amber"} dot>
                                    {trackStatus === "OPEN" ? "PISTA DESCHISĂ" : trackStatus === "RED" ? "RED FLAG" : trackStatus === "YELLOW" ? "YELLOW FLAG" : "ÎNCHISĂ"}
                                </StatusBadge>
                            </div>
                            <div className="rounded-lg bg-secondary/40 p-3 space-y-2">
                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Sesiune curentă</span><span className="font-semibold">{session.name}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Fereastra</span><span className="font-semibold tabular">{session.window}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Piloți pe pistă</span><span className="font-semibold">{session.driversOnTrack}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Următoarea</span><span className="font-semibold">{session.next} · {session.nextTime}</span></div>
                            </div>
                            <button onClick={() => nav("/control-pista")} className="mt-2 text-xs text-primary hover:underline flex items-center gap-1">Control pistă <ArrowUpRight className="w-3 h-3" /></button>
                        </div>
                    </div>
                </SectionCard>

                {/* DRIFT TAXI LIVE */}
                <SectionCard title="Drift Taxi — live" accent>
                    <div className="grid grid-cols-2 gap-3">
                        <Mini label="În așteptare" value={taxiWaiting} tone="amber" />
                        <Mini label="Următorii" value={Math.min(4, taxiWaiting)} />
                        <Mini label="Finalizate" value={taxiCompleted} tone="emerald" />
                        <Mini label="Venit estimat" value={RON(taxiRevenue)} tone="emerald" />
                    </div>
                    <div className="mt-3 rounded-lg bg-secondary/40 p-3 space-y-1.5 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Cota pilot (50%)</span><span className="font-semibold tabular">{RON(taxiRevenue / 2)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Cota organizator (50%)</span><span className="font-semibold tabular">{RON(taxiRevenue / 2)}</span></div>
                    </div>
                    <button onClick={() => nav("/drift-taxi")} className="mt-2 text-xs text-primary hover:underline flex items-center gap-1">Drift Taxi <ArrowUpRight className="w-3 h-3" /></button>
                </SectionCard>

                {/* ACTIVE INCIDENTS */}
                <SectionCard title="Incidente active" accent action={<button onClick={() => nav("/incidente")} className="text-xs text-primary hover:underline">Toate</button>}>
                    <div className="space-y-3">
                        {incidents.filter((i) => i.status !== "Closed").map((inc) => (
                            <div key={inc.id} className="rounded-lg border border-border p-3 hover:border-primary/40 cursor-pointer" onClick={() => nav("/incidente")}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-mono text-xs text-muted-foreground">{inc.id}</span>
                                    <StatusBadge tone={priorityTone(inc.priority)}>{inc.priority}</StatusBadge>
                                </div>
                                <div className="text-sm font-medium">{inc.type}</div>
                                <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
                                    <span>📍 {inc.zone}</span>
                                    <StatusBadge tone={statusTone(inc.status)}>{inc.status}</StatusBadge>
                                </div>
                            </div>
                        ))}
                        {incidents.filter((i) => i.status !== "Closed").length === 0 && <div className="text-sm text-muted-foreground py-4 text-center">Niciun incident activ</div>}
                    </div>
                </SectionCard>

                {/* RECENT ACTIVITY */}
                <SectionCard title="Activitate recentă" accent className="lg:col-span-2">
                    <div className="divide-y divide-border">
                        {activity.map((a, i) => (
                            <div key={i} className="flex items-center gap-3 py-2.5">
                                <span className="text-xs font-mono text-muted-foreground tabular w-12 shrink-0">{a.time}</span>
                                <Activity className="w-3.5 h-3.5 text-primary shrink-0" />
                                <span className="text-sm">{a.text}</span>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* STAFF SNAPSHOT */}
                <SectionCard title="Staff pe departamente" accent>
                    <div className="space-y-2.5">
                        {staff.map((d) => (
                            <div key={d.id} className="flex items-center justify-between">
                                <span className="text-sm">{d.name}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-1.5 rounded-full bg-secondary overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${(d.present / d.total) * 100}%` }} />
                                    </div>
                                    <span className="text-xs tabular text-muted-foreground w-12 text-right">{d.present}/{d.total}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </div>
    );
}

function Mini({ label, value, tone }) {
    return (
        <div className="rounded-lg bg-secondary/40 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className={`text-lg font-display font-bold tabular mt-0.5 ${tone === "emerald" ? "text-emerald-400" : tone === "amber" ? "text-amber-400" : ""}`}>{value}</div>
        </div>
    );
}