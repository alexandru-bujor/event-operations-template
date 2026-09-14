import React from "react";
import { Bell, Car, Clock, Flag } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

export default function PilotDashboard() {
    const { DRIVERS, taxiDrivers, completeRide, trackStatus } = useApp();
    const driver = DRIVERS[0]; // #23 Andrei Popescu
    const taxi = taxiDrivers.find((t) => t.number === driver.number) || taxiDrivers[0];
    const startsIn = 18;

    return (
        <div className="max-w-md mx-auto pb-10">
            {/* Header */}
            <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 via-card to-card border border-amber-500/30 p-5">
                <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-display font-bold text-2xl text-white">#{driver.number}</div>
                    <div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Pilot</div>
                        <div className="text-xl font-display font-bold">{driver.name}</div>
                        <div className="text-sm text-muted-foreground">{driver.car} · {driver.team}</div>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <StatusBadge tone={driver.status === "On Track" ? "amber" : "emerald"} dot>{driver.status === "On Track" ? "PE PISTĂ" : "PREPARE"}</StatusBadge>
                    <div className="text-xs text-muted-foreground">Grupa <span className="font-bold text-foreground">{driver.group}</span></div>
                </div>
            </div>

            {/* Next session */}
            <div className="rounded-2xl border border-border bg-card p-4 mt-4">
                <div className="flex items-center gap-2 mb-3"><Clock className="w-4 h-4 text-primary" /><h3 className="text-sm font-semibold uppercase tracking-wider">Sesiunea ta</h3></div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><div className="text-xs text-muted-foreground">Grupa</div><div className="font-semibold">Grupa {driver.group}</div></div>
                    <div><div className="text-xs text-muted-foreground">Timp pistă</div><div className="font-semibold tabular">15:00–16:00</div></div>
                    <div><div className="text-xs text-muted-foreground">Începe în</div><div className="font-semibold text-primary text-lg tabular">{startsIn} min</div></div>
                    <div><div className="text-xs text-muted-foreground">Status pistă</div><StatusBadge tone={trackStatus === "OPEN" ? "emerald" : trackStatus === "RED" ? "red" : "amber"}>{trackStatus}</StatusBadge></div>
                </div>
            </div>

            {/* Drift Taxi queue */}
            <div className="rounded-2xl border border-border bg-card p-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2"><Car className="w-4 h-4 text-amber-400" /><h3 className="text-sm font-semibold uppercase tracking-wider">Drift Taxi — coadă</h3></div>
                    <span className="text-xs text-muted-foreground">{taxi?.queue.length || 0} pasageri</span>
                </div>
                {taxi && taxi.queue.length > 0 ? (
                    <div className="space-y-2">
                        {taxi.queue.map((p, i) => (
                            <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-2.5">
                                <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">{i + 1}</span><span className="text-sm">{p.name}</span></div>
                                <div className="flex items-center gap-2">
                                    <StatusBadge tone={i === 0 ? "emerald" : "slate"}>{i === 0 ? "READY" : "WAITING"}</StatusBadge>
                                    {i === 0 && <button onClick={() => completeRide(taxi.id, p.id)} className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold hover:bg-emerald-500/30">Finalizează</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <div className="text-sm text-muted-foreground text-center py-4">Niciun pasager în așteptare</div>}
                <div className="grid grid-cols-2 gap-2 mt-3">
                    <button className="py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Validează pasager</button>
                    <button className="py-2.5 rounded-lg border border-border text-sm font-semibold hover:bg-secondary">Finalizează cursa</button>
                </div>
            </div>

            {/* Notifications */}
            <div className="rounded-2xl border border-border bg-card p-4 mt-4">
                <div className="flex items-center gap-2 mb-3"><Bell className="w-4 h-4 text-primary" /><h3 className="text-sm font-semibold uppercase tracking-wider">Notificări</h3></div>
                <div className="space-y-2">
                    {[
                        { tone: "amber", icon: Clock, text: "Grupa ta începe în 15 minute." },
                        { tone: "emerald", icon: Car, text: "Pasager nou Drift Taxi în coadă." },
                        { tone: trackStatus === "RED" ? "red" : "sky", icon: Flag, text: `Status pistă: ${trackStatus}.` },
                    ].map((n, i) => (
                        <div key={i} className="flex items-start gap-2 rounded-lg bg-secondary/30 p-2.5">
                            <n.icon className={cn("w-4 h-4 mt-0.5 shrink-0", n.tone === "red" ? "text-red-400" : n.tone === "amber" ? "text-amber-400" : n.tone === "emerald" ? "text-emerald-400" : "text-sky-400")} />
                            <span className="text-sm">{n.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}