export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    console.log("[AuthService] Token set:", token);
  } else {
    console.warn("[AuthService] No token provided to setToken");
  }
};

export const removeToken = () => {
  localStorage.removeItem("token");
  console.log("[AuthService] Token removed");
};

export const logoutUser = () => {
  removeToken();
  console.log("[AuthService] Logging out user...");
  window.location.href = "/login";
};
