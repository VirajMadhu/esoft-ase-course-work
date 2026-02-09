"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Search,
  Grid3x3,
  List,
  ChevronRight,
  Package,
  History,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { cartItems } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getProducts } from "@/lib/api/product-api";
import { Category, Product, SortOption } from "@/types";
import { AppPagination } from "@/components/AppPagination";
import { getConstants } from "@/lib/api/constant-api";

export default function ShopPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(true);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      const { data, meta } = await getProducts({
        page,
        sort: sortBy,
        category: selectedCategory,
        search: debouncedSearch,
      });

      if (!cancelled) {
        setProducts(data);
        setTotalPages(meta.totalPages);
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [page, sortBy, selectedCategory, debouncedSearch]);

  useEffect(() => {
    const fetchConstants = async () => {
      const { categories, sortOptions } = await getConstants();
      setCategories(categories);
      setSortOptions(sortOptions);
    };

    fetchConstants();
  }, []);

  const handleOnChange = (value: string) => {
    setSortBy(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div className="hidden md:block">
                <h1 className="text-lg font-bold leading-none tracking-tight">
                  IslandLink
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                  ISDMS Portal
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none pl-10"
                  placeholder="Search product catalog..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2 md:gap-6">
              <div className="hidden lg:flex items-center gap-6 mr-4">
                <Link
                  className="text-sm font-medium text-primary border-b-2 border-primary py-5"
                  href="/"
                >
                  Shop
                </Link>
                <Link
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-5"
                  href="/my-orders"
                >
                  Orders
                </Link>
                <Link
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-5"
                  href="/my-account"
                >
                  Account
                </Link>
              </div>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                  {cartItems.length}
                </Badge>
              </Button>

              {/* User Avatar */}
              <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR-l2t54XI9pWq3yiYIRl3LL-I5l-Ud7azLD-TmBthPQXhvDSH7LgX60-Bf_NFn7ayOOJnHG0IWGnMrHrOU1i9lo7VgHckmfkFhJxL-c5nwsWPvTRbHiPuTkKAMLtKTzJQOIKBBuvGKciiSw_bZT1XzY2YbR4RryCT74TtQNIdXmrpQ2q32DtebzfLeEQBaF67vYGd-wKIn9di5UmI543cvJJp8pDvtHdBUDUTbUIf4SqrOSaYh2WrAHCFcpQFEnNal6duCqEwHsI"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 text-sm">
          <Package className="h-4 w-4 text-slate-500" />
          <span className="text-slate-500">Shop</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">
            Product Catalog
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8 hidden lg:block">
            {/* Categories */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs">{category.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability Filters */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">
                Availability
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    disabled
                    id="in-stock"
                    checked={inStockOnly}
                    onCheckedChange={(checked) =>
                      setInStockOnly(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="in-stock"
                    className="text-sm text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    In Stock
                  </label>
                </div>
                {/* <div className="flex items-center space-x-3">
                  <Checkbox
                    id="preorder"
                    checked={showPreorder}
                    onCheckedChange={(checked) =>
                      setShowPreorder(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="preorder"
                    className="text-sm text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    Pre-order
                  </label>
                </div> */}
                <div className="flex items-center space-x-3 opacity-50">
                  <Checkbox id="out-of-stock" disabled />
                  <label
                    htmlFor="out-of-stock"
                    className="text-sm text-slate-600 dark:text-slate-300"
                  >
                    Out of Stock
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Product Catalog
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                  Manage your island logistics and inventory orders.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${
                      viewMode === "grid"
                        ? "bg-slate-100 dark:bg-slate-700 text-primary"
                        : "text-slate-400"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${
                      viewMode === "list"
                        ? "bg-slate-100 dark:bg-slate-700 text-primary"
                        : "text-slate-400"
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <Select defaultValue="newest" onValueChange={handleOnChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Pills */}
            {/* <div className="flex gap-2 pb-6 overflow-x-auto no-scrollbar">
              <Button size="sm" className="rounded-full shrink-0">
                All Products
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full shrink-0"
              >
                Best Sellers
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full shrink-0"
              >
                New Arrivals
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full shrink-0"
              >
                On Sale
              </Button>
            </div> */}

            {/* Products */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination */}
            <AppPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
      />

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-6 py-2 z-40 flex items-center justify-between shadow-2xl">
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 h-auto py-2 text-primary"
          onClick={() => router.push("/")}
        >
          <Package className="h-5 w-5" />
          <span className="text-[10px] font-bold">Shop</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 h-auto py-2 text-slate-400"
          onClick={() => router.push("/my-orders")}
        >
          <History className="h-5 w-5" />
          <span className="text-[10px] font-bold">Orders</span>
        </Button>
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 relative"
        >
          <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white -mt-8 shadow-lg shadow-primary/40 border-4 border-white dark:border-background-dark">
            <ShoppingCart className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-bold text-primary">
            Cart ({cartItems.length})
          </span>
        </button>
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 h-auto py-2 text-slate-400"
          onClick={() => router.push("/my-account")}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-bold">Account</span>
        </Button>
      </div>
    </div>
  );
}
