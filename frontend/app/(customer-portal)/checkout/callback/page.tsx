"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import {
  CheckCircle2,
  FileText,
  ShoppingBag,
  Info,
  AlertCircle,
} from "lucide-react";

import { getOrderByNumberApi } from "@/lib/api/orders-api";

interface OrderData {
  id: number;
  order_number: string;
  status: string;
  subtotal: string | number;
  tax: string | number;
  discount: string | number;
  total_amount: string | number;
}

function getStatusBadge(status: string) {
  switch (status) {
    case "PAID":
    case "CONFIRMED":
      return {
        label: status.charAt(0) + status.slice(1).toLowerCase(),
        className:
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
      };
    case "PENDING":
      return {
        label: "Pending",
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      };
    case "SHIPPED":
      return {
        label: "Shipped",
        className:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      };
    case "CANCELLED":
      return {
        label: "Cancelled",
        className:
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      };
    default:
      return {
        label: status || "Unknown",
        className:
          "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      };
  }
}

function OrderDetails() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderNumber) {
      setError("No order number found in the URL.");
      setIsLoading(false);
      return;
    }

    async function fetchOrder() {
      try {
        const data = await getOrderByNumberApi(orderNumber ?? "");
        setOrder(data);
      } catch (err: unknown) {
        console.error("Fetch order error:", err);
        setError("Failed to fetch order details. Please check the order ID.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrder();
  }, [orderNumber]);

  if (isLoading) {
    return (
      <div className="w-full max-w-xl mx-auto space-y-6">
        <div className="flex flex-col items-center mb-8">
          <Skeleton className="h-24 w-24 rounded-full mb-4" />
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b space-y-0">
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="text-right space-y-2">
              <Skeleton className="h-3 w-16 ml-auto" />
              <Skeleton className="h-6 w-20 ml-auto" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="pt-4 border-t flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="w-full max-w-xl mx-auto text-center py-12">
        <div className="mb-6 flex justify-center">
          <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-8">{error}</p>
        <Button asChild variant="outline">
          <Link href="/">Return to Shop</Link>
        </Button>
      </div>
    );
  }

  const status = getStatusBadge(order.status);

  return (
    <div className="w-full max-w-xl text-center">
      {/* Success icon */}
      <div className="mb-8 flex justify-center">
        <div className="h-24 w-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <CheckCircle2 className="h-14 w-14 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>

      <h1 className="text-3xl font-extrabold mb-3">
        Order Placed Successfully!
      </h1>

      <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
        Thank you for your order. Our courier will contact you soon for the{" "}
        <span className="font-semibold">Cash on Delivery</span> payment.
      </p>

      {/* Order card */}
      <Card className="mb-10 text-left">
        <CardHeader className="flex flex-row items-start justify-between border-b">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
              Order Number
            </p>
            <p className="text-xl font-bold">#{order.order_number}</p>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
              Status
            </p>
            <Badge className={status.className}>{status.label}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          <h4 className="text-sm font-bold uppercase tracking-wider">
            Order Summary
          </h4>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span className="font-medium">
              LKR {Number(order.subtotal).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Logistics Fee</span>
            <span className="font-medium text-emerald-600">FREE</span>
          </div>

          <div className="pt-4 border-t flex justify-between items-center">
            <span className="font-bold">Total Amount to Pay</span>
            <span className="text-2xl font-bold text-primary">
              LKR {Number(order.total_amount).toFixed(2)}
            </span>
          </div>

          {/* Info note */}
          <div className="mt-6 flex gap-3 rounded-lg border bg-muted/50 p-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-tight">
              Please ensure you have the exact amount ready in cash when the
              delivery person arrives at your specified address.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="flex-1">
          <Link href={"/my-orders"}>
            View Order Details
            <FileText className="ml-2 h-5 w-5" />
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="flex-1">
          <Link href="/">
            Continue Shopping
            <ShoppingBag className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-12">
      <Suspense
        fallback={
          <div className="w-full max-w-xl mx-auto space-y-6 text-center">
            <Skeleton className="h-24 w-24 rounded-full mx-auto mb-8" />
            <Skeleton className="h-10 w-64 mx-auto mb-8" />
            <Card>
              <CardContent className="h-64 flex items-center justify-center">
                <p>Loading order details...</p>
              </CardContent>
            </Card>
          </div>
        }
      >
        <OrderDetails />
      </Suspense>
    </section>
  );
}
