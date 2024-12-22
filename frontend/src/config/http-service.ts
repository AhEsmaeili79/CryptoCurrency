import axios from "axios";

const AUTH_TOKEN = "1Kyw6LHVmD5IYhPUWcAumrK+0FrsshmwC2OKMOq8L28=";

export const instance = axios.create({
  baseURL: "https://openapiv1.coinstats.app/",
});

instance.defaults.headers.common["X-API-KEY"] = AUTH_TOKEN;

