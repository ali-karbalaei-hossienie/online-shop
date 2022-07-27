import http from "./http";

export const loginServices = (data) => {
  return http.post("/user/login", data);
};
