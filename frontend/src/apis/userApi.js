
import api from "../utils/api.js";

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/me");
    return response.data.user;
  } catch (error) {
    console.error(
      "Get Current User Error:",
      error.response?.data?.message || error.message
    );

    return null;
  }
};
