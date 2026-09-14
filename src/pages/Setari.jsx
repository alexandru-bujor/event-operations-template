import React, { useState } from "react";
import { Settings, Ticket, Map, ShieldCheck, Car, Percent, Users, GalleryThumbnails, Heart, UserCog, Bell } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import { useApp } from "@/lib/AppContext";
import { RON } from "@/lib/format";
import { cn } from "@/lib/utils";

const SECTIONS = [
    { id: "event", label: "Setări eveniment", icon: Settings },
    { id: "tickets", label: "Tipuri bilete", icon: Ticket },
    { id: "zones", label: "Zone", icon: Map },
    { id: "access", label: "Reguli acces", icon: ShieldCheck },
    { id: "taxi", label: "Prețuri Drift Taxi", icon: Car },
    { id: "settle", label: "Reguli decont", icon: Percent },
    { id: "groups", label: "Grupe piloți", icon: Users },
    { id: "expo", label: "Categorii Expo", icon: GalleryThumbnails },
    { id: "voting", label: "Setări votare", icon: Heart },
    { id: "users", label: "Utilizatori", icon: UserCog },
    { id: "roles", label: "Roluri & permisiuni", icon: ShieldCheck },
    { id: "notif", label: "Setări notificări", icon: Bell },
];

export default function Setari() {
    const { TICKET_TYPES, DRIVERS, EXPO_CATEGORIES, taxiDrivers } = useApp();
    const [active, setActive] = useState("event");

    return (
        <div>
            <PageHeader title="Setări" subtitle="Configurare platformă" icon={Settings} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-border bg-card p-2 h-fit">
                    {SECTIONS.map((s) => (
                        <button key={s.id} onClick={() => setActive(s.id)} className={cn("w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left", active === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50")}>
                            <s.icon className="w-4 h-4" /> {s.label}
                        </button>
                    ))}
                </div>
                <div className="lg:col-span-3 rounded-xl border border-border bg-card p-5">
                    {active === "event" && <div className="space-y-3 text-sm"><Field label="Nume eveniment" value="DRIFT FESTIVAL 2027" /><Field label="Status" value="LIVE" /><Field label="Zile" value="2 (Fun Day / Competiție)" /></div>}
                    {active === "tickets" && <div className="space-y-2">{TICKET_TYPES.map((t) => <div key={t.id} className="flex items-center justify-between rounded-lg border border-border p-3"><span className="font-medium">{t.name}</span><span className="text-muted-foreground">{t.zone}</span><span className="font-bold tabular text-primary">{RON(t.price)}</span></div>)}</div>}
                    {active === "zones" && <div className="flex flex-wrap gap-2">{["Tribună", "VIP", "Paddock", "Pista", "P1-P5 Parking", "Medical", "Media"].map((z) => <span key={z} className="px-3 py-1.5 rounded-md bg-secondary text-sm">{z}</span>)}</div>}
                    {active === "access" && <div className="space-y-2 text-sm"><div className="flex justify-between"><span>GENERAL → Tribună</span><span className="text-emerald-400">✓</span></div><div className="flex justify-between"><span>VIP → Paddock</span><span className="text-emerald-400">✓</span></div><div className="flex justify-between"><span>GENERAL → Paddock</span><span className="text-red-400">✗</span></div></div>}
                    {active === "taxi" && <div className="space-y-2">{taxiDrivers.slice(0, 5).map((d) => <div key={d.id} className="flex justify-between rounded-lg border border-border p-3 text-sm"><span>#{d.number} {d.name}</span><span className="font-bold tabular">{RON(d.driftTaxiPrice)}</span></div>)}</div>}
                    {active === "settle" && <div className="text-center py-6"><div className="text-3xl font-display font-bold text-primary">50 / 50</div><div className="text-sm text-muted-foreground mt-1">Pilot / Organizator</div></div>}
                    {active === "groups" && <div className="grid grid-cols-2 gap-3">{["A", "B"].map((g) => <div key={g} className="rounded-lg border border-border p-4"><div className="font-semibold">Grupa {g}</div><div className="text-sm text-muted-foreground">{DRIVERS.filter((d) => d.group === g).length} piloți</div></div>)}</div>}
                    {active === "expo" && <div className="flex flex-wrap gap-2">{EXPO_CATEGORIES.map((c) => <span key={c} className="px-3 py-1.5 rounded-md bg-secondary text-sm">{c}</span>)}</div>}
                    {active === "voting" && <div className="space-y-2 text-sm"><div className="flex justify-between"><span>Votare public</span><span className="text-emerald-400">Deschis</span></div><div className="flex justify-between"><span>1 vot / utilizator</span><span className="text-emerald-400">✓</span></div></div>}
                    {active === "users" && <div className="space-y-2 text-sm">{["Alex Ionescu (Admin)", "Maria Popescu (Casier)", "Race Control (Control Pista)"].map((u) => <div key={u} className="flex justify-between rounded-lg border border-border p-3"><span>{u}</span><span className="text-muted-foreground">Activ</span></div>)}</div>}
                    {active === "roles" && <div className="flex flex-wrap gap-2">{["Administrator", "Casier", "Securitate", "Pilot", "Judecător", "Inspector Tehnic", "Control Pista", "Staff Expo"].map((r) => <span key={r} className="px-3 py-1.5 rounded-md bg-secondary text-sm">{r}</span>)}</div>}
                    {active === "notif" && <div className="space-y-2 text-sm"><div className="flex justify-between"><span>Push piloți</span><span className="text-emerald-400">Activ</span></div><div className="flex justify-between"><span>Alerte staff</span><span className="text-emerald-400">Activ</span></div></div>}
                </div>
            </div>
        </div>
    );
}
function Field({ label, value }) { return <div className="rounded-lg border border-border p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div><div className="font-semibold mt-0.5">{value}</div></div>; }