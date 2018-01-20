import api from "./init";

export function listSales() {
  return api.get("/sales").then(res => res.data);
}

export function createSale(data) {
  return api.post("/sales", data).then(res => res.data);
}

export function updateSale(id, data) {
  return api.put(`/sale/${id}`, data).then(res => res.data);
}

export function deleteSale(id) {
  return api.delete(`/sale/${id}`).then(res => res.data);
}

export function dailySales(date) {
  return api.get(`/sales?date=${date}`).then(res => res.data);
}

export function monthRangeSales(range) {
  return api.get(`/sales?monthRange=${range}`).then(res => res.data);
}

// export function createProduct(data) {
//   return api.post("/sales", data).then(res => res.data);
// }
//
// export function updateProduct(id, data) {
//   return api.put(`/sale/${id}`, data).then(res => res.data);
// }
