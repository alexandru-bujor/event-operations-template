import React, { useState } from "react";
import { GalleryThumbnails, Heart, Trophy, Lock, Unlock } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import StatusBadge, { statusTone } from "@/components/ui/StatusBadge";
import { NUM } from "@/lib/format";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function CarExpo() {
    const { expoCars, expoVotingOpen, expoVotesTotal, expoStats, closeExpoVoting, EXPO_CATEGORIES } = useApp();
    const [tab, setTab] = useState(EXPO_CATEGORIES[0]);
    const nav = useNavigate();
    const ranked = [...expoCars].sort((a, b) => b.votes - a.votes);

    return (
        <div>
            <PageHeader title="Car Expo" subtitle="Management expo & votare public" icon={GalleryThumbnails}
                        actions={<button onClick={closeExpoVoting} disabled={!expoVotingOpen}
                                         className="px-3 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/40 text-sm font-semibold hover:bg-red-500/30 disabled:opacity-40 flex items-center gap-2">
                            {expoVotingOpen ? <><Lock className="w-4 h-4" /> Închide votarea</> : <><Unlock className="w-4 h-4" /> Votare închisă</>}
                        </button>} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                <StatCard label="Înregistrate" value={NUM(expoStats.registered)} />
                <StatCard label="Aprobate" value={NUM(expoStats.approved)} tone="sky" />
                <StatCard label="Check-in" value={NUM(expoStats.checkedIn)} tone="emerald" />
                <StatCard label="Voturi totale" value={NUM(expoVotesTotal)} tone="violet" icon={Heart} />
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap gap-1.5">
                    {EXPO_CATEGORIES.map((c) => (
                        <button key={c} onClick={() => setTab(c)}
                                className={cn("px-3 py-1.5 rounded-md text-xs font-semibold border transition",
                                    tab === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground")}>{c}</button>
                    ))}
                </div>
                <StatusBadge tone={expoVotingOpen ? "emerald" : "slate"} dot={expoVotingOpen}>{expoVotingOpen ? "VOTARE DESCHISĂ" : "VOTARE ÎNCHISĂ"}</StatusBadge>
            </div>

            {!expoVotingOpen && (
                <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3"><Trophy className="w-5 h-5 text-amber-400" /><h3 className="font-display font-bold text-amber-400">REZULTATE OFICIALE — {tab}</h3></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {ranked.slice(0, 3).map((c, i) => (
                            <div key={c.id} className={cn("rounded-lg border-2 p-4 text-center", i === 0 ? "border-amber-500 bg-amber-500/10" : i === 1 ? "border-slate-400 bg-slate-400/10" : "border-orange-700 bg-orange-700/10")}>
                                <div className="text-3xl font-display font-bold">{i === 0 ? "🥇 1" : i === 1 ? "🥈 2" : "🥉 3"}</div>
                                <div className="font-semibold mt-1">{c.model}</div>
                                <div className="text-xs text-muted-foreground">{c.owner}</div>
                                <div className="text-lg font-bold tabular text-primary mt-1">{NUM(c.votes)} voturi</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {ranked.map((c, i) => (
                    <div key={c.id} className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 cursor-pointer transition" onClick={() => nav(`/expo-profil/${c.id}`)}>
                        <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-secondary/40 flex items-center justify-center relative">
                            <span className="text-4xl font-display font-bold text-foreground/20">#{c.number}</span>
                            {expoVotingOpen && <div className="absolute top-2 right-2"><StatusBadge tone="violet">#{i + 1}</StatusBadge></div>}
                        </div>
                        <div className="p-3">
                            <div className="font-semibold text-sm truncate">{c.model}</div>
                            <div className="text-xs text-muted-foreground truncate">{c.owner} · {c.club}</div>
                            <div className="flex items-center justify-between mt-2">
                                <StatusBadge tone={statusTone(c.status)}>{c.status}</StatusBadge>
                                <span className="text-xs flex items-center gap-1 text-violet-300 font-semibold"><Heart className="w-3 h-3" /> {NUM(c.votes)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}