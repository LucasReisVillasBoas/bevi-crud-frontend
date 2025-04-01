import { jwtDecode } from "jwt-decode";

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token") || "";
  if (!token) return false;
  const decodedToken = jwtDecode<any>(token);
  const expirationTime = decodedToken.exp * 1000;
  return Date.now() < expirationTime;
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};
