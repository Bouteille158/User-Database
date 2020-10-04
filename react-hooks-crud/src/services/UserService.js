import http from "../http-common";

const getAll = () => {
  return http.get("/users");
};

const get = id => {
  return http.get(`/users/${id}`);
};

const create = data => {
  return http.post("/users", data);
};

const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

const findByfirst_name = first_name => {
  return http.get(`/users?first_name=${first_name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByfirst_name
};