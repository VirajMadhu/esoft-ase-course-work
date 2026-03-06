// lib/api/inventory-api.ts
import api from "./axios";

// API Service for Inventory Management (Staff Portal)
export const inventoryApi = {
  // GET: Fetch all inventory items (with optional filters)
  getAll: async (params?: {
    search?: string;
    categoryId?: string;
    status?: string;
  }) => {
    const { data } = await api.get("/inventory", { params });
    return data;
  },

  // Placeholder: Future transfer stock API
  transferStock: async (transferData: {
    productId: number;
    quantity: number;
    fromLocation?: string;
    toLocation: string;
    reason?: string;
  }) => {
    const { data } = await api.post("/inventory/transfer", transferData);
    return data;
  },
};
