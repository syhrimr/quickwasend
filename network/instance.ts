import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.ipregistry.co/",
  timeout: 5000,
});

export default instance;
