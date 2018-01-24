import api from "./init";

export function dailyCustomerTraffics(date) {
  return api.get(`/customerTraffics?date=${date}`).then(res => res.data);
}

export function listCustomerTraffics() {
  return api.get("/customerTraffics").then(res => res.data);
}

export function createCustomerTraffics(data) {
  return api.post("/customerTraffics", data).then(res => res.data);
}

export function updateCustomerTraffic(id, data) {
  return api.put(`/customerTraffic/${id}`, data).then(res => res.data);
}

export function deleteProduct(id) {
  return api.delete(`/product/${id}`).then(res => res.data);
}

export function deleteCustomerTraffics(id) {
  return api.delete(`/customerTraffic/${id}`).then(res => res.data);
}
