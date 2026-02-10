"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, Search, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; role: string } | null>(null);

    // Route Protection: Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("authToken");

        // If no token, redirect back to login
        if (!token) {
            router.push("/staff/login");
            return;
        }

        // Load user info from storage
        const name = localStorage.getItem("userName") || "Staff Member";
        const role = localStorage.getItem("userRole") || "Staff";
        setUser({ name, role });
    }, [router]);

    if (!user) return null; // Or a loading spinner

    return (
        <div className="min-h-screen bg-[#F8F9FC]">
            <Sidebar />

            <div className="pl-64 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    {/* Search Bar */}
                    <div className="w-96">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                placeholder="Search orders, inventory, or users..."
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>

                        <div className="h-8 w-px bg-slate-200 mx-2"></div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{user.role}</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold shadow-md shadow-teal-200">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={() => {
                                localStorage.removeItem("authToken");
                                localStorage.removeItem("userName");
                                localStorage.removeItem("userRole");
                                router.push("/staff/login");
                            }}
                            className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Sign out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
