import { apiRequest } from "./apiService";

const BASE_URL = "/api/orders";

export const orderService = {
  getReservedOrders: async (username: string) => {
    return await apiRequest(`${BASE_URL}/reserved/${username}`, { method: "GET" });
  },

  createOrder: async (orderData: { availableDateId: number, serviceIds: number[] }) => {
    return await apiRequest(`${BASE_URL}/create`, {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  getUserOrders: async () => {
    return await apiRequest(`${BASE_URL}/user`, { method: "GET" });
  },

  deleteOrder: async (id: number) => {
    return await apiRequest(`${BASE_URL}/${id}`, { method: "DELETE" });
  }
};
