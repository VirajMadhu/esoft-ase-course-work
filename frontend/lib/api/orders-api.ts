import api from "./axios";

export async function placeOrderApi(orderData: Record<string, unknown>) {
    const { data } = await api.post("/orders", orderData);
    return data;
}
