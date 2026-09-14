import React, { useState } from "react";
import { Wallet, Lock, Unlock, SlidersHorizontal } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { RON } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function Casa() {
    const { reg, regTx, closeRegister, openRegister, cashAdjustment } = useApp();
    const [counted, setCounted] = useState("");
    const [adjAmt, setAdjAmt] = useState("");
    const [adjReason, setAdjReason] = useState("");
    const [showAdj, setShowAdj] = useState(false);
    const expected = reg.openingCash + reg.sales;
    const diff = reg.counted != null ? reg.counted - expected : null;

    return (
        <div>
            <PageHeader title="Casă — Sesiune Casier" subtitle={reg.register} icon={Wallet}
                        actions={<StatusBadge tone={reg.open ? "emerald" : "slate"} dot={reg.open}>{reg.open ? "DESCHISĂ" : "ÎNCHISĂ"}</StatusBadge>} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <Info label="Casă" value={reg.register} /><Info label="Casier" value={reg.cashier} />
                        <Info label="Cash deschidere" value={RON(reg.openingCash)} /><Info label="Vânzări" value={RON(reg.sales)} />
                        <Info label="Cash așteptat" value={RON(expected)} highlight />
                        <Info label="Cash numărat" value={reg.counted != null ? RON(reg.counted) : "—"} />
                    </div>
                    <div className="border-t border-border mt-4 pt-4">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Închidere casă</div>
                        <div className="flex gap-2">
                            <input type="number" value={counted} onChange={(e) => setCounted(e.target.value)} placeholder="Cash numărat (RON)" disabled={!reg.open} className="flex-1 rounded-lg border border-border bg-secondary/30 p-2.5 text-sm outline-none disabled:opacity-50" />
                            <button onClick={() => { if (counted) { closeRegister(Number(counted)); setCounted(""); } }} disabled={!reg.open || !counted} className="px-4 rounded-lg bg-red-500/20 text-red-300 border border-red-500/40 font-semibold disabled:opacity-40 flex items-center gap-2"><Lock className="w-4 h-4" /> Închide</button>
                        </div>
                        {diff != null && (
                            <div className={cn("mt-3 rounded-lg p-3 text-center font-bold", diff === 0 ? "bg-emerald-500/10 text-emerald-300" : diff > 0 ? "bg-emerald-500/10 text-emerald-300" : "bg-red-500/10 text-red-300")}>
                                Diferență: {diff >= 0 ? "+" : ""}{RON(diff)}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        <button onClick={() => openRegister()} disabled={reg.open} className="py-2.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold disabled:opacity-40 flex items-center justify-center gap-2"><Unlock className="w-4 h-4" /> Deschide</button>
                        <button onClick={() => setShowAdj((s) => !s)} className="py-2.5 rounded-lg border border-border hover:bg-secondary font-semibold flex items-center justify-center gap-2"><SlidersHorizontal className="w-4 h-4" /> Ajustare</button>
                        <button disabled className="py-2.5 rounded-lg border border-border text-muted-foreground font-semibold opacity-50">Raport Z</button>
                    </div>
                    {showAdj && (
                        <div className="mt-3 rounded-lg border border-border p-3 flex gap-2">
                            <input type="number" value={adjAmt} onChange={(e) => setAdjAmt(e.target.value)} placeholder="Sumă" className="w-28 rounded-lg border border-border bg-secondary/30 p-2 text-sm outline-none" />
                            <input value={adjReason} onChange={(e) => setAdjReason(e.target.value)} placeholder="Motiv ajustare" className="flex-1 rounded-lg border border-border bg-secondary/30 p-2 text-sm outline-none" />
                            <button onClick={() => { if (adjAmt && adjReason) { cashAdjustment(Number(adjAmt), adjReason); setAdjAmt(""); setAdjReason(""); setShowAdj(false); } }} className="px-4 rounded-lg bg-primary text-primary-foreground font-semibold text-sm">OK</button>
                        </div>
                    )}
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Istoric tranzacții</h3>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin">
                        {regTx.map((t) => (
                            <div key={t.id} className="flex items-center justify-between text-sm border-b border-border pb-2">
                                <div><div className="font-medium">{t.type}</div><div className="text-xs text-muted-foreground">{t.time}</div></div>
                                <span className="tabular font-semibold">{RON(t.amount)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
function Info({ label, value, highlight }) {
    return <div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div><div className={highlight ? "font-bold text-lg tabular text-emerald-400" : "font-semibold mt-0.5"}>{value}</div></div>;
}