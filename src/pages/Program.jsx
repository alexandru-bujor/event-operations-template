import React from "react";
import { Calendar, Pencil, Clock, Bell, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import { toast } from "sonner";

const TYPE_TONE = { session: "amber", tech: "sky", track: "emerald", taxi: "violet", expo: "violet", brief: "slate", admin: "slate" };

export default function Program() {
    const { SCHEDULE, day } = useApp();

    const action = (label) => toast.success(label);

    return (
        <div>
            <PageHeader title="Program" subtitle={`Ziua ${day} · Timeline`} icon={Calendar} />
            <div className="relative pl-6">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
                <div className="space-y-3">
                    {SCHEDULE.map((s, i) => (
                        <div key={i} className="relative">
                            <div className={`absolute -left-[18px] top-3 w-3 h-3 rounded-full border-2 border-background ${s.group === "A" ? "bg-sky-400" : s.group === "B" ? "bg-amber-400" : "bg-primary"}`} />
                            <div className="rounded-xl border border-border bg-card p-3 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-mono tabular text-muted-foreground w-24 shrink-0">{s.time}</span>
                                    <div>
                                        <div className="font-medium text-sm">{s.title}</div>
                                        {s.group && <span className="text-xs text-muted-foreground">Grupa {s.group}</span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    {s.group && <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${s.group === "A" ? "bg-sky-500/15 text-sky-300" : "bg-amber-500/15 text-amber-300"}`}>Grupa {s.group}</span>}
                                    <button onClick={() => action("Sesiune editată")} className="w-7 h-7 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => action("Sesiune întârziată +10 min")} className="w-7 h-7 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground" title="Delay"><Clock className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => action("Grupă notificată")} className="w-7 h-7 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground" title="Notify"><Bell className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => action("Sesiune mutată")} className="w-7 h-7 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground" title="Move"><ArrowRight className="w-3.5 h-3.5" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}