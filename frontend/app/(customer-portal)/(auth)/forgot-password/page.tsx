"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AtSign } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { forgotPasswordSchema, OtpVerifyData } from "@/lib/schemas/auth";
import { APP_CONFIG } from "@/lib/config";
import Image from "next/image";
import OtpVerify from "@/components/OtpVerify";

type LoginFormValues = z.infer<typeof forgotPasswordSchema>;

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpVerifyStep, setIsOtpVerifyStep] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: LoginFormValues) {
        setIsLoading(true);
        try {
            // TODO: Call login API here
            console.log("Forgot Password data:", data);
            setIsOtpVerifyStep(true);
        } catch (error) {
            console.error("Forgot Password error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo & Branding */}
                <div className="flex flex-col items-center mb-8">
                    <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-lg" />
                    <h1 className="text-2xl font-black leading-tight tracking-tight">
                        {APP_CONFIG.appName}
                    </h1>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] font-bold">
                        {APP_CONFIG.appTagline}
                    </p>
                </div>

                {/* Card */}
                {isOtpVerifyStep ? (
                    <OtpVerify email={form.watch("email")} />
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-10">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold tracking-tight mb-2">Forgot Password</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Enter your email to reset your password
                            </p>
                        </div>

                        {/* Login Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                Registered Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                                    <Input
                                                        placeholder="name@example.com"
                                                        className="pl-10 h-11"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 shadow-lg shadow-primary/20"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Sending OTP..." : "Send OTP"}
                                </Button>
                            </form>
                        </Form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-100 dark:border-slate-800"></span>
                            </div>
                            <div className="relative flex justify-center text-xs">
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Back to
                                <Link
                                    href="/login"
                                    className="font-bold text-primary hover:underline ml-1"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                )}

                {/* Footer Links */}
                <div className="mt-8 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
                    <span>&copy; {new Date().getFullYear()} {APP_CONFIG.companyName}</span>
                </div>
            </div>
        </div>
    );
}