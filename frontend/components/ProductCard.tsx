import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const getStatusConfig = (status: Product["status"]) => {
    switch (status) {
      case "IN_STOCK":
        return {
          color: "bg-emerald-500",
          text: "In Stock",
          textColor: "text-emerald-600",
        };
      case "LOW_STOCK":
        return {
          color: "bg-orange-500",
          text: "Low Stock",
          textColor: "text-orange-600",
        };
      case "OUT_OF_STOCK":
        return {
          color: "bg-red-500",
          text: "Out of Stock",
          textColor: "text-red-600",
        };
    }
  };

  const statusConfig = getStatusConfig(product.status);
  const isList = viewMode === "list";

  const handleAddToCart = (product: Product) => {
    console.log(product);
  };
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex group transition-all hover:shadow-xl ${isList ? "flex-row h-40" : "flex-col hover:-translate-y-1"}`}
    >
      {/* Product Image */}
      <div
        className={`relative bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 ${isList ? "w-40 h-full" : "aspect-square w-full"}`}
      >
        <div
          className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-110"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        {product.badge && (
          <Badge className="absolute top-2 left-2 bg-linear-to-r from-primary to-blue-600 text-white text-[10px] font-semibold uppercase tracking-wide shadow-md border border-white/20">
            {product.badge}
          </Badge>
        )}
      </div>

      {/* Product Details */}
      <div
        className={`p-4 flex flex-col flex-1 ${isList ? "justify-between" : ""}`}
      >
        <div className="flex-1 mb-3">
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
            {product.category.name}
          </p>
          <h4
            className={`font-bold text-slate-900 dark:text-white leading-tight mb-1 ${isList ? "text-lg" : ""}`}
          >
            {product.name}
          </h4>
          <p className="text-xs text-slate-500 mb-2">{product.unit}</p>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              LKR {product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-1">
            <div className={`size-2 rounded-full ${statusConfig.color}`} />
            <span
              className={`text-[10px] font-medium uppercase ${statusConfig.textColor}`}
            >
              {statusConfig.text}
            </span>
          </div>
          <Button
            size="icon"
            className={`size-9 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all active:scale-95 ${product.status === "OUT_OF_STOCK" ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
