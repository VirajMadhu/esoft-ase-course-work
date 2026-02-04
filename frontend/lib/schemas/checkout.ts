import { z } from "zod"

export const checkoutSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Invalid phone number"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    postalCode: z.string().min(3, "Postal code is required"),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
