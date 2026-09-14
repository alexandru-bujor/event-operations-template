import React from "react";
import { Wallet, TrendingUp } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import SectionCard from "@/components/ui/SectionCard";
import { RON, NUM } from "@/lib/format";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Financiar() {
    const { kpis, taxiDrivers, merch, reg } = useApp();
    const taxiRev = taxiDrivers.reduce((s, d) => s + d.sold * d.driftTaxiPrice, 0);
    const merchRev = merch.reduce((s, m) => s + m.price * m.sold, 0);
    const ticketRev = kpis.cashRevenue - taxiRev - merchRev;
    const expectedCash = reg.openingCash + reg.sales;
    const data = [{ name: "Bilete", val: ticketRev }, { name: "Drift Taxi", val: taxiRev }, { name: "Merch", val: merchRev }];

    return (
        <div>
            <PageHeader title="Financiar" subtitle="Doar CASH · Ziua 1" icon={Wallet} actions={<span className="text-xs px-3 py-1.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold">V1: FĂRĂ CARD</span>} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                <StatCard label="Venit bilete" value={RON(ticketRev)} tone="sky" />
                <StatCard label="Venit Drift Taxi" value={RON(taxiRev)} tone="amber" />
                <StatCard label="Venit merch" value={RON(merchRev)} tone="violet" />
                <StatCard label="Venit total" value={RON(kpis.cashRevenue)} tone="emerald" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <SectionCard title="Venit pe categorie" accent className="lg:col-span-2">
                    <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="hsl(222 14% 18%)" /><XAxis dataKey="name" stroke="hsl(220 12% 62%)" fontSize={12} /><YAxis stroke="hsl(220 12% 62%)" fontSize={12} tickFormatter={(v) => NUM(v / 1000) + "k"} /><Tooltip formatter={(v) => RON(v)} contentStyle={{ background: "hsl(222 18% 9%)", border: "1px solid hsl(222 14% 18%)", borderRadius: 8 }} /><Bar dataKey="val" fill="hsl(24 92% 55%)" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
                </SectionCard>
                <div className="space-y-4">
                    <SectionCard title="Cash așteptat" accent>
                        <div className="text-2xl font-display font-bold tabular text-emerald-400">{RON(expectedCash)}</div>
                        <div className="text-xs text-muted-foreground mt-1">Deschidere {RON(reg.openingCash)} + Vânzări {RON(reg.sales)}</div>
                    </SectionCard>
                    <SectionCard title="Deconturi piloți" accent>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Cota piloți (50%)</span><span className="tabular text-emerald-400">{RON(taxiRev / 2)}</span></div>
                        <div className="flex justify-between text-sm mt-1"><span className="text-muted-foreground">Cota organizator</span><span className="tabular text-sky-400">{RON(taxiRev / 2)}</span></div>
                    </SectionCard>
                    <SectionCard title="Diferențe casă" accent>
                        <div className="flex items-center gap-2 text-sm"><TrendingUp className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400 font-semibold">0 RON</span><span className="text-muted-foreground">— fără diferențe</span></div>
                    </SectionCard>
                </div>
            </div>
        </div>
    );
}