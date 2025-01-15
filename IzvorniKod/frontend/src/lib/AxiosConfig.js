import axios from "axios";

const client = axios.create({
  withCredentials: true,
  baseURL: '/api',
  headers: {
    "Content-type": "application/json"
  }
});

client.interceptors.request.use(async config => {
    const accessToken = localStorage.getItem("authToken")
    if (config.headers) {
      if (accessToken){
        config.headers.Authorization = `Bearer ${accessToken}` 
      }
    }
    return config
});


export default client

