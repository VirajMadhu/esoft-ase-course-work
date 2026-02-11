

'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Eye } from 'lucide-react';
import { getOrders } from '@/lib/api/orders-api';

/* Status Badge */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    SHIPPED: 'bg-blue-100 text-blue-700',
    PAID: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  /* FETCH FROM BACKEND */
  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(console.error);
  }, []);

  /* FILTER LOGIC */
  const filteredOrders = orders.filter((order) => {
    const matchSearch = order.order_number
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === 'All' || order.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <a href="/" className="inline-flex items-center gap-2 text-lg mb-8">
        <ArrowLeft size={18} />
        Go Back to Shop
      </a>

      <div className="flex gap-6">
        {/* LEFT SIDEBAR*/}
        <aside className="w-64 bg-white rounded-lg shadow p-4">
          <h3 className="text-xs font-semibold text-gray-500 mb-3">
            FILTER BY STATUS
          </h3>

          <ul className="space-y-2 text-sm">
            {['All', 'PENDING', 'SHIPPED', 'PAID', 'CANCELLED'].map((s) => (
              <li
                key={s}
                className={`cursor-pointer ${
                  statusFilter === s ? 'text-blue-600 font-medium' : 'text-gray-600'
                }`}
                onClick={() => setStatusFilter(s)}
              >
                {s}
              </li>
            ))}
          </ul>

           <hr className="my-4" />

          <h3 className="text-xs font-semibold text-gray-500 mb-3">TIMEFRAME</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Last 30 Days
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Last 6 Months
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Year 2026
            </label>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Order History</h1>
              <p className="text-gray-500 text-sm">
                Review your recent transactions.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search by Order Number..."
              className="border rounded-md px-4 py-2 text-sm w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* TABLE*/}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-4 text-left">ORDER ID</th>
                  <th className="p-4 text-left">DATE</th>
                  <th className="p-4 text-left">TOTAL</th>
                  <th className="p-4 text-left">STATUS</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.order_number} className="border-t">
                      <td className="p-4 font-medium">
                        #{order.order_number}
                      </td>
                      <td className="p-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        LKR {order.total_amount}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={order.status} />
                      </td>
                      
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <span>Showing 1 to {filteredOrders.length} of {orders.length} orders</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded">‹</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-1 border rounded">..</button>
              <button className="px-3 py-1 border rounded">›</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}