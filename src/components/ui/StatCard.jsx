import React from "react";
import { cn } from "@/lib/utils";

export default function StatCard({ label, value, sub, icon: Icon, tone = "default", className }) {
  const ring = {
    default: "border-border",
    red: "border-red-500/40 bg-red-500/5",
    amber: "border-amber-500/40 bg-amber-500/5",
    emerald: "border-emerald-500/40 bg-emerald-500/5",
    sky: "border-sky-500/40 bg-sky-500/5",
  }[tone];
  return (
      <div className={cn("rounded-xl border bg-card p-4 flex flex-col gap-1.5 transition hover:border-primary/40", ring, className)}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</span>
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
        </div>
        <div className="text-2xl font-display font-bold tabular text-foreground">{value}</div>
        {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
      </div>
  );
}