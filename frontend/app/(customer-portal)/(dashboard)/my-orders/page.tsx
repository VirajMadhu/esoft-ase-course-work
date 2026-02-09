
'use client';

import { useState } from 'react';
import { ArrowLeft, Eye } from 'lucide-react';


/* Dummy Data */
const orders = [
  { id: 'ORD-0001', date: 'Oct 24, 2023', amount: '$156.40', status: 'Dispatched' },
  { id: 'ORD-0002', date: 'Oct 21, 2023', amount: '$42.15', status: 'Delivered' },
  { id: 'ORD-0003', date: 'Oct 18, 2023', amount: '$218.00', status: 'Pending' },
  { id: 'ORD-0004', date: 'Oct 15, 2023', amount: '$89.50', status: 'Delivered' },
  { id: 'ORD-0005', date: 'Oct 10, 2023', amount: '$105.50', status: 'Delivered' },

];

/* Status Badge */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Dispatched: 'bg-blue-100 text-blue-700',
    Delivered: 'bg-green-100 text-green-700',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

/*  Page */
export default function OrderHistoryPage() {
const [search, setSearch] = useState('');
const [statusFilter, setStatusFilter] = useState('All');

  /*  FILTER LOGIC */
  const filteredOrders = orders.filter((order) => {
    const matchSearch = order.id
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === 'All' || order.status === statusFilter;

    return matchSearch && matchStatus;
  });


  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <a
            href="/"
            className="inline-flex items-center gap-2 text-lg font semibold text-gray-700 hover:text-blue-600 mb-8"
          >
              <ArrowLeft size={18} />
             Go Back to Shop
        </a>
      <div className="flex gap-6">
        

        {/*LEFT SIDEBAR */}
        <aside className="w-64 bg-white rounded-lg shadow p-4">
          <h3 className="text-xs font-semibold text-gray-500 mb-3">FILTER BY STATUS</h3>

           <ul className="space-y-2 text-sm">
            <li
              className={`flex justify-between cursor-pointer ${
                statusFilter === 'All' ? 'text-blue-600 font-medium' : 'text-gray-600'
              }`}
              onClick={() => setStatusFilter('All')}
            >
              <span>All Orders</span>
              <span className="bg-blue-100 text-blue-600 px-2 rounded-full text-xs">
                {orders.length}
              </span>
            </li>

            <li
              className={`cursor-pointer ${
                statusFilter === 'Dispatched' ? 'text-blue-600 font-medium' : 'text-gray-600'
              }`}
              onClick={() => setStatusFilter('Dispatched')}
            >
              In Transit
            </li>

            <li
              className={`cursor-pointer ${
                statusFilter === 'Delivered' ? 'text-blue-600 font-medium' : 'text-gray-600'
              }`}
              onClick={() => setStatusFilter('Delivered')}
            >
              Delivered
            </li>
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
              <input type="checkbox" /> Year 2023
            </label>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Order History</h1>
              <p className="text-gray-500 text-sm">
                Review your recent transactions and shipment status.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search by Order ID..."
              className="border rounded-md px-4 py-2 text-sm w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-4 text-left">ORDER ID</th>
                  <th className="p-4 text-left">DATE</th>
                  <th className="p-4 text-left">TOTAL AMOUNT</th>
                  <th className="p-4 text-left">STATUS</th>
                  <th className="p-4 text-left">DETAILS</th>
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
                    <tr key={order.id} className="border-t">
                      <td className="p-4 font-medium">#{order.id}</td>
                      <td className="p-4">{order.date}</td>
                      <td className="p-4">{order.amount}</td>
                      <td className="p-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="p-4 align-middle">
                       <span className="inline-flex items-center gap-2 text-blue-600 cursor-pointer hover:underline">
                            View
                        <Eye size={16} />
                       </span>
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
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">3</button>
              <button className="px-3 py-1 border rounded">›</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}