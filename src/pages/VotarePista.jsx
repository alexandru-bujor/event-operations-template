import React from "react";
import { Gauge, CheckCircle2, Users } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const DIAGRAMS = {
    A: "M20,80 Q40,20 80,40 T140,30 Q170,60 150,90 Q100,110 60,100 Z",
    B: "M30,30 L150,30 L150,90 L30,90 L30,30 M30,60 L150,60",
    C: "M40,40 C40,20 160,20 160,60 C160,100 40,100 40,60 Z",
};

export default function VotarePista() {
    const { trackVote, voteTrack, trackVotes } = useApp();
    const total = Object.values(trackVotes).reduce((s, v) => s + v, 0) + (trackVote ? 1 : 0);
    return (
        <div>
            <PageHeader title="Votare Layout Pistă" subtitle="Piloții aleg configurația" icon={Gauge}
                        actions={<StatusBadge tone="emerald" dot>VOTARE DESCHISĂ</StatusBadge>} />
            <div className="flex items-center gap-4 mb-5 text-sm text-muted-foreground"><Users className="w-4 h-4" /> {total} / 20 piloți au votat · Închidere: 13:30</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["A", "B", "C"].map((opt) => (
                    <div key={opt} className={cn("rounded-xl border-2 bg-card p-4 transition", trackVote === opt ? "border-primary ring-1 ring-primary/40" : "border-border")}>
                        <div className="aspect-video bg-secondary/30 rounded-lg flex items-center justify-center mb-3">
                            <svg viewBox="0 0 180 120" className="w-3/4 h-3/4"><path d={DIAGRAMS[opt]} fill="none" stroke="hsl(24 92% 55%)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                        <div className="flex items-center justify-between"><h3 className="font-display font-bold text-lg">Track {opt}</h3><span className="text-xs text-muted-foreground">{trackVotes[opt] + (trackVote === opt ? 1 : 0)} voturi</span></div>
                        <button onClick={() => voteTrack(opt)} disabled={!!trackVote} className={cn("w-full mt-3 py-2.5 rounded-lg font-bold text-sm", trackVote ? (trackVote === opt ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "border border-border text-muted-foreground") : "bg-primary text-primary-foreground hover:opacity-90")}>
                            {trackVote === opt ? <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Vot înregistrat</span> : trackVote ? "Blocat" : "VOTEAZĂ"}
                        </button>
                    </div>
                ))}
            </div>
            {trackVote && <div className="mt-4 rounded-xl border-2 border-emerald-500/40 bg-emerald-500/10 p-4 text-center text-emerald-400 font-semibold">Votul tău a fost înregistrat pentru Track {trackVote}.</div>}
        </div>
    );
}