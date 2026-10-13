import llm from "../config/llm.js";
import hrInterviewPrompt from "../prompts/HrInterview.js"
import techInterviewPrompt from "../prompts/TechInterview.js"

export const interviewAgent = async (data) => {
    try{
        const prompt = data.type?.toLowerCase() === "Hr" ? hrInterviewPrompt(data) : techInterviewPrompt(data);

        const response = await llm.invoke(prompt);

        const cleaned = response.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

        return JSON.parse(cleaned);
    }catch (error) {
        console.log("Interview Agent Parse Error");
        console.log(response.content);

        throw new Error("Failed to generate interview questions.");
    }
}