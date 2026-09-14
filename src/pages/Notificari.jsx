import React, { useState } from "react";
import { Bell, Send } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

export default function Notificari() {
    const { notifications, sendNotification, NOTIFICATION_TARGETS } = useApp();
    const [to, setTo] = useState(NOTIFICATION_TARGETS[0]);
    const [text, setText] = useState("");
    const [priority, setPriority] = useState("Normal");

    return (
        <div>
            <PageHeader title="Notificări" subtitle="Comunicare staff & piloți" icon={Bell} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Compune</h3>
                    <div className="space-y-3">
                        <div><label className="text-xs text-muted-foreground">Destinatari</label>
                            <div className="flex flex-wrap gap-1.5 mt-1">{NOTIFICATION_TARGETS.map((t) => <button key={t} onClick={() => setTo(t)} className={cn("px-2.5 py-1 rounded-md text-xs font-semibold border", to === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground")}>{t}</button>)}</div>
                        </div>
                        <div><label className="text-xs text-muted-foreground">Mesaj</label><textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Scrie mesajul…" className="w-full rounded-lg border border-border bg-secondary/30 p-3 text-sm outline-none" /></div>
                        <div><label className="text-xs text-muted-foreground">Prioritate</label><div className="flex gap-2 mt-1">{["Normal", "Important", "Critical"].map((p) => <button key={p} onClick={() => setPriority(p)} className={cn("flex-1 py-2 rounded-lg text-sm font-semibold border", priority === p ? (p === "Critical" ? "bg-red-500/20 text-red-300 border-red-500/40" : p === "Important" ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-primary text-primary-foreground border-primary") : "border-border text-muted-foreground")}>{p}</button>)}</div></div>
                        <button onClick={() => { if (text) { sendNotification({ to, text, priority }); setText(""); } }} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-bold uppercase tracking-wider flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Trimite</button>
                    </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Istoric</h3>
                    <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin">
                        {notifications.map((n) => (
                            <div key={n.id} className="rounded-lg border border-border p-3">
                                <div className="flex items-center justify-between mb-1"><StatusBadge tone={n.priority === "Critical" ? "red" : n.priority === "Important" ? "amber" : "slate"}>{n.priority}</StatusBadge><span className="text-xs text-muted-foreground tabular">{n.time}</span></div>
                                <div className="text-sm">{n.text}</div><div className="text-xs text-muted-foreground mt-1">→ {n.to}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}