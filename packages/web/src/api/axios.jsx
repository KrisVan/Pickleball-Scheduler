import axios from "axios";

const API_HOST_URL = "http://localhost:5000"

const instance = new axios.create({
  baseURL: API_HOST_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  }
});

export default instance;
