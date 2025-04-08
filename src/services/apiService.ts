import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

console.log("base", BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  //   "ngrok-skip-browser-warning": "69420",
  // },
});

console.log("axios instance", axiosInstance);

export const fetchApiData = async (url) => {
  try {
    console.log("url", url);
    const response = await axiosInstance.get(`${BASE_URL}${url}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const fetchApiData2 = async (url, body) => {
  try {
    const response = await axiosInstance.post(`/${url}`, body);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: error.response?.data || null, error: error.message };
  }
};
