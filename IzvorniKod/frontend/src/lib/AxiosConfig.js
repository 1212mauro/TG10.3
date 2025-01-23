import axios from "axios";

const client = axios.create({
  withCredentials: true,
  baseURL: '/api',
  headers: {
    "Content-type": "application/json"
  }
});

export default client