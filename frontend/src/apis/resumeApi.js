import api from "../utils/api.js";

export const getResume = async () => {
  try {
    const response = await api.get("/resume/get-resume");
    return response.data;
  } catch (error) {
    console.log("Get Resume Error:", error);
    return null;
  }
};