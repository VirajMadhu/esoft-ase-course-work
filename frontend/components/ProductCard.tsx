import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/data";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const getStatusConfig = (status: Product["status"]) => {
        switch (status) {
            case "in-stock":
                return { color: "bg-emerald-500", text: "In Stock", textColor: "text-emerald-600" };
            case "low-stock":
                return { color: "bg-orange-500", text: "Low Stock", textColor: "text-orange-600" };
            case "out-of-stock":
                return { color: "bg-red-500", text: "Out of Stock", textColor: "text-red-600" };
        }
    };

    const statusConfig = getStatusConfig(product.status);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1">
            {/* Product Image */}
            <div className="relative aspect-square bg-slate-100 dark:bg-slate-900 overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-110"
                    style={{ backgroundImage: `url('${product.image}')` }}
                />
                {product.badge && (
                    <Badge
                        className="absolute top-2 left-2 bg-linear-to-r from-primary to-blue-600 text-white text-[10px] font-semibold uppercase tracking-wide shadow-md border border-white/20"
                    >
                        {product.badge}
                    </Badge>

                )}
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex-1 mb-3">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                        {product.category}
                    </p>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight mb-1">
                        {product.name}
                    </h4>
                    <p className="text-xs text-slate-500 mb-2">{product.unit}</p>
                    <div className="flex items-center gap-1.5">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1">
                        <div className={`size-2 rounded-full ${statusConfig.color}`} />
                        <span className={`text-[10px] font-medium uppercase ${statusConfig.textColor}`}>
                            {statusConfig.text}
                        </span>
                    </div>
                    <Button
                        size="icon"
                        className="size-9 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all active:scale-95"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}