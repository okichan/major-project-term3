import api from "./init";

export function listNotifications() {
  return api.get("/notifications").then(res => res.data);
}

export function updateNotifications(id, data) {
  return api.put(`/notification/${id}`, data).then(res => res.data);
}

export function deleteNotifications() {
  return api.delete(`/notifications`).then(res => res.data);
}
