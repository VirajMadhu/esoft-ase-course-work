import * as z from "zod";

/**
 * Login Form Schema
 * Validates email/username and password fields
 */
export const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email or username is required" })
        .max(100, { message: "Email or username is too long" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(100, { message: "Password is too long" }),
    remember: z.boolean(),
});

/**
 * Sign Up Form Schema
 * Validates new user registration
 */
export const signupFormSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: "Name must be at least 2 characters" })
            .max(50, { message: "Name is too long" }),
        email: z
            .string()
            .min(1, { message: "Email is required" })
            .email({ message: "Please enter a valid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .max(100, { message: "Password is too long" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" }),
        confirmPassword: z.string(),
        terms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

/**
 * Forgot Password Form Schema
 */
export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Please enter a valid email address" }),
});

/**
 * Reset Password Form Schema
 */
export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .max(100, { message: "Password is too long" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

/**
* Forgot Password Form Schema
*/
export const otpVerifySchema = z.object({
    otp: z
        .string()
        .min(6, { message: "OTP must be 6 digits" })
        .max(6, { message: "OTP must be 6 digits" }),
});

// Type exports for use in components
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type SignupFormData = z.infer<typeof signupFormSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type OtpVerifyData = z.infer<typeof otpVerifySchema>;
