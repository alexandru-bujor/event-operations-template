import React, { useState } from "react";
import { ParkingSquare, ScanLine, CheckCircle2, XCircle } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Parking() {
    const { PARKING } = useApp();
    const [scan, setScan] = useState(null);
    const handleScan = () => { const ok = Math.random() > 0.25; setScan(ok ? { ok: true, plate: "B 123 ABC", zone: "P3 Piloți" } : { ok: false, plate: "CJ 456 XYZ", zone: "P3 Piloți", reason: "Permis invalid" }); toast[ok ? "success" : "error"](ok ? "Permis valid" : "Acces respins"); };
    return (
        <div>
            <PageHeader title="Parking" subtitle="Zone & capacitate" icon={ParkingSquare} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {PARKING.map((p) => {
                    const pct = (p.occupied / p.capacity) * 100;
                    return (
                        <div key={p.id} className="rounded-xl border border-border bg-card p-4">
                            <div className="flex items-center justify-between mb-2"><h3 className="font-semibold">{p.name}</h3><span className="text-xs text-muted-foreground tabular">{p.occupied}/{p.capacity}</span></div>
                            <div className="h-2 rounded-full bg-secondary overflow-hidden"><div className={cn("h-full", pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-500" : "bg-emerald-500")} style={{ width: `${pct}%` }} /></div>
                            <div className="flex justify-between text-xs mt-2"><span className="text-muted-foreground">Ocupat: {p.occupied}</span><span className="text-emerald-400">Liber: {p.capacity - p.occupied}</span></div>
                        </div>
                    );
                })}
            </div>
            <div className="rounded-xl border border-border bg-card p-4 max-w-md">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Validare permis QR</h3>
                <button onClick={handleScan} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-bold uppercase tracking-wider flex items-center justify-center gap-2"><ScanLine className="w-5 h-5" /> Scanează permis</button>
                {scan && (
                    <div className={cn("mt-3 rounded-lg p-3 text-center", scan.ok ? "bg-emerald-500/10 text-emerald-300" : "bg-red-500/10 text-red-300")}>
                        {scan.ok ? <CheckCircle2 className="w-8 h-8 mx-auto" /> : <XCircle className="w-8 h-8 mx-auto" />}
                        <div className="font-bold mt-1">{scan.ok ? "PERMIS VALID" : "RESPINS"}</div>
                        <div className="text-xs">{scan.plate} · {scan.zone}{scan.reason ? ` · ${scan.reason}` : ""}</div>
                    </div>
                )}
            </div>
        </div>
    );
}