import axiosInstance from "./axiosInstance";

const DashboardApi = {
  getCounts: async () => {
    try {
      const [userRes, campusRes] = await Promise.all([
        axiosInstance.get("/users/count"),
        axiosInstance.get("/campus/count"),
      ]);
      return {
        users: userRes.data.total,
        campuses: campusRes.data.total,
      };
    } catch (error) {
      throw new Error(`Failed to fetch dashboard counts: ${error}`);
    }
  }
};

export default DashboardApi;
