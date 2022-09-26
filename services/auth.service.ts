import axios from "axios";
import apiClient from "./api";

const register = async (name: string, email: string, password: string) => {
  return await apiClient
    .post("auth/register", {
      name,
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const login = async (email: string, password: string) => {
  return await apiClient
    .post("auth/login", {
      username: email,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        return response.data;
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
