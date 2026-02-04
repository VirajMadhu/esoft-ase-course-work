import { ShoppingBag, Plus, Minus, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartItem } from "@/lib/data";

interface CartDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    items: CartItem[];
}

export function CartDrawer({ open, onOpenChange, items }: CartDrawerProps) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const logisticsFee = 0;
    const total = subtotal + logisticsFee;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:w-96 flex flex-col h-full p-0">
                {/* Header */}
                <SheetHeader className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <SheetTitle className="flex items-center gap-2 text-lg">
                                <ShoppingBag className="h-5 w-5 text-primary" />
                                Your Cart
                            </SheetTitle>
                            <p className="text-xs text-slate-500 mt-1">{items.length} items in your list</p>
                        </div>
                    </div>
                </SheetHeader>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <div
                                className="size-16 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 bg-cover bg-center"
                                style={{ backgroundImage: `url('${item.image}')` }}
                            />
                            <div className="flex-1 min-w-0">
                                <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                    {item.name}
                                </h5>
                                <p className="text-xs text-slate-500 mb-2">Unit: {item.unit}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-lg px-2 py-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 p-0 hover:bg-transparent text-slate-400 hover:text-primary"
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="text-sm font-bold min-w-[12px] text-center">
                                            {item.quantity}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 p-0 hover:bg-transparent text-slate-400 hover:text-primary"
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <span className="font-bold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Subtotal</span>
                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Logistics Fee</span>
                            <span className="font-medium text-emerald-600">FREE</span>
                        </div>
                        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold text-xl text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <Button className="w-full py-6 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                        Checkout
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                    <p className="text-[10px] text-center text-slate-400 mt-4 italic">
                        Next delivery: Tomorrow, 10:00 AM
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
}