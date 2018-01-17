import api from "./init";

export function listCustomers() {
  return api.get("/customers").then(res => res.data);
}

export function listFilteredCustomers(query) {
  return api.get(`/customers?phone=${query}`).then(res => {
    return res.data;
  });
}

export function createCustomer(data) {
  return api.post("/customers", data).then(res => res.data);
}

export function updateCustomer(id, data) {
  return api.put(`/customers/${id}`, data).then(res => res.data);
}
