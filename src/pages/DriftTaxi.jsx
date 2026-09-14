import React, { useState } from "react";
import { Car, CheckCircle2, X, Printer, Users } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import StatusBadge, { statusTone } from "@/components/ui/StatusBadge";
import { RON, NUM } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function DriftTaxi() {
    const { taxiDrivers, selectedTaxiDriver, setSelectedTaxiDriver, sellDriftTaxiRide, completeRide } = useApp();
    const [ticket, setTicket] = useState(null);
    const driver = taxiDrivers.find((d) => d.id === selectedTaxiDriver);

    const handleSell = () => {
        if (!driver) return;
        sellDriftTaxiRide(driver.id);
        setTicket({ driver: driver.name, number: driver.number, price: driver.driftTaxiPrice, id: "DT-" + Math.random().toString(36).slice(2, 7).toUpperCase() });
    };

    const totalRides = taxiDrivers.reduce((s, d) => s + d.sold, 0);
    const totalCompleted = taxiDrivers.reduce((s, d) => s + d.completed, 0);
    const gross = taxiDrivers.reduce((s, d) => s + d.sold * d.driftTaxiPrice, 0);

    return (
        <div>
            <PageHeader title="Drift Taxi" subtitle="Casier curse · Split 50/50" icon={Car}
                        actions={<StatusBadge tone="amber" dot>CASH ONLY</StatusBadge>} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Selectează pilot</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {taxiDrivers.map((d) => (
                            <button key={d.id} onClick={() => setSelectedTaxiDriver(d.id)}
                                    className={cn("rounded-xl border bg-card p-3 text-left transition hover:border-primary/40",
                                        selectedTaxiDriver === d.id ? "border-primary ring-1 ring-primary/40" : "border-border")}>
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/30 to-amber-700/30 flex items-center justify-center font-display font-bold text-amber-300">#{d.number}</div>
                                    <StatusBadge tone={d.availability === "AVAILABLE" ? "emerald" : "amber"}>{d.availability}</StatusBadge>
                                </div>
                                <div className="mt-2 font-semibold text-sm truncate">{d.name}</div>
                                <div className="text-xs text-muted-foreground">{d.car}</div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-bold tabular text-primary">{RON(d.driftTaxiPrice)}</span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" /> {d.queue.length}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Settlements */}
                    <SectionCard title="Deconturi piloți — Split 50/50" accent className="mt-6">
                        <div className="flex items-center justify-between mb-3 text-xs">
                            <span className="text-muted-foreground">Regulă decont:</span>
                            <StatusBadge tone="amber">50 / 50</StatusBadge>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                                    <th className="py-2 font-semibold">Pilot</th><th className="py-2 font-semibold text-center">Vândute</th><th className="py-2 font-semibold text-center">Finalizate</th><th className="py-2 font-semibold text-right">Brut</th><th className="py-2 font-semibold text-right">Pilot 50%</th><th className="py-2 font-semibold text-right">Org. 50%</th>
                                </tr></thead>
                                <tbody className="divide-y divide-border">
                                {taxiDrivers.map((d) => {
                                    const g = d.sold * d.driftTaxiPrice;
                                    return (
                                        <tr key={d.id} className="hover:bg-secondary/30">
                                            <td className="py-2.5"><span className="font-mono text-xs text-muted-foreground mr-2">#{d.number}</span>{d.name}</td>
                                            <td className="py-2.5 text-center tabular">{d.sold}</td>
                                            <td className="py-2.5 text-center tabular">{d.completed}</td>
                                            <td className="py-2.5 text-right tabular font-medium">{RON(g)}</td>
                                            <td className="py-2.5 text-right tabular text-emerald-400">{RON(g / 2)}</td>
                                            <td className="py-2.5 text-right tabular text-sky-400">{RON(g / 2)}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                                <tfoot><tr className="border-t border-border font-bold">
                                    <td className="py-2.5">TOTAL</td>
                                    <td className="py-2.5 text-center tabular">{totalRides}</td>
                                    <td className="py-2.5 text-center tabular">{totalCompleted}</td>
                                    <td className="py-2.5 text-right tabular">{RON(gross)}</td>
                                    <td className="py-2.5 text-right tabular text-emerald-400">{RON(gross / 2)}</td>
                                    <td className="py-2.5 text-right tabular text-sky-400">{RON(gross / 2)}</td>
                                </tr></tfoot>
                            </table>
                        </div>
                    </SectionCard>
                </div>

                {/* Purchase panel */}
                <div>
                    {driver ? (
                        <div className="rounded-xl border border-border bg-card p-4 sticky top-0">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Cumpărare cursă</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/30 to-amber-700/30 flex items-center justify-center font-display font-bold text-amber-300">#{driver.number}</div>
                                <div><div className="font-semibold">{driver.name}</div><div className="text-xs text-muted-foreground">{driver.car}</div></div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <Row label="Preț cursă" value={RON(driver.driftTaxiPrice)} />
                                <Row label="Cota pilot (50%)" value={RON(driver.driftTaxiPrice / 2)} tone="emerald" />
                                <Row label="Cota organizator (50%)" value={RON(driver.driftTaxiPrice / 2)} tone="sky" />
                            </div>
                            <div className="text-xs text-center py-1.5 rounded-md bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/30 mt-3">PLATĂ: CASH</div>
                            <button onClick={handleSell} className="w-full mt-3 py-3.5 rounded-lg bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:opacity-90">
                                Vinde cursă Drift Taxi
                            </button>

                            {driver.queue.length > 0 && (
                                <div className="mt-4">
                                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Coadă pasageri</div>
                                    <div className="space-y-2">
                                        {driver.queue.map((p, i) => (
                                            <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-2">
                                                <div className="flex items-center gap-2"><span className="text-xs text-muted-foreground">{i + 1}.</span><span className="text-sm">{p.name}</span></div>
                                                <div className="flex items-center gap-2">
                                                    <StatusBadge tone={i === 0 ? "emerald" : "slate"}>{i === 0 ? "READY" : "WAITING"}</StatusBadge>
                                                    {i === 0 && <button onClick={() => completeRide(driver.id, p.id)} className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-semibold">Finalizează</button>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground text-sm">Selectează un pilot pentru a vinde o cursă</div>
                    )}
                </div>
            </div>

            {ticket && <TicketModal ticket={ticket} onClose={() => setTicket(null)} />}
        </div>
    );
}

function Row({ label, value, tone }) {
    return (
        <div className="flex justify-between">
            <span className="text-muted-foreground">{label}</span>
            <span className={cn("tabular font-semibold", tone === "emerald" ? "text-emerald-400" : tone === "sky" ? "text-sky-400" : "")}>{value}</span>
        </div>
    );
}

function TicketModal({ ticket, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-card border border-emerald-500/40 rounded-2xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col items-center text-center">
                    <CheckCircle2 className="w-14 h-14 text-emerald-400 mb-2" />
                    <h2 className="text-lg font-display font-bold text-emerald-400">CURSĂ VÂNDUTĂ</h2>
                </div>
                <div className="mt-4 border-y border-dashed border-border py-4">
                    <div className="text-center text-xs text-muted-foreground font-mono">{ticket.id}</div>
                    <div className="text-center mt-2 font-semibold">#{ticket.number} · {ticket.driver}</div>
                    <div className="flex justify-center my-3">
                        <div className="w-28 h-28 bg-white rounded-lg grid grid-cols-8 gap-px p-2">
                            {Array.from({ length: 64 }).map((_, i) => <div key={i} className={Math.random() > 0.5 ? "bg-black" : "bg-white"} />)}
                        </div>
                    </div>
                    <div className="text-center text-2xl font-display font-bold tabular text-primary">{RON(ticket.price)}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <button className="py-2.5 rounded-lg border border-border hover:bg-secondary flex items-center justify-center gap-2 text-sm font-medium"><Printer className="w-4 h-4" /> Tipărește</button>
                    <button onClick={onClose} className="py-2.5 rounded-lg bg-primary text-primary-foreground font-bold uppercase tracking-wider flex items-center justify-center gap-2"><X className="w-4 h-4" /> Închide</button>
                </div>
            </div>
        </div>
    );
}