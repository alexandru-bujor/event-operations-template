import React from "react";

export default function PageHeader({ title, subtitle, actions, icon: Icon }) {
    return (
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-3">
                {Icon && <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center"><Icon className="w-5 h-5" /></div>}
                <div>
                    <h1 className="text-2xl font-display font-bold tracking-tight">{title}</h1>
                    {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
                </div>
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
    );
}