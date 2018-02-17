import api, { setToken } from "./init";
import { getDecodedToken } from "./token";

export function signIn({ username, password }) {
  return api
    .post("/auth", { username, password })
    .then(res => {
      const token = res.data.token;
      setToken(token);
      return getDecodedToken();
    })
    .catch(error => {
      if (/ 401/.test(error.message)) {
        error = new Error("The username/password combination is incorrect");
      }

      throw error;
    });
}

export function signUp({ username, password }) {
  return api.post("/auth/register", { username, password }).then(res => {
    const token = res.data.token;
    setToken(token);
    return getDecodedToken();
  });
}

export function signOutNow() {
  // Forget the token
  setToken(null);
}
