"use client";

import React, { useEffect, useState } from "react";
import { staffApi } from "@/lib/api/staff";
import { Plus, Filter, MoreHorizontal, Mail, Shield, ShieldAlert, CheckCircle, XCircle, Users } from "lucide-react";

interface StaffMember {
    id: number;
    name: string;
    email: string;
    role: "admin" | "staff" | "manager"; // Extended for potential future roles
    status?: "active" | "suspended"; // Mock status for UI
}

const UsersPage = () => {
    // State Management
    const [staffList, setStaffList] = useState<StaffMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false); // Controls modal visibility

    // Form Input State
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState<"staff" | "admin">("staff");

    // Load staff data when component mounts
    useEffect(() => {
        fetchStaff();
    }, []);

    /**
     * Fetch all staff members from the API
     */
    const fetchStaff = async () => {
        try {
            const data = await staffApi.getAll();
            // In a real app, status might come from DB. Here we mock it as 'active'.
            const enrichedData = data.map((user: any) => ({
                ...user,
                status: "active"
            }));
            setStaffList(enrichedData);
            setIsLoading(false);
        } catch (err) {
            console.error("Failed to fetch staff:", err);
            setIsLoading(false);
        }
    };

    /**
     * Handle Form Submission to create new staff
     */
    const handleAddStaff = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
        try {
            await staffApi.create({
                name: newName,
                email: newEmail,
                password: newPassword,
                role: newRole,
            });

            // Clear form and refresh list
            setNewName("");
            setNewEmail("");
            setNewPassword("");
            setIsAdding(false);
            fetchStaff(); // Refresh the table
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to create staff member");
        }
    };

    /**
     * Delete a staff user
     */
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this staff member?")) return;
        try {
            await staffApi.delete(id);
            fetchStaff(); // Refresh after delete
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to delete staff member");
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <span>Home</span>
                        <span>/</span>
                        <span className="font-medium text-slate-900">Staff Directory</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Staff Directory</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and monitor head office and regional distribution center staff permissions.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center shadow-lg shadow-blue-200 transition-all"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    {isAdding ? "Cancel" : "Add New Staff User"}
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mr-4">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Staff</p>
                        <p className="text-2xl font-bold text-slate-900">{staffList.length} Active</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mr-4">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Admin Access</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {staffList.filter(s => s.role === 'admin').length} Users
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mr-4">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Regional Managers</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {staffList.filter(s => s.role === 'manager').length} Users
                        </p>
                    </div>
                </div>
            </div>

            {/* Add Staff Form */}
            {isAdding && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Account</h3>
                    <form onSubmit={handleAddStaff} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                placeholder="e.g. Sarah Mitchell"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                placeholder="name@islandlink.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Role Permissions</label>
                            <select
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value as "staff" | "admin")}
                                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                            >
                                <option value="staff">Standard Staff</option>
                                <option value="admin">Head Office Admin</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-6 py-2 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium shadow-lg shadow-green-200 transition-all"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Staff Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">All Staff Members</h3>
                    <button className="flex items-center px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
                        <Filter className="w-3.5 h-3.5 mr-2" />
                        Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading staff data...</td>
                                </tr>
                            ) : staffList.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No staff members found.</td>
                                </tr>
                            ) : (
                                staffList.map((staff) => (
                                    <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-3 uppercase">
                                                    {staff.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-semibold text-slate-900">{staff.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {staff.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${staff.role === 'admin'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {staff.role === 'admin' ? 'Head Office Admin' : 'RDC Staff'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                                <span className="text-[10px] font-bold uppercase tracking-wide">Active</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleDelete(staff.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Mock) */}
                <div className="p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                    <span>Showing 1 to {staffList.length} of {staffList.length} users</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-slate-200 rounded-lg disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
