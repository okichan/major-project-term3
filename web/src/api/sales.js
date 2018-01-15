import api from "./init";

export function listSales() {
  return api.get("/sales").then(res => res.data);
}

export function createSales(data) {
  return api.post("/sale", data).then(res => res.data);
}

export function updateSales(id, data) {
  return api.put(`/sales/${id}`, data).then(res => res.data);
}
