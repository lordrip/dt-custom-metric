import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const client = (() => {
  const token = process.env.DT_TOKEN;
  const baseURL = process.env.DT_TENANT;
  const instance = axios.create({ baseURL })

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Api-Token ${token}`;

    return config;
  })

  return instance;
})();

export class HttpClient {

  static async get<T>(url: string) {
    return client.get<T>(url);
  }

  static async post<T>(url: string, data: any) {
    return client.post<T>(url, data);
  }

  static async put<T>(url: string, data: any) {
    return client.put<T>(url, data);
  }

  static async delete<T>(url: string) {
    return client.delete<T>(url);
  }
}
