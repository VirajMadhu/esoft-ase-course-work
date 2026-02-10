import api from "./axios";

export async function placeOrderApi(orderData: Record<string, unknown>) {
    const { data } = await api.post("/orders", orderData);
    return data;
}

export async function getOrderByNumberApi(orderNumber: string) {
    const { data } = await api.get(`/orders/${orderNumber}`);
    return data;
}

export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};