import axiosInstance from "./axiosInstance";

const UsersApi = {
  create: async (data) => {
    try {
      const response = axiosInstance.post(`/users`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update employee ${error}`);
    }
  },
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/users", { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch employees ${error}`);
    }
  },
  update: async (id, data) => {
    try {
      const response = await axiosInstance.patch(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update employee ${error}`);
    }
  }
};

export default UsersApi;
