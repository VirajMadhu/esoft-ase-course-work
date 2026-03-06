// app/staff/inventory/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Package,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { inventoryApi } from "@/lib/api/inventory-api";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  status: "In Stock" | "Low Stock" | "Critical";
}

const statusStyles = {
  "In Stock": "bg-green-100 text-green-800",
  "Low Stock": "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
};

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);

    try {
      const params: any = {};

      if (search.trim()) params.search = search.trim();
      if (categoryFilter !== "All Categories")
        params.categoryId = categoryFilter;
      if (statusFilter !== "All Statuses") params.status = statusFilter;

      const data = await inventoryApi.getAll(params);
      setItems(data);
    } catch (err: any) {
      console.error("Failed to fetch inventory:", err);
      setError(err.response?.data?.message || "Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    fetchInventory();
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All Categories" || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All Statuses" || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <span>Home</span> <span>/</span>{" "}
            <span className="font-medium text-slate-900">Inventory</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Inventory Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            View and manage current stock levels for North RDC.
          </p>
        </div>

        <button className="flex bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all">
          <Package className="w-4 h-4 mr-2" />
          Transfer Stock
        </button>
      </div>

      {/* Filters + Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search product name or SKU…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div className="w-full md:w-48 relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              <option>All Categories</option>
              <option>Soft Drinks</option>
              <option>Mineral Water</option>
              <option>Coffee & Tea</option>
              <option>Fresh Juices</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          </div>

          <div className="w-full md:w-44 relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              <option>All Statuses</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Critical</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    Loading inventory...
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No products found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.sku}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {item.stock} units
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[item.status]}`}
                      >
                        {item.status}
                        {item.status === "Critical" && (
                          <AlertTriangle className="w-3.5 h-3.5 ml-1.5" />
                        )}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (static for now) */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600">
          <div>
            Showing {filteredItems.length} of {items.length} products
          </div>
          <div className="flex items-center gap-3 mt-3 sm:mt-0">
            <button
              disabled
              className="px-4 py-2 border rounded-lg disabled:opacity-50 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-slate-50 flex items-center gap-2">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
