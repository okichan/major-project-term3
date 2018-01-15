import api from "./init";

export function listCustomers() {
  return api.get("/customers").then(res => res.data);
}

export function createCustomer(data) {
  return api.post("/customers", data).then(res => res.data);
}

export function updateCustomer(id, data) {
  return api.put(`/customer/${id}`, data).then(res => res.data);
}

export function deleteCustomer(id) {
	return api.delete(`/customer/${id}`).then(res => res.data);
}
