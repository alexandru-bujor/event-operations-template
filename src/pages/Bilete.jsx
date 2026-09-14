import React, { useState } from "react";
import { Minus, Plus, Trash2, CheckCircle2, Printer, Mail, RefreshCw, X } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import { RON } from "@/lib/format";
import { Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = {
    sky: "border-sky-500/40 hover:bg-sky-500/10",
    amber: "border-amber-500/40 hover:bg-amber-500/10",
    violet: "border-violet-500/40 hover:bg-violet-500/10",
    emerald: "border-emerald-500/40 hover:bg-emerald-500/10",
};

export default function Bilete() {
    const { TICKET_TYPES, cart, addToCart, decFromCart, removeFromCart, cartTotal, cartCount, confirmSale, recentSales } = useApp();
    const [modal, setModal] = useState(null);

    const handleConfirm = () => {
        const tickets = confirmSale();
        if (tickets) setModal({ tickets, total: tickets.reduce((s, t) => s + t.price, 0) });
    };

    return (
        <div>
            <PageHeader title="Bilete — POS" subtitle="Casă rapidă · Plata NUMAI CASH" icon={Ticket} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                    {TICKET_TYPES.map((t) => (
                        <div key={t.id} className={cn("rounded-xl border-2 bg-card p-4 flex flex-col transition cursor-pointer", ACCENT[t.accent])}
                             onClick={() => addToCart(t.id)}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-lg font-display font-bold tracking-tight">{t.name}</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">{t.zone}</div>
                                </div>
                                <div className="text-2xl font-display font-bold tabular">{t.price}<span className="text-sm text-muted-foreground ml-1">RON</span></div>
                            </div>
                            <div className="mt-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => decFromCart(t.id)} className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/70 flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                                <div className="flex-1 text-center text-xl font-bold tabular">{cart[t.id] || 0}</div>
                                <button onClick={() => addToCart(t.id)} className="w-10 h-10 rounded-lg bg-primary text-primary-foreground hover:opacity-90 flex items-center justify-center"><Plus className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border border-border bg-card p-4 flex flex-col h-fit sticky top-0">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Comanda curentă</h3>
                    {cartCount === 0 ? (
                        <div className="text-sm text-muted-foreground py-8 text-center border border-dashed border-border rounded-lg">Apasă pe un bilet pentru a adăuga</div>
                    ) : (
                        <div className="space-y-2 flex-1">
                            {TICKET_TYPES.filter((t) => cart[t.id]).map((t) => (
                                <div key={t.id} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{t.name}</span>
                                        <span className="text-muted-foreground">× {cart[t.id]}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="tabular font-semibold">{RON(t.price * cart[t.id])}</span>
                                        <button onClick={() => removeFromCart(t.id)} className="text-muted-foreground hover:text-red-400"><X className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="border-t border-border mt-4 pt-3 space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Bilete</span><span className="tabular">{cartCount}</span></div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold">Total</span>
                            <span className="text-2xl font-display font-bold tabular text-primary">{RON(cartTotal)}</span>
                        </div>
                        <div className="text-xs text-center py-1.5 rounded-md bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/30">PLATĂ: NUMAI CASH</div>
                        <button onClick={handleConfirm} disabled={cartCount === 0}
                                className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-40 transition">
                            Confirmă vânzare cash
                        </button>
                    </div>
                </div>
            </div>

            {recentSales.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Vânzări recente</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {recentSales.slice(0, 6).map((s) => (
                            <div key={s.id} className="rounded-lg border border-border bg-card p-3">
                                <div className="flex justify-between text-xs text-muted-foreground"><span>{s.time}</span><span className="font-mono">{s.id}</span></div>
                                <div className="text-sm font-medium mt-1">{s.tickets.map((t) => t.type).join(", ")}</div>
                                <div className="text-lg font-bold tabular text-primary mt-1">{RON(s.total)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {modal && <SuccessModal sale={modal} onClose={() => setModal(null)} />}
        </div>
    );
}

function SuccessModal({ sale, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-card border border-emerald-500/40 rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-3"><CheckCircle2 className="w-9 h-9 text-emerald-400" /></div>
                    <h2 className="text-xl font-display font-bold text-emerald-400">VÂNZARE COMPLETĂ</h2>
                    <p className="text-sm text-muted-foreground mt-1">Total: <span className="font-bold text-foreground">{RON(sale.total)}</span></p>
                </div>
                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto scrollbar-thin">
                    {sale.tickets.map((t) => (
                        <div key={t.id} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                            <div className="w-12 h-12 bg-secondary rounded grid grid-cols-4 gap-px p-1 shrink-0">
                                {Array.from({ length: 16 }).map((_, i) => <div key={i} className="bg-foreground/80 rounded-[1px]" />)}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-semibold">{t.type}</div>
                                <div className="text-xs text-muted-foreground font-mono">{t.id} · {t.zone}</div>
                            </div>
                            <div className="text-sm font-bold tabular">{RON(t.price)}</div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <button className="py-2.5 rounded-lg border border-border hover:bg-secondary flex items-center justify-center gap-2 text-sm font-medium"><Printer className="w-4 h-4" /> Tipărește</button>
                    <button className="py-2.5 rounded-lg border border-border hover:bg-secondary flex items-center justify-center gap-2 text-sm font-medium"><Mail className="w-4 h-4" /> Email (opțional)</button>
                </div>
                <button onClick={onClose} className="w-full mt-2 py-3 rounded-lg bg-primary text-primary-foreground font-bold uppercase tracking-wider flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4" /> Vânzare nouă</button>
            </div>
        </div>
    );
}