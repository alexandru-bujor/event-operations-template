import React from "react";
import { cn } from "@/lib/utils";

const TONES = {
  green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  red: "bg-red-500/15 text-red-300 border-red-500/30",
  amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  sky: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  violet: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  slate: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  rose: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  orange: "bg-orange-500/15 text-orange-300 border-orange-500/30",
};

export default function StatusBadge({ tone = "slate", children, className, dot }) {
  return (
      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold uppercase tracking-wide", TONES[tone] || TONES.slate, className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
        {children}
    </span>
  );
}

export function priorityTone(p) {
  return p === "HIGH" ? "red" : p === "MEDIUM" ? "amber" : "sky";
}
export function statusTone(s) {
  const map = { "IN PROGRESS": "amber", ASSIGNED: "sky", RESOLVED: "emerald", CLOSED: "slate", PASS: "emerald", FAIL: "red", CONDITIONAL: "amber", READY: "emerald", "ON TRACK": "amber", AVAILABLE: "emerald", "CHECKED IN": "emerald", APPROVED: "sky", PENDING: "amber", QUALIFIED: "emerald", BUBBLE: "amber" };
  return map[String(s).toUpperCase()] || "slate";
}