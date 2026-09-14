import React from "react";
import { Store } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { RON } from "@/lib/format";

export default function Vanzatori() {
    const { VENDORS } = useApp();
    return (
        <div>
            <PageHeader title="Vânzători" subtitle="Food, merch & alții" icon={Store} />
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                    <thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border bg-secondary/30">
                        <th className="py-3 px-3 font-semibold">Nume</th><th className="py-3 px-3 font-semibold">Tip</th><th className="py-3 px-3 font-semibold">Locație</th><th className="py-3 px-3 font-semibold">Contract</th><th className="py-3 px-3 font-semibold text-right">Taxă</th><th className="py-3 px-3 font-semibold text-center">Acredit.</th><th className="py-3 px-3 font-semibold text-center">Parking</th>
                    </tr></thead>
                    <tbody className="divide-y divide-border">
                    {VENDORS.map((v) => (
                        <tr key={v.id} className="hover:bg-secondary/30">
                            <td className="py-2.5 px-3 font-medium">{v.name}</td>
                            <td className="py-2.5 px-3"><StatusBadge tone={v.type === "Food" ? "amber" : v.type === "Merch" ? "violet" : "sky"}>{v.type}</StatusBadge></td>
                            <td className="py-2.5 px-3 text-muted-foreground">{v.location}</td>
                            <td className="py-2.5 px-3"><StatusBadge tone={v.contract === "Signed" ? "emerald" : "amber"}>{v.contract}</StatusBadge></td>
                            <td className="py-2.5 px-3 text-right tabular font-medium">{RON(v.fee)}</td>
                            <td className="py-2.5 px-3 text-center">{v.accreditations}</td>
                            <td className="py-2.5 px-3 text-center">{v.parking}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}