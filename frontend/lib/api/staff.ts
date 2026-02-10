import api from "./axios";

// API Service for Staff Management
// Handles all CRUD operations for the Staff Directory.
export const staffApi = {
    // GET: List all staff
    getAll: async () => {
        const response = await api.get("/staff");
        return response.data;
    },

    // POST: Create new staff member
    create: async (staffData: any) => {
        const response = await api.post("/staff", staffData);
        return response.data;
    },

    // PUT: Update existing staff
    update: async (id: number, staffData: any) => {
        const response = await api.put(`/staff/${id}`, staffData);
        return response.data;
    },

    // DELETE: Remove staff member
    delete: async (id: number) => {
        const response = await api.delete(`/staff/${id}`);
        return response.data;
    }
};
