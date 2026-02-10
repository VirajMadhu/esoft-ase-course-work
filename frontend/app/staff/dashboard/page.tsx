"use client";

import React from "react";
import { Download, Calendar, ArrowUpRight, ArrowDownRight, DollarSign, Package, Truck, Users } from "lucide-react";

export default function DashboardHome() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <span>Home</span>
                        <span>/</span>
                        <span className="font-medium text-slate-900">Dashboard</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Management Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">Head Office Overview & Strategic KPIs</p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center px-4 py-2 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                        Last 30 Days
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Sales */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-green-50 text-green-700 text-[10px] font-bold">
                            +12.5%
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Sales</p>
                    <h3 className="text-3xl font-bold text-slate-900">$128,430</h3>
                    <p className="text-xs text-slate-400 mt-2">vs $114,200 last month</p>
                </div>

                {/* Stock Levels */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                            <Package className="w-5 h-5" />
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-red-50 text-red-700 text-[10px] font-bold">
                            -2.1%
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Stock Levels</p>
                    <h3 className="text-3xl font-bold text-slate-900">82%</h3>
                    <p className="text-xs text-slate-400 mt-2">Critical low at 5 locations</p>
                </div>

                {/* Pending Deliveries */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Truck className="w-5 h-5" />
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-green-50 text-green-700 text-[10px] font-bold">
                            +5.0%
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Deliveries</p>
                    <h3 className="text-3xl font-bold text-slate-900">143</h3>
                    <p className="text-xs text-slate-400 mt-2">12 delayed by weather</p>
                </div>

                {/* Active Customers */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-green-50 text-green-700 text-[10px] font-bold">
                            +8.2%
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Active Customers</p>
                    <h3 className="text-3xl font-bold text-slate-900">1,240</h3>
                    <p className="text-xs text-slate-400 mt-2">24 new this week</p>
                </div>


            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart (Mock) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-slate-900">Sales Revenue Over Time</h3>
                            <h2 className="text-2xl font-bold text-slate-900 mt-1">$45,200 <span className="text-sm font-medium text-green-600">+14% vs last week</span></h2>
                        </div>
                        <div className="flex bg-slate-100 rounded-lg p-0.5">
                            <button className="px-3 py-1 bg-white text-slate-900 text-xs font-semibold rounded shadow-sm">Revenue</button>
                            <button className="px-3 py-1 text-slate-500 text-xs font-semibold">Volume</button>
                        </div>
                    </div>
                    {/* Simplified Chart Visual using CSS/SVG */}
                    <div className="h-64 w-full flex items-end justify-between px-2 gap-2">
                        {[40, 60, 45, 70, 50, 80, 65, 85, 90, 75, 60, 95].map((h, i) => (
                            <div key={i} className="w-full bg-blue-50 rounded-t-lg relative group">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-lg transition-all duration-500 group-hover:bg-blue-600"
                                    style={{ height: `${h}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Distribution Efficiency */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-6">Distribution Efficiency</h3>
                    <div className="relative h-48 w-48 mx-auto mb-6">
                        {/* Circle Chart Mock */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="#F1F5F9" strokeWidth="16" fill="transparent" />
                            <circle cx="96" cy="96" r="88" stroke="#3B82F6" strokeWidth="16" fill="transparent" strokeDasharray="552" strokeDashoffset="33" className="text-blue-500" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-slate-900">94%</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Average</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                                <span className="text-slate-600">On Time</span>
                            </div>
                            <span className="font-bold text-slate-900">75%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
                                <span className="text-slate-600">Processing</span>
                            </div>
                            <span className="font-bold text-slate-900">19%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                                <span className="w-2 h-2 rounded-full bg-red-400 mr-2"></span>
                                <span className="text-slate-600">Delayed</span>
                            </div>
                            <span className="font-bold text-slate-900">6%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}