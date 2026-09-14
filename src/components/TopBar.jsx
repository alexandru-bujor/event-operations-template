import React, { useState, useEffect } from "react";
import { Radio, Bell, Search } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";
import RoleSwitcher from "./RoleSwitcher";

function LiveClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return <span className="tabular text-sm font-medium">{t.toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>;
}

export default function TopBar() {
  const { EVENT, day, setDay, trackStatus, openIncidents, CURRENT_USER } = useApp();
  const trackTone = trackStatus === "RED" ? "bg-red-500 text-white pulse-critical" : trackStatus === "YELLOW" ? "bg-amber-500 text-black" : trackStatus === "CLOSED" ? "bg-slate-600 text-white" : "bg-emerald-500 text-black";
  const trackLabel = trackStatus === "RED" ? "RED FLAG" : trackStatus === "YELLOW" ? "YELLOW FLAG" : trackStatus === "CLOSED" ? "PISTA ÎNCHISĂ" : "PISTA DESCHISĂ";
  return (
      <header className="h-14 border-b border-border bg-card/80 backdrop-blur flex items-center gap-3 px-4 shrink-0 z-30">
        <div className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
          <div className="leading-none">
            <div className="text-sm font-display font-bold tracking-tight">{EVENT.name}</div>
            <div className="text-[10px] uppercase tracking-widest text-red-400 font-semibold flex items-center gap-1"><Radio className="w-2.5 h-2.5" /> LIVE</div>
          </div>
        </div>

        <div className={cn("ml-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider", trackTone)}>{trackLabel}</div>

        <div className="flex items-center gap-1 ml-2">
          {EVENT.days.map((d) => (
              <button key={d.id} onClick={() => setDay(d.id)}
                      className={cn("px-3 py-1.5 rounded-md text-xs font-semibold border transition",
                          day === d.id ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground")}>
                {d.label}
              </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-secondary/30">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <input placeholder="Caută…" className="bg-transparent text-sm outline-none w-32 placeholder:text-muted-foreground" />
          </div>
          <LiveClock />
          <button className="relative w-9 h-9 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground">
            <Bell className="w-[18px] h-[18px]" />
            {openIncidents > 0 && <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">{openIncidents}</span>}
          </button>
          <RoleSwitcher />
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-primary-foreground text-xs font-bold">AI</div>
            <div className="leading-tight">
              <div className="text-xs font-semibold">{CURRENT_USER.name}</div>
              <div className="text-[10px] text-muted-foreground">{CURRENT_USER.role}</div>
            </div>
          </div>
        </div>
      </header>
  );
}