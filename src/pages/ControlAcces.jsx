import React, { useState } from "react";
import { ScanLine, CheckCircle2, XCircle, Camera, RefreshCw } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const ZONES = ["PADDOCK", "VIP", "TRIBUNĂ", "PISTA", "P1 PUBLIC", "P2 VIP"];

export default function ControlAcces() {
    const { accessScans, scanAccess, assignedZone, setAssignedZone } = useApp();
    const [result, setResult] = useState(null);
    const [scanning, setScanning] = useState(false);

    const handleScan = () => {
        setScanning(true);
        setResult(null);
        setTimeout(() => {
            const r = scanAccess();
            setResult(r);
            setScanning(false);
        }, 900);
    };

    return (
        <div>
            <PageHeader title="Control Acces" subtitle="Scaner mobil · Zonă asignată" icon={ScanLine}
                        actions={<StatusBadge tone="red" dot>LIVE</StatusBadge>} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <div className="mb-3">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Zonă asignată</div>
                        <div className="flex flex-wrap gap-2">
                            {ZONES.map((z) => (
                                <button key={z} onClick={() => setAssignedZone(z)}
                                        className={cn("px-3 py-1.5 rounded-md text-xs font-semibold border transition",
                                            assignedZone === z ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground")}>
                                    {z}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border-2 border-border bg-card overflow-hidden">
                        {/* Scanner viewport */}
                        <div className="relative aspect-[4/3] bg-black grid-bg flex items-center justify-center">
                            {scanning && <div className="absolute inset-x-0 h-0.5 bg-primary shadow-[0_0_20px_4px_hsl(24_92%_55%)] animate-[scan_1s_ease-in-out]" style={{ animation: "scanline 0.9s ease-in-out" }} />}
                            {result ? (
                                <div className={cn("absolute inset-0 flex flex-col items-center justify-center text-center p-6",
                                    result.result === "GRANTED" ? "bg-emerald-500/15" : "bg-red-500/15")}>
                                    {result.result === "GRANTED" ? <CheckCircle2 className="w-20 h-20 text-emerald-400" /> : <XCircle className="w-20 h-20 text-red-400" />}
                                    <div className={cn("text-3xl font-display font-bold mt-2", result.result === "GRANTED" ? "text-emerald-400" : "text-red-400")}>
                                        {result.result === "GRANTED" ? "ACCES PERMIS" : "ACCES RESPINS"}
                                    </div>
                                    <div className="mt-3 text-sm">
                                        <div className="font-semibold text-lg">{result.name}</div>
                                        <div className="text-muted-foreground">Bilet: <span className="font-bold text-foreground">{result.ticket}</span></div>
                                        <div className="text-muted-foreground">Zonă: {result.zone}</div>
                                        {result.reason && <div className="text-red-300 font-semibold mt-1">{result.reason}</div>}
                                        <div className="text-xs text-muted-foreground mt-1">{result.time}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <div className="text-sm">Pointează camera spre QR</div>
                                </div>
                            )}
                            {/* corner brackets */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/60 rounded-tl-lg" />
                            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/60 rounded-tr-lg" />
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/60 rounded-bl-lg" />
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/60 rounded-br-lg" />
                        </div>
                        <button onClick={handleScan} disabled={scanning}
                                className="w-full py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                            {scanning ? <><RefreshCw className="w-5 h-5 animate-spin" /> Scanez…</> : <><ScanLine className="w-5 h-5" /> Scanează QR</>}
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Scanări recente</h3>
                    <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-thin">
                        {accessScans.map((s) => (
                            <div key={s.id} className={cn("rounded-lg border p-3 flex items-center gap-3",
                                s.result === "GRANTED" ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5")}>
                                {s.result === "GRANTED" ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-sm truncate">{s.name}</span>
                                        <span className="text-xs text-muted-foreground tabular">{s.time}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{s.ticket} · {s.zone}{s.reason ? ` · ${s.reason}` : ""}</div>
                                </div>
                                <StatusBadge tone={s.result === "GRANTED" ? "emerald" : "red"}>{s.result}</StatusBadge>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`@keyframes scanline { 0%{top:10%} 50%{top:90%} 100%{top:10%} }`}</style>
        </div>
    );
}