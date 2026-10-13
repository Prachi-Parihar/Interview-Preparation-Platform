import api from "../utils/api.js";

export const startInterview = async (data) => {
  try {
    const response = await api.post("/interview/start", data);
    return response.data;
  } catch (error) {
    console.log("Start Interview Error:", error);
    return null;
  }
};

export const getInterview = async (id) => {
  try {
    const response = await api.get(`/interview/${id}`);
    return response.data;
  } catch (error) {
    console.log("Get Interview Error:", error);
    return null;
  }
};

export const submitAnswer = async (data) => {
  try {
    const response = await api.post("/interview/answer", data);
    return response.data;
  } catch (error) {
    console.log("Submit Answer Error:", error);
    return null;
  }
};

export const getAllInterviews = async () => {
  try {
    const response = await api.get("/interview/all");
    return response.data;
  } catch (error) {
    console.log("Get All Interviews Error:", error);
    return null;
  }
};