// import axios from "axios";

// const api = axios.create({
//     baseURL: import.meta.env.BACKEND_URL + "/api/v1",
//     withCredentials: true,
// });

// export default api;

import axios from "axios";
import dotenv from "dotenv";

// Load env vars
dotenv.config();

const api = axios.create({
    baseURL: process.env.BACKEND_URL + "/api/v1",
    withCredentials: true,
});

export default api;

