import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

const api2 = axios.create({
  baseURL: "https://e-commerce-project-deploy.vercel.app/api/v1",
});

export default api;
export { api2 };
