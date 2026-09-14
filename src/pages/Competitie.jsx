import React, { useState } from "react";
import { Trophy, CheckCircle2, X } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const SECTIONS = ["Practice", "Qualifying", "Battles", "Results"];

export default function Competitie() {
    const { QUALIFYING, BATTLES } = useApp();
    const [section, setSection] = useState("Qualifying");
    const [judge, setJudge] = useState(null);

    return (
        <div>
            <PageHeader title="Competiție" subtitle="Ziua 2 · Tablou oficial" icon={Trophy} />
            <div className="flex gap-1.5 mb-4">
                {SECTIONS.map((s) => (
                    <button key={s} onClick={() => setSection(s)} className={cn("px-4 py-2 rounded-lg text-sm font-semibold border", section === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground")}>{s}</button>
                ))}
            </div>

            {section === "Practice" && <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">Sesiune de practică — 10:00–11:30. Fără scor.</div>}

            {section === "Qualifying" && (
                <div className="overflow-x-auto rounded-xl border border-border bg-card">
                    <table className="w-full text-sm">
                        <thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border bg-secondary/30">
                            <th className="py-3 px-3 font-semibold">Pos</th><th className="py-3 px-3 font-semibold">#</th><th className="py-3 px-3 font-semibold">Pilot</th><th className="py-3 px-3 font-semibold text-center">Run 1</th><th className="py-3 px-3 font-semibold text-center">Run 2</th><th className="py-3 px-3 font-semibold text-center">Best</th><th className="py-3 px-3 font-semibold text-center">Pen.</th><th className="py-3 px-3 font-semibold">Status</th>
                        </tr></thead>
                        <tbody className="divide-y divide-border">
                        {QUALIFYING.map((q) => (
                            <tr key={q.pos} className="hover:bg-secondary/30">
                                <td className="py-2.5 px-3 font-bold tabular">{q.pos}</td>
                                <td className="py-2.5 px-3 font-mono text-primary">#{q.number}</td>
                                <td className="py-2.5 px-3 font-medium">{q.driver}</td>
                                <td className="py-2.5 px-3 text-center tabular">{q.run1}</td>
                                <td className="py-2.5 px-3 text-center tabular">{q.run2}</td>
                                <td className="py-2.5 px-3 text-center tabular font-bold text-primary">{q.best}</td>
                                <td className="py-2.5 px-3 text-center tabular text-red-400">{q.penalty || "—"}</td>
                                <td className="py-2.5 px-3"><StatusBadge tone={q.status === "Qualified" ? "emerald" : "amber"}>{q.status}</StatusBadge></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {section === "Battles" && (
                <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Top 16 → Final</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {["Top 16", "Top 8", "Semi Final", "Final"].map((round, ri) => (
                            <div key={round}>
                                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 text-center">{round}</div>
                                <div className="space-y-2">
                                    {(ri === 0 ? BATTLES.top16 : ri === 1 ? BATTLES.top16.slice(0, 4) : ri === 2 ? BATTLES.top16.slice(0, 2) : [["#23", "#07"]]).map((b, bi) => (
                                        <button key={bi} onClick={() => setJudge({ a: b[0], b: b[1], round })} className="w-full rounded-lg border border-border p-2.5 text-left hover:border-primary/40 transition">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-mono font-bold">{b[0]}</span><span className="text-muted-foreground text-xs">vs</span><span className="font-mono font-bold">{b[1]}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {section === "Results" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[["🥇", "Andrei Popescu", "#23"], ["🥈", "Mihai Radu", "#07"], ["🥉", "Vlad Dumitrescu", "#12"]].map((r) => (
                        <div key={r[2]} className="rounded-xl border-2 border-border bg-card p-5 text-center">
                            <div className="text-4xl">{r[0]}</div><div className="font-display font-bold mt-1">{r[1]}</div><div className="text-sm text-muted-foreground font-mono">{r[2]}</div>
                        </div>
                    ))}
                </div>
            )}

            {judge && <JudgeModal battle={judge} onClose={() => setJudge(null)} />}
        </div>
    );
}

function JudgeModal({ battle, onClose }) {
    const [decision, setDecision] = useState(null);
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-display font-bold">Judecare — {battle.round}</h2>
                    <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-lg border border-border p-4 text-center"><div className="font-mono font-bold text-2xl">{battle.a}</div><div className="text-xs text-muted-foreground">Lead Run</div></div>
                    <div className="rounded-lg border border-border p-4 text-center"><div className="font-mono font-bold text-2xl">{battle.b}</div><div className="text-xs text-muted-foreground">Chase Run</div></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {[battle.a, "ONE MORE TIME", battle.b].map((opt) => (
                        <button key={opt} onClick={() => setDecision(opt)} className={cn("py-3 rounded-lg border-2 font-bold text-sm transition", decision === opt ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40")}>{opt}</button>
                    ))}
                </div>
                <textarea placeholder="Note judecător…" className="w-full mt-3 rounded-lg border border-border bg-secondary/30 p-3 text-sm outline-none" rows={3} />
                {decision && <div className="mt-3 text-center text-sm text-emerald-400 flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Decizie înregistrată: {decision}</div>}
                <button onClick={onClose} className="w-full mt-3 py-3 rounded-lg bg-primary text-primary-foreground font-bold">Confirmă decizie</button>
            </div>
        </div>
    );
}