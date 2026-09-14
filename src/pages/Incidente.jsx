import React, { useState } from "react";
import { AlertTriangle, Plus, X, Clock } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge, { statusTone, priorityTone } from "@/components/ui/StatusBadge";
import { INCIDENT_TYPES } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function Incidente() {
    const { incidents, createIncident, updateIncidentStatus } = useApp();
    const [modal, setModal] = useState(false);
    const [sel, setSel] = useState(null);
    const [form, setForm] = useState({ type: INCIDENT_TYPES[0], priority: "HIGH", zone: "Turn 3" });

    const open = (inc) => setSel(inc);

    return (
        <div>
            <PageHeader title="Incidente" subtitle={`${incidents.length} incidente · ${incidents.filter((i) => i.status !== "Closed").length} active`} icon={AlertTriangle}
                        actions={<button onClick={() => setModal(true)} className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> Incident nou</button>} />

            <div className="space-y-2">
                {incidents.map((inc) => (
                    <div key={inc.id} onClick={() => open(inc)} className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 cursor-pointer flex items-center gap-4">
                        <div className={cn("w-1 h-12 rounded-full", inc.priority === "HIGH" ? "bg-red-500" : inc.priority === "MEDIUM" ? "bg-amber-500" : "bg-sky-500")} />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2"><span className="font-mono text-xs text-muted-foreground">{inc.id}</span><StatusBadge tone={priorityTone(inc.priority)}>{inc.priority}</StatusBadge></div>
                            <div className="font-medium text-sm mt-0.5">{inc.type}</div>
                            <div className="text-xs text-muted-foreground">📍 {inc.zone} · {inc.time}</div>
                        </div>
                        <StatusBadge tone={statusTone(inc.status)} dot={inc.status === "IN PROGRESS"}>{inc.status}</StatusBadge>
                    </div>
                ))}
            </div>

            {sel && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSel(null)}>
                    <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><span className="font-mono text-sm text-muted-foreground">{sel.id}</span><StatusBadge tone={priorityTone(sel.priority)}>{sel.priority}</StatusBadge></div><button onClick={() => setSel(null)}><X className="w-5 h-5 text-muted-foreground" /></button></div>
                        <h2 className="text-xl font-display font-bold">{sel.type}</h2>
                        <div className="text-sm text-muted-foreground mt-1">📍 {sel.zone} · {sel.time}</div>
                        <div className="mt-4"><div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Cronologie</div>
                            <div className="space-y-2">
                                {sel.timeline.map((t, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm"><Clock className="w-3.5 h-3.5 text-primary" /><span className="text-muted-foreground tabular">{t.t}</span><span>{t.e}</span></div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <button onClick={() => { updateIncidentStatus(sel.id, "ASSIGNED", "Asignat echipă"); setSel({ ...sel, status: "ASSIGNED", timeline: [...sel.timeline, { t: "now", e: "Asignat echipă" }] }); }} className="py-2.5 rounded-lg border border-border hover:bg-secondary text-sm font-semibold">Asignează</button>
                            <button onClick={() => { updateIncidentStatus(sel.id, "RESOLVED", "Rezolvat"); setSel({ ...sel, status: "RESOLVED", timeline: [...sel.timeline, { t: "now", e: "Rezolvat" }] }); }} className="py-2.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-sm font-semibold">Marchează rezolvat</button>
                        </div>
                    </div>
                </div>
            )}

            {modal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModal(false)}>
                    <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-display font-bold">Incident nou</h2><button onClick={() => setModal(false)}><X className="w-5 h-5 text-muted-foreground" /></button></div>
                        <div className="space-y-3">
                            <div><label className="text-xs text-muted-foreground">Tip</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/30 p-2.5 text-sm outline-none">{INCIDENT_TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
                            <div><label className="text-xs text-muted-foreground">Prioritate</label><div className="flex gap-2 mt-1">{["HIGH", "MEDIUM", "LOW"].map((p) => <button key={p} onClick={() => setForm({ ...form, priority: p })} className={cn("flex-1 py-2 rounded-lg text-sm font-semibold border", form.priority === p ? "bg-primary text-primary-foreground border-primary" : "border-border")}>{p}</button>)}</div></div>
                            <div><label className="text-xs text-muted-foreground">Zonă</label><input value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/30 p-2.5 text-sm outline-none" /></div>
                        </div>
                        <button onClick={() => { createIncident(form); setModal(false); }} className="w-full mt-4 py-3 rounded-lg bg-primary text-primary-foreground font-bold">Creează incident</button>
                    </div>
                </div>
            )}
        </div>
    );
}