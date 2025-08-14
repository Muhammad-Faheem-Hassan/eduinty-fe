import axiosInstance from "./axiosInstance";

const CampusApi = {
  getAll: async (params = {}) => {
    const response = await axiosInstance.get("/campus", { params });
    return response.data;
  },
  create: async (data) => {
    const response = await axiosInstance.post("/campus", data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await axiosInstance.patch(`/campus/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await axiosInstance.delete(`/campus/${id}`);
    return response.data;
  },
};

export default CampusApi;
