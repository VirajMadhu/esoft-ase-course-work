// app/staff/orders/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import { ordersApi } from "@/lib/api/orders-api";

interface Order {
  id: number;
  order_number: string;
  customer?: {
    businessName: string;
    address: string;
    phone?: string;
  };
  createdAt: string;
  total_amount: number;
  status: string;
  items?: Array<{
    product: {
      name: string;
      sku: string;
      unit: string;
    };
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const params: any = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter !== "All Statuses") params.status = statusFilter;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const data = await ordersApi.getAll(params);
      setOrders(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => fetchOrders();

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    if (!confirm(`Change status to "${newStatus}"?`)) return;
    try {
      await ordersApi.updateStatus(orderId, newStatus);
      fetchOrders();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const openDetails = async (order: Order) => {
    try {
      const detailed = await ordersApi.getById(order.id);
      setSelectedOrder(detailed);
    } catch (err) {
      alert("Failed to load order details");
    }
  };

  const closeModal = () => setSelectedOrder(null);

  const displayedOrders = orders.filter(
    (order) =>
      order.order_number.toLowerCase().includes(search.toLowerCase()) ||
      order.customer?.businessName
        ?.toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
          <span>Home</span> <span>/</span>{" "}
          <span className="font-medium text-slate-900">Orders</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
        <p className="text-slate-500 text-sm mt-1">
          View and update current distribution orders for North RDC.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[260px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              placeholder="Search Order ID or Customer…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="w-full sm:w-44 relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option>All Statuses</option>
              <option>PENDING</option>
              <option>PAID</option>
              <option>SHIPPED</option>
              <option>CANCELLED</option>
              <option>DELIVERED</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          </div>

          <div className="w-full sm:w-64 relative">
            <input
              type="text"
              readOnly
              placeholder="Date Range"
              className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm bg-white cursor-pointer"
              onClick={() => alert("Date range picker coming soon")}
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          </div>

          <button
            onClick={handleApplyFilters}
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            Loading orders...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-600">{error}</div>
        ) : displayedOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No orders found.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Customer / Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Total Value
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Status Action
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-5 font-medium text-slate-900">
                        {order.order_number}
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-semibold">
                          {order.customer?.businessName || "N/A"}
                        </div>
                        <div className="text-sm text-slate-500">
                          {order.customer?.address || ""}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-600">
                        {new Date(order.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-5 font-medium text-slate-900">
                        ${Number(order.total_amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-5">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="PAID">Paid</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="CANCELLED">Cancelled</option>
                          <option value="DELIVERED">Delivered</option>
                        </select>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => openDetails(order)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600">
              <div>
                Showing {displayedOrders.length} of {orders.length} results
              </div>
              <div className="flex gap-3 mt-3 sm:mt-0">
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
          </>
        )}
      </div>

      {/* View Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold">
                  Order #{selectedOrder.order_number}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-8">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">
                  Customer Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-medium text-lg">
                    {selectedOrder.customer?.businessName}
                  </p>
                  <p className="text-gray-600">
                    {selectedOrder.customer?.address}
                  </p>
                  {selectedOrder.customer?.phone && (
                    <p className="text-gray-600">
                      Phone: {selectedOrder.customer.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">
                  Order Items
                </h3>
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        SKU
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">
                        Unit Price
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-4 py-3">{item.product?.name}</td>
                        <td className="px-4 py-3 text-gray-500">
                          {item.product?.sku}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-right">
                          ${Number(item.unitPrice).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-right font-medium">
                          ${Number(item.lineTotal).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="text-right font-bold text-xl">
                Total: ${Number(selectedOrder.total_amount).toFixed(2)}
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 text-right">
              <button
                onClick={closeModal}
                className="px-8 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
