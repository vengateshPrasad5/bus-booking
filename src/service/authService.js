import axios from "axios";
import { jwtDecode } from "jwt-decode";
// const local = "http://localhost:8080";
// const AUTH_REST_API_URL = "http://13.232.228.175:8080/api/auth";
const AUTH_REST_API_URL = "http://localhost:8081/api/auth";

export const registerAPICall = (registerObj) =>
  axios.post(AUTH_REST_API_URL + "/register", registerObj);

export const loginAPICall = (username, password) =>
  axios.post(AUTH_REST_API_URL + "/login", { username, password });

export const getUserProfile = (userName) =>
  axios.get(`${AUTH_REST_API_URL}/userProfile?userName=${userName}`);

export const changePassword = (passwordObj) =>
  axios.post(`${AUTH_REST_API_URL}/changePassword`, passwordObj);

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username, role, id) => {
  sessionStorage.setItem("authenticatedUser", username);
  sessionStorage.setItem("role", role);
  sessionStorage.setItem("userId", id);
};

export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  if (username == null) {
    return false;
  } else {
    return true;
  }
};

export const getLoggedInUser = () => {
  return sessionStorage.getItem("authenticatedUser");
};

export const logout = () => {
  sessionStorage.clear();
  localStorage.clear();
};

export const isAdminUser = () => {
  const role = sessionStorage.getItem("role");

  if (role != null && role == "ROLE_ADMIN") {
    return true;
  } else {
    return false;
  }
};

export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    if (exp * 1000 < Date.now()) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
