import axios, { AxiosRequestConfig } from "axios";
import { HttpMethod } from "../enums/httpMethods";
import { getAuthToken } from "../utils/auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token && !config.headers?.["Skip-Auth"]) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (config.headers?.["Skip-Auth"]) {
    delete config.headers["Skip-Auth"];
  }

  return config;
});

interface ApiServiceParams extends AxiosRequestConfig {
  method?: HttpMethod;
}

const apiService = async (url: string, options: ApiServiceParams = {}) => {
  try {
    const response = await api({
      url,
      method: options.method || HttpMethod.GET,
      ...options,
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro na requisição:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export default apiService;
