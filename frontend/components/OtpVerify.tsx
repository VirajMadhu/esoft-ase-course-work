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
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { verifyOtpApi } from "@/lib/api/auth-api";
import { toast } from "sonner";

const OtpVerify = ({ email }: { email: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OtpVerifyData>({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: OtpVerifyData) => {
    setIsLoading(true);
    try {
      const result = await verifyOtpApi(email, data.otp);
      toast.success(result.message || "Email verified successfully!");

      // Redirect to login page after successful verification
      setTimeout(() => {
        if (typeof globalThis !== "undefined" && globalThis.location) {
          globalThis.location.href = "/login";
        }
      }, 2000);
    } catch (error: unknown) {
      console.error("OTP verification error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Invalid OTP";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Re-use signup API for resending OTP if backend supports it or add a specific method
      // For now, just a placeholder or call signup again with same data if available
      toast.info("Resend OTP functionality not yet implemented on frontend.");
    } catch (error: unknown) {
      console.error("Resend OTP error:", error);
      toast.error("Failed to resend OTP");
    }
  };
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Verify your email
        </h2>
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
                            key={`slot-${index}`}
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
        <div className="relative flex justify-center text-xs"></div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Did not receive the OTP?
          <Button
            variant={"link"}
            onClick={handleResendOtp}
            className="font-bold text-primary"
          >
            Resend OTP
          </Button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerify;
