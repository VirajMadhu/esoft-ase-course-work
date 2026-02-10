"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ShoppingCart, Package, Users, Activity, LogOut, Settings } from "lucide-react";

const Sidebar = () => {
    const pathname = usePathname();

    // Navigation Items configuration
    // Easy to add new menu items here without changing the UI structure
    const navItems = [
        { name: "Dashboard", href: "/staff/dashboard", icon: LayoutGrid },
        { name: "Orders", href: "/staff/dashboard/orders", icon: ShoppingCart },
        { name: "Inventory", href: "/staff/dashboard/inventory", icon: Package },
        { name: "Staff Directory", href: "/staff/dashboard/staff-directory", icon: Users },
    ];

    /**
     * Check if a menu item is active
     * Used to highlight the current page in the sidebar.
     * Special handling for "Dashboard" to avoid it being active on sub-pages unnecessarily if not desired,
     * or to ensure sub-routes keep the parent active.
     */
    const isActive = (path: string) => {
        // Exact match for root dashboard
        if (path === "/staff/dashboard" && pathname === "/staff/dashboard") return true;
        // Prefix match for sub-pages (e.g. /staff/dashboard/users)
        if (path !== "/staff/dashboard" && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-50">
            {/* Logo Area */}
            <div className="h-20 flex items-center px-6 border-b border-slate-100">
                <div className="bg-blue-600 rounded-lg p-1.5 mr-3">
                    <LayoutGrid className="text-white w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-slate-900 leading-none">IslandLink</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">ISDMS Management</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${active
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 mr-3 ${active ? "text-blue-600" : "text-slate-400"}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Status */}
            <div className="p-4 border-t border-slate-100">
                <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">System Status</p>
                    <div className="flex items-center">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 relative">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                        </span>
                        <span className="text-xs font-semibold text-slate-700">All Systems Operational</span>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-slate-400">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem("authToken");
                            window.location.href = "/staff/login";
                        }}
                        className="p-2 hover:bg-red-50 text-red-400 hover:text-red-500 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
