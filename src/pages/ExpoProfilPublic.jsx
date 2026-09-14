import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, CheckCircle2, ArrowLeft, Share2 } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import StatusBadge from "@/components/ui/StatusBadge";
import { NUM } from "@/lib/format";

export default function ExpoProfilPublic() {
    const { id } = useParams();
    const nav = useNavigate();
    const { expoCars, voteExpoCar, expoVotingOpen, myVote } = useApp();
    const car = expoCars.find((c) => c.id === id) || expoCars[0];
    const [voted, setVoted] = useState(myVote === car.id);

    const handleVote = () => {
        if (voteExpoCar(car.id)) setVoted(true);
    };

    return (
        <div className="max-w-2xl mx-auto pb-10">
            <button onClick={() => nav("/car-expo")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3"><ArrowLeft className="w-4 h-4" /> Înapoi la Expo</button>

            {/* Hero photo */}
            <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-violet-500/20 via-secondary to-secondary/40 border border-border flex items-center justify-center relative overflow-hidden">
                <span className="text-7xl font-display font-bold text-foreground/10">#{car.number}</span>
                <div className="absolute top-3 left-3"><StatusBadge tone="violet">EXPO #{car.number}</StatusBadge></div>
                <div className="absolute top-3 right-3"><StatusBadge tone={expoVotingOpen ? "emerald" : "slate"} dot={expoVotingOpen}>{expoVotingOpen ? "VOTARE DESCHISĂ" : "ÎNCHISĂ"}</StatusBadge></div>
            </div>

            <div className="mt-4">
                <h1 className="text-3xl font-display font-bold tracking-tight">{car.model}</h1>
                <div className="text-muted-foreground">{car.year} · {car.color}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                <Field label="Proprietar" value={car.owner} />
                <Field label="Club" value={car.club} />
                <Field label="Motor" value={car.engine} />
                <Field label="Putere" value={`${car.power} HP`} />
                <Field label="Jante" value={car.wheels} />
                <Field label="Voturi" value={NUM(car.votes)} highlight />
            </div>

            <div className="mt-4 rounded-xl border border-border bg-card p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Descriere modificări</div>
                <p className="text-sm leading-relaxed">{car.desc}</p>
            </div>

            {voted ? (
                <div className="mt-4 rounded-xl border-2 border-emerald-500/50 bg-emerald-500/10 p-6 text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                    <div className="text-xl font-display font-bold text-emerald-400">VOT ÎNREGISTRAT</div>
                    <div className="text-sm text-muted-foreground mt-1">Mulțumim! 🙌</div>
                </div>
            ) : (
                <button onClick={handleVote} disabled={!expoVotingOpen}
                        className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40 disabled:from-slate-600 disabled:to-slate-700">
                    <Heart className="w-5 h-5" /> {expoVotingOpen ? "VOTEAZĂ ACEASTĂ MAȘINĂ" : "VOTARE ÎNCHISĂ"}
                </button>
            )}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground"><Share2 className="w-3.5 h-3.5" /> Distribuie profilul</div>
        </div>
    );
}

function Field({ label, value, highlight }) {
    return (
        <div className="rounded-lg bg-secondary/30 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className={highlight ? "font-bold text-lg tabular text-violet-300" : "font-semibold"}>{value}</div>
        </div>
    );
}