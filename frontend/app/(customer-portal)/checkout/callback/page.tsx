import Link from "next/link"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
    CheckCircle2,
    FileText,
    ShoppingBag,
    Info,
    ShieldCheck,
} from "lucide-react"

import { orderSuccessData, successActions } from "@/lib/data"

function getStatusBadge(status: string) {
    switch (status) {
        case "CONFIRMED":
            return {
                label: "Confirmed",
                className:
                    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
            }
        case "PENDING":
            return {
                label: "Pending",
                className:
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
            }
        default:
            return {
                label: "Unknown",
                className:
                    "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
            }
    }
}


export default function OrderSuccessPage() {
    const status = getStatusBadge(orderSuccessData.status)

    return (
        <section className="flex flex-1 items-center justify-center px-4 py-12">
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
                                Order ID
                            </p>
                            <p className="text-xl font-bold">
                                #{orderSuccessData.orderId}
                            </p>
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
                            <span>Items Total</span>
                            <span className="font-medium">
                                ${orderSuccessData.itemsTotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Logistics Fee</span>
                            <span className="font-medium text-emerald-600">FREE</span>
                        </div>

                        <div className="pt-4 border-t flex justify-between items-center">
                            <span className="font-bold">Total Amount to Pay</span>
                            <span className="text-2xl font-bold text-primary">
                                ${orderSuccessData.totalAmount.toFixed(2)}
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
                        <Link href={successActions.viewOrderHref}>
                            View Order Details
                            <FileText className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="flex-1"
                    >
                        <Link href="/">
                            Continue Shopping
                            <ShoppingBag className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
