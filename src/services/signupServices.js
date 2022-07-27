import http from "./http";

export const signupServices = (data) => {
  return http.post("/user/register", data);
};
