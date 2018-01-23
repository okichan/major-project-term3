import api from "./init";

export function listCustomers() {
  return api.get("/customers").then(res => res.data);
}

export function listFilteredCustomers(type, query) {
  if (type === "phone") {
    return api.get(`/customers?phone=${query}`).then(res => {
      return res.data;
    });
  } else if (type === "name") {
    return api.get(`/customers?name=${query}`).then(res => {
      return res.data;
    });
  } else {
    return;
  }
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
