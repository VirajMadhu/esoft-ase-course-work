"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkoutSchema, CheckoutFormValues } from "@/lib/schemas/checkout";

import { ArrowLeft, Truck, Banknote, Lock, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CartItem } from "@/types";
import {
  getCart,
  getCartSubtotal,
  getCartTotal,
  clearCart,
} from "@/lib/cart-utils";
import { placeOrderApi } from "@/lib/api/orders-api";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [cartItemsState] = useState<CartItem[]>(() => {
    return getCart();
  });
  const subtotal = getCartSubtotal();
  const total = getCartTotal();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsLoading(true);
    try {
      // 1. Get User ID from Token
      const token = Cookies.get("auth_token");
      let userId = 1; // Default for testing if no token (though middleware should catch this)

      if (token) {
        try {
          const decoded = jwtDecode(token) as { id: number };
          userId = decoded.id;
        } catch (e) {
          console.error("Token decode error:", e);
        }
      }

      // 2. Prepare Order Payload
      const orderData = {
        userId,
        items: cartItemsState.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingDetails: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
        },
        subtotal,
        tax: 0, // Simplified
        discount: 0, // Simplified
        totalAmount: total,
      };

      // 3. Call API
      const result = await placeOrderApi(orderData);

      toast.success(result.message || "Order placed successfully!");

      // 4. Clear Cart
      clearCart();

      // 5. Redirect to callback
      router.push(`/checkout/callback?orderNumber=${result.order.orderNumber}`);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to place order. Please try again.";
      console.error("Checkout error:", error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-2 py-2">
      {/* Header */}
      <div className="mb-8">
        <Link
          className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          href="/"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back to Shop
        </Link>

        <h1 className="text-3xl font-bold">Customer Checkout</h1>
        <p className="text-muted-foreground">
          Review your order and shipping details.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left */}
            <div className="lg:col-span-7 space-y-8">
              {/* Shipping */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Truck className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg">Shipping Address</h3>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Johnathan Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="john@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 555 000 0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Coastal Road" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Banknote className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg">Payment Method</h3>
                </CardHeader>

                <CardContent>
                  <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">
                        Cash on Delivery (COD)
                      </span>
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Currently only Cash on Delivery is supported.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right */}
            <div className="lg:col-span-5">
              <Card className="sticky top-24">
                <CardHeader>
                  <h3 className="font-semibold text-lg">Order Summary</h3>
                </CardHeader>

                <CardContent className="space-y-4">
                  {cartItemsState.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div
                        className="h-16 w-16 rounded-md bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.unit} • Qty {item.quantity}
                        </p>
                        <p className="font-semibold">
                          LKR {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>LKR{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Logistics</span>
                      <span className="text-emerald-600">FREE</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">
                        LKR{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6"
                    size="lg"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Placing Order..." : "Place Order"}
                    <CheckCircle2 className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
