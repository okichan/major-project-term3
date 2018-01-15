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
