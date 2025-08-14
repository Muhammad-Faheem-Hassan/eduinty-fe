

import axiosInstance from "./axiosInstance";

const AuthApi = {
    login: async (data) => {
        const response = await axiosInstance.post("/auth/login", data);
        return response.data;
    },
    signup: async (data) => {
        const response = await axiosInstance.post("/auth/signup", data);
        return response.data;
    },
};

export default AuthApi;

