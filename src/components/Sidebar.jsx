import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Ticket, ScanLine, Car, Users, CarFront, Calendar, Flag,
  Trophy, ClipboardCheck, Building2, HardHat, AlertTriangle, IdCard, ParkingSquare,
  GalleryThumbnails, Heart, Handshake, Store, Shirt, Wallet, Bell, FileText, ScrollText, Settings,
  ChevronLeft, Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/AppContext";

const NAV = [
  { to: "/", label: "Panou central", icon: LayoutDashboard },
  { to: "/bilete", label: "Bilete", icon: Ticket },
  { to: "/control-acces", label: "Control acces", icon: ScanLine },
  { to: "/drift-taxi", label: "Drift Taxi", icon: Car },
  { to: "/piloti", label: "Piloți", icon: Users },
  { to: "/masini", label: "Mașini", icon: CarFront },
  { to: "/program", label: "Program", icon: Calendar },
  { to: "/control-pista", label: "Control pistă", icon: Flag },
  { to: "/competitie", label: "Competiție", icon: Trophy },
  { to: "/verificare-tehnica", label: "Verificare tehnică", icon: ClipboardCheck },
  { to: "/paddock", label: "Paddock", icon: Building2 },
  { to: "/staff", label: "Staff", icon: HardHat },
  { to: "/incidente", label: "Incidente", icon: AlertTriangle },
  { to: "/acreditari", label: "Acreditări", icon: IdCard },
  { to: "/parking", label: "Parking", icon: ParkingSquare },
  { to: "/car-expo", label: "Car Expo", icon: GalleryThumbnails },
  { to: "/expo-vot", label: "Votare Expo", icon: Heart },
  { to: "/votare-pista", label: "Votare pistă", icon: Gauge },
  { to: "/sponsori", label: "Sponsori", icon: Handshake },
  { to: "/vanzatori", label: "Vânzători", icon: Store },
  { to: "/merchandise", label: "Merchandise", icon: Shirt },
  { to: "/financiar", label: "Financiar", icon: Wallet },
  { to: "/casa", label: "Casă", icon: Wallet },
  { to: "/notificari", label: "Notificări", icon: Bell },
  { to: "/documente", label: "Documente", icon: FileText },
  { to: "/audit", label: "Audit Log", icon: ScrollText },
  { to: "/setari", label: "Setări", icon: Settings },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const { kpis, openIncidents } = useApp();
  return (
      <aside className={cn("h-full flex flex-col bg-card border-r border-border transition-all duration-200", collapsed ? "w-[68px]" : "w-[248px]")}>
        <div className="h-14 flex items-center gap-2 px-4 border-b border-border shrink-0">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center shrink-0">
            <Gauge className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
              <div className="leading-tight overflow-hidden">
                <div className="text-sm font-display font-bold tracking-tight">DRIFT EVENT</div>
                <div className="text-[10px] uppercase tracking-widest text-primary font-semibold">Platform</div>
              </div>
          )}
          <button onClick={() => setCollapsed((c) => !c)} className="ml-auto w-7 h-7 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-2">
          {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}
                       className={({ isActive }) => cn(
                           "flex items-center gap-3 px-4 py-2.5 text-sm font-medium relative transition group",
                           isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                       )}>
                {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary" />}
                      <item.icon className="w-[18px] h-[18px] shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {!collapsed && item.to === "/incidente" && openIncidents > 0 && (
                          <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">{openIncidents}</span>
                      )}
                    </>
                )}
              </NavLink>
          ))}
        </nav>
        {!collapsed && (
            <div className="px-4 py-3 border-t border-border text-[10px] text-muted-foreground">
              v1.0 · Prototip Frontend
            </div>
        )}
      </aside>
  );
}