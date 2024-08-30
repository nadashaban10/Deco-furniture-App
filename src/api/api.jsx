import axios from "axios";



const api2 = axios.create({
  baseURL: "https://e-commerce-project-deploy.vercel.app/api/v1",
});


export  { api2 };
