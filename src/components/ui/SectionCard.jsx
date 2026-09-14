import React from "react";
import { cn } from "@/lib/utils";

export default function SectionCard({ title, action, children, className, bodyClass, accent }) {
    return (
        <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
            {title && (
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
                    <div className="flex items-center gap-2">
                        {accent && <span className="w-1 h-4 rounded-full bg-primary" />}
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
                    </div>
                    {action}
                </div>
            )}
            <div className={cn("p-4", bodyClass)}>{children}</div>
        </div>
    );
}