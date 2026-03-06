import api from "./axios";

export const ordersApi = {
  // ─── Customer-facing ───

  // POST: Place a new order
  placeOrder: async (orderData: Record<string, unknown>) => {
    const { data } = await api.post("/orders", orderData);
    return data;
  },

  // GET: Get order by order number (for receipt / tracking)
  getByOrderNumber: async (orderNumber: string) => {
    const { data } = await api.get(`/orders/${orderNumber}`);
    return data;
  },

  // ─── Staff-facing ───

  // GET: List all orders (with optional filters)
  getAll: async (params?: {
    status?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }) => {
    const { data } = await api.get("/orders", { params });
    return data;
  },

  // GET: Get single order by ID (for View Details)
  getById: async (id: number | string) => {
    const { data } = await api.get(`/orders/view/${id}`);
    return data;
  },

  // PATCH: Update order status
  updateStatus: async (id: number | string, status: string) => {
    const { data } = await api.patch(`/orders/${id}/status`, { status });
    return data;
  },
};
