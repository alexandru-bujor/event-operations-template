import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function Layout() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="h-screen flex bg-background text-foreground overflow-hidden">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="flex-1 flex flex-col min-w-0">
                <TopBar />
                <main className="flex-1 overflow-y-auto scrollbar-thin">
                    <div className="max-w-[1600px] mx-auto p-4 md:p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}