import React from "react";
import { FileText, FileCheck, Download } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";

const DOCS = [
    { name: "Regulament competiție 2027", type: "PDF", size: "1.2 MB", status: "Public" },
    { name: "Procedură RED FLAG", type: "PDF", size: "0.8 MB", status: "Intern" },
    { name: "Listă piloți & mașini", type: "XLSX", size: "0.3 MB", status: "Intern" },
    { name: "Plan evacuare", type: "PDF", size: "2.1 MB", status: "Intern" },
    { name: "Contract sponsor title", type: "DOCX", size: "0.5 MB", status: "Confidențial" },
    { name: "Hartă pistă & zone", type: "PDF", size: "3.4 MB", status: "Public" },
];

export default function Documente() {
    return (
        <div>
            <PageHeader title="Documente" subtitle="Regulamente & proceduri" icon={FileText} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {DOCS.map((d, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center"><FileCheck className="w-5 h-5" /></div>
                        <div className="flex-1 min-w-0"><div className="font-medium text-sm truncate">{d.name}</div><div className="text-xs text-muted-foreground">{d.type} · {d.size}</div></div>
                        <StatusBadge tone={d.status === "Public" ? "emerald" : d.status === "Confidențial" ? "red" : "amber"}>{d.status}</StatusBadge>
                        <button className="w-8 h-8 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground"><Download className="w-4 h-4" /></button>
                    </div>
                ))}
            </div>
        </div>
    );
}