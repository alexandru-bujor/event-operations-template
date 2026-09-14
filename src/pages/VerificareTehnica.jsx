import React, { useState } from "react";
import { ClipboardCheck, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const CHECKLIST = ["Cușcă de siguranță", "Centuri", "Scaun", "Extinctor", "Baterie", "Scurgeri", "Anvelope", "Echipament siguranță"];

export default function VerificareTehnica() {
    const { DRIVERS } = useApp();
    const [driverId, setDriverId] = useState(DRIVERS[0].id);
    const driver = DRIVERS.find((d) => d.id === driverId);
    const [checks, setChecks] = useState(Object.fromEntries(CHECKLIST.map((c) => [c, "PASS"])));
    const [notes, setNotes] = useState("");
    const [result, setResult] = useState(null);

    const set = (item, val) => setChecks((c) => ({ ...c, [item]: val }));
    const finalize = (r) => { setResult(r); };

    return (
        <div>
            <PageHeader title="Verificare Tehnică" subtitle="Inspecție securitate" icon={ClipboardCheck} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <SectionCard title="Selectează pilot" accent>
                    <select value={driverId} onChange={(e) => setDriverId(e.target.value)} className="w-full rounded-lg border border-border bg-secondary/30 p-2.5 text-sm outline-none">
                        {DRIVERS.map((d) => <option key={d.id} value={d.id}>#{d.number} {d.name} — {d.car}</option>)}
                    </select>
                    <div className="mt-3 space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Pilot</span><span className="font-medium">{driver.name}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Mașină</span><span className="font-medium">{driver.car}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Număr</span><span className="font-mono font-bold text-primary">#{driver.number}</span></div>
                    </div>
                </SectionCard>

                <SectionCard title="Listă verificare" accent className="lg:col-span-2">
                    <div className="space-y-2">
                        {CHECKLIST.map((item) => (
                            <div key={item} className="flex items-center justify-between rounded-lg border border-border p-2.5">
                                <span className="text-sm font-medium">{item}</span>
                                <div className="flex gap-1.5">
                                    {["PASS", "FAIL", "N/A"].map((v) => {
                                        const activeCls = v === "PASS" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                            : v === "FAIL" ? "bg-red-500/20 text-red-300 border-red-500/40"
                                                : "bg-slate-500/20 text-slate-300 border-slate-500/40";
                                        const Icon = v === "PASS" ? CheckCircle2 : v === "FAIL" ? XCircle : MinusCircle;
                                        return (
                                            <button key={v} onClick={() => set(item, v)} className={cn("px-2.5 py-1 rounded-md text-xs font-semibold border flex items-center gap-1 transition",
                                                checks[item] === v ? activeCls : "border-border text-muted-foreground hover:text-foreground")}>
                                                <Icon className="w-3 h-3" /> {v}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Note inspecție…" className="w-full mt-3 rounded-lg border border-border bg-secondary/30 p-3 text-sm outline-none" rows={2} />
                    <div className="grid grid-cols-3 gap-2 mt-3">
                        <button onClick={() => finalize("PASS")} className="py-3 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold uppercase tracking-wider hover:bg-emerald-500/30">PASS</button>
                        <button onClick={() => finalize("CONDITIONAL")} className="py-3 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase tracking-wider hover:bg-amber-500/30">CONDITIONAL</button>
                        <button onClick={() => finalize("FAIL")} className="py-3 rounded-lg bg-red-500/20 text-red-300 border border-red-500/40 font-bold uppercase tracking-wider hover:bg-red-500/30">FAIL</button>
                    </div>
                    {result && <div className="mt-3 text-center"><StatusBadge tone={result === "PASS" ? "emerald" : result === "FAIL" ? "red" : "amber"} dot>Rezultat: {result}</StatusBadge></div>}
                </SectionCard>

                <SectionCard title="Istoric inspecții" accent className="lg:col-span-3">
                    <table className="w-full text-sm">
                        <thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border"><th className="py-2 font-semibold">Pilot</th><th className="py-2 font-semibold">Mașină</th><th className="py-2 font-semibold">Data</th><th className="py-2 font-semibold">Inspector</th><th className="py-2 font-semibold">Rezultat</th></tr></thead>
                        <tbody className="divide-y divide-border">
                        {DRIVERS.slice(0, 6).map((d) => (
                            <tr key={d.id}><td className="py-2">#{d.number} {d.name}</td><td className="py-2 text-muted-foreground">{d.car}</td><td className="py-2">13.09 10:1{d.number.charCodeAt(0) % 9}</td><td className="py-2">Radu Insp.</td><td className="py-2"><StatusBadge tone={d.techStatus === "PASS" ? "emerald" : "amber"}>{d.techStatus}</StatusBadge></td></tr>
                        ))}
                        </tbody>
                    </table>
                </SectionCard>
            </div>
        </div>
    );
}