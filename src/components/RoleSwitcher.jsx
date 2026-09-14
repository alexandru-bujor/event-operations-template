import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, User, Shield, Car, ClipboardCheck, Flag, GalleryThumbnails, Crown } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

const ROLE_ICONS = {
  Administrator: Crown, Casier: User, Securitate: Shield, Pilot: Car,
  Judecător: Shield, "Inspector Tehnic": ClipboardCheck, "Control Pista": Flag, "Staff Expo": GalleryThumbnails,
};

export default function RoleSwitcher() {
  const { role, setRole, ROLES } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const Icon = ROLE_ICONS[role] || User;
  return (
      <div className="relative" ref={ref}>
        <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-secondary border border-border">
          <div className="w-7 h-7 rounded-md bg-primary/15 text-primary flex items-center justify-center"><Icon className="w-4 h-4" /></div>
          <div className="text-left leading-tight hidden sm:block">
            <div className="text-xs font-semibold">{role}</div>
            <div className="text-[10px] text-muted-foreground">Rol activ</div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
        {open && (
            <div className="absolute right-0 mt-1 w-56 rounded-lg border border-border bg-popover shadow-xl z-50 overflow-hidden">
              <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border bg-secondary/30">Schimbă rol (prototip)</div>
              {ROLES.map((r) => {
                const RIcon = ROLE_ICONS[r] || User;
                return (
                    <button key={r} onClick={() => { setRole(r); setOpen(false); }}
                            className={cn("w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-secondary text-left", r === role && "text-primary bg-primary/5")}>
                      <RIcon className="w-4 h-4" /> {r}
                      {r === role && <span className="ml-auto text-[10px] text-primary">●</span>}
                    </button>
                );
              })}
            </div>
        )}
      </div>
  );
}