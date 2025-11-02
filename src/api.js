import axios from 'axios';
// const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:7000/api' });
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'https://job-application-server-hp42.onrender.com/api' });

API.interceptors.request.use(config =>{
  const token = localStorage.getItem('token');
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default API;


