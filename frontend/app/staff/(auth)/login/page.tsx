"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutGrid, Lock, Mail, Key } from "lucide-react";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError("");
        try {
            const response = await authApi.login(data);
            if (response.token) {
                // Store token and user info
                localStorage.setItem("authToken", response.token);
                if (response.user) {
                    localStorage.setItem("userRole", response.user.role || "");
                    localStorage.setItem("userName", response.user.name || "");
                }

                // Redirect to dashboard
                router.push("/staff/dashboard");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FC] font-sans">
            <div className="text-center mb-8">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                    <LayoutGrid className="text-white w-6 h-6" />
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">ISLANDLINK</h1>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Sales Distribution Management</p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/50 w-full max-w-md border border-slate-100">
                <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full mb-6">
                    <Lock className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Authorized Staff Only</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-2">Staff Portal Login</h2>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    Enter your credentials to access the RDC & Logistics dashboard.
                </p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                        <span className="block w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Employee ID or Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                {...register("email")}
                                type="email"
                                className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="E-12345 or email@islandlink.lk"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                            <Link href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Key className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                {...register("password")}
                                type="password"
                                className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-2xl tracking-widest pb-1 h-[42px]"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                            Remember this device
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-lg shadow-blue-500/30 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isLoading ? "opacity-75 cursor-not-allowed" : ""
                            }`}
                    >
                        {isLoading ? "Authenticating..." : "Staff Login"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500">
                        Are you a customer?{" "}
                        <Link href="/" className="font-semibold text-blue-600 hover:text-blue-700">
                            Go to Retail Store
                        </Link>
                    </p>
                </div>
            </div>

            <div className="mt-8 text-center space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IslandLink ISDMS v4.2.0</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Connection via TLS 1.3</p>
                <div className="flex justify-center gap-4 mt-4">
                    <Link href="#" className="text-[11px] text-slate-400 hover:text-slate-500 transition-colors">Help Center</Link>
                    <Link href="#" className="text-[11px] text-slate-400 hover:text-slate-500 transition-colors">IT Support</Link>
                    <Link href="#" className="text-[11px] text-slate-400 hover:text-slate-500 transition-colors">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;