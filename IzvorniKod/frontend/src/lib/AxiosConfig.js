import axios from "axios";

const client = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080/api',
  headers: {
    "Content-type": "application/json"
  }
});

// client.interceptors.request.use(async config => {
//     const accessToken = localStorage.getItem("authToken")
  
//     if (config.headers) {
//       config.headers.Authorization = `Bearer ${accessToken}` 
//     }
  
//     return config
// });


export default client

