import api from "./init";

export function listProducts() {
	return api.get("/products").then(res => res.data);
}

export function createProduct(data) {
	return api.post("/products", data).then(res => res.data);
}

export function updateProduct(id, data) {
	return api.put(`/product/${id}`, data).then(res => res.data);
}

export function deleteProduct(id) {
	return api.delete(`/product/${id}`).then(res => res.data);
}
