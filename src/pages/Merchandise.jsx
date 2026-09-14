import React from "react";
import { Shirt, Minus, Plus } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { RON, NUM } from "@/lib/format";
import { toast } from "sonner";

export default function Merchandise() {
    const { merch, merchCart, setMerchCart, sellMerch } = useApp();
    const total = Object.entries(merchCart).reduce((s, [id, q]) => s + (merch.find((m) => m.id === id)?.price || 0) * q, 0);
    const count = Object.values(merchCart).reduce((s, q) => s + q, 0);
    return (
        <div>
            <PageHeader title="Merchandise" subtitle="POS & stoc" icon={Shirt} actions={<StatusBadge tone="amber" dot>CASH ONLY</StatusBadge>} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {merch.map((m) => (
                        <div key={m.id} className="rounded-xl border border-border bg-card p-4">
                            <div className="flex items-start justify-between"><div><div className="font-semibold">{m.name}</div><div className="text-xs text-muted-foreground">Stoc: {m.stock} · Vândute: {m.sold}</div></div><div className="text-xl font-display font-bold tabular">{RON(m.price)}</div></div>
                            <div className="flex items-center justify-between mt-3">
                                <div className="text-xs text-muted-foreground">Venit: <span className="text-emerald-400 font-semibold">{RON(m.price * m.sold)}</span></div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setMerchCart((c) => ({ ...c, [m.id]: Math.max(0, (c[m.id] || 0) - 1) }))} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                                    <span className="w-8 text-center font-bold tabular">{merchCart[m.id] || 0}</span>
                                    <button onClick={() => setMerchCart((c) => ({ ...c, [m.id]: (c[m.id] || 0) + 1 }))} className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Plus className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="rounded-xl border border-border bg-card p-4 h-fit sticky top-0">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Comanda</h3>
                    {count === 0 ? <div className="text-sm text-muted-foreground py-6 text-center border border-dashed border-border rounded-lg">Coș gol</div> : (
                        <div className="space-y-2">{merch.filter((m) => merchCart[m.id]).map((m) => <div key={m.id} className="flex justify-between text-sm"><span>{m.name} × {merchCart[m.id]}</span><span className="tabular">{RON(m.price * merchCart[m.id])}</span></div>)}</div>
                    )}
                    <div className="border-t border-border mt-3 pt-3 flex justify-between"><span className="font-semibold">Total</span><span className="text-xl font-display font-bold tabular text-primary">{RON(total)}</span></div>
                    <button onClick={() => sellMerch(merchCart)} disabled={count === 0} className="w-full mt-3 py-3 rounded-lg bg-primary text-primary-foreground font-bold uppercase tracking-wider disabled:opacity-40">Vânzare cash</button>
                </div>
            </div>
        </div>
    );
}