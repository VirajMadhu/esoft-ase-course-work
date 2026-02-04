import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OtpVerifyData, otpVerifySchema } from "@/lib/schemas/auth";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useState } from "react";


const OtpVerify = ({ email }: { email: string }) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<OtpVerifyData>({
        resolver: zodResolver(otpVerifySchema),
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = async (data: OtpVerifyData) => {
        console.log(data, email);
    };

    const handleResendOtp = () => {
        console.log("Resend OTP");
    }
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-10">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight mb-2">Verify your email</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Enter the OTP sent to your email
                </p>
            </div>

            {/* Login Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex items-center justify-center">

                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <InputOTP
                                            maxLength={6}
                                            {...field}
                                            className="w-full"
                                            pattern={REGEXP_ONLY_DIGITS}
                                        >
                                            <InputOTPGroup className="w-full grid grid-cols-6 gap-3">
                                                {Array.from({ length: 6 }).map((_, index) => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        index={index}
                                                        className="h-14 w-14 text-lg font-semibold rounded-md border border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-primary"
                                                    />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage className="text-center" />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-12 shadow-lg shadow-primary/20"
                        disabled={isLoading}
                    >
                        {isLoading ? "Verifying OTP..." : "Verify OTP"}
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
                    Did not receive the OTP?
                    <Button
                        variant={'link'}
                        onClick={handleResendOtp}
                        className="font-bold text-primary"
                    >
                        Resend OTP
                    </Button>
                </p>
            </div>
        </div>
    )
}

export default OtpVerify