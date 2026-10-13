
import redis from "../../../shared/redis/redis.js";
import graph from "../graph/graph.js";
import Interview from "../models/interviewModel.js";

export const startInterview = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];

        const {
            type,
            role,
            useResume = false,
            resume = {},
        } = req.body;

        if (!type || !role) {
            return res.status(400).json({
                success: false,
                message: "Interview type and role are required",
            });
        }

        const result = await graph.invoke({
            action: "start",
            role,
            type,
            useResume,
            resume,
        });

        const questions = result.questions;

        if (!questions || questions.length === 0) {
            return res.status(500).json({
                success: false,
                message: "Failed to generate interview questions",
            });
        }

        const newInterview = await Interview.create({
            userId,
            type,
            role,
            useResume,
            questions,
            currentQuestion: 0,
            status: "in-progress",
        });

        await redis.del(`interviews:${userId}`);

        return res.status(200).json({
            success: true,
            interviewId: newInterview._id,
            currentQuestion: 0,
            totalQuestions: newInterview.questions.length,
            question: newInterview.questions[0],
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const submitAnswer = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const { interviewId, answer } = req.body;

        if (!interviewId || !answer) {
            return res.status(400).json({
                success: false,
                message: "Interview Id and Answer are required",
            });
        }

        const currentInterview = await Interview.findOne({
            _id: interviewId,
            userId,
        });

        if (!currentInterview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found",
            });
        }

        if (currentInterview.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Interview already completed",
            });
        }

        const index = currentInterview.currentQuestion;
        const currentQuestion = currentInterview.questions[index];

        if (!currentQuestion) {
            return res.status(400).json({
                success: false,
                message: "Invalid question index",
            });
        }

        currentQuestion.userAnswer = answer;

        const completed =
            index + 1 >= currentInterview.questions.length;

        const result = await graph.invoke({
            action: "feedback",
            question: currentQuestion.question,
            answer,
            difficulty: currentQuestion.difficulty,
            completed,
            role: currentInterview.role,
            type: currentInterview.type,
            questions: currentInterview.questions,
        });

        currentQuestion.feedback = result.feedback;
        currentInterview.currentQuestion++;

        if (completed) {
            currentInterview.status = "completed";
            currentInterview.overallScore = result.report.overallScore;
            currentInterview.summary = result.report.summary;
            currentInterview.strengths = result.report.strengths;
            currentInterview.weaknesses = result.report.weaknesses;
            currentInterview.recommendations =
                result.report.recommendations;
        }

        await currentInterview.save();

        await redis.del(`interviews:${userId}`);

        if (completed) {
            return res.status(200).json({
                success: true,
                completed: true,
                interview: currentInterview,
            });
        }

        return res.status(200).json({
            success: true,
            completed: false,
            currentQuestion: currentInterview.currentQuestion,
            question:
                currentInterview.questions[
                    currentInterview.currentQuestion
                ],
            feedback: result.feedback,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getInterview = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const { id } = req.params;

        const currentInterview = await Interview.findOne({
            _id: id,
            userId,
        });

        if (!currentInterview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found",
            });
        }

        return res.status(200).json({
            success: true,
            interview: currentInterview,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getAllInterviews = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];

        const cache = await redis.get(`interviews:${userId}`);

        if (cache) {
            console.log("Data served from Redis");

            return res.status(200).json(JSON.parse(cache));
        }

        const interviews = await Interview.find({ userId }).sort({
            createdAt: -1,
        });

        const completed = interviews.filter(
            (item) => item.status === "completed"
        );

        const totalQuestions = interviews.reduce(
            (sum, item) => sum + item.questions.length,
            0
        );

        const averageScore =
            completed.length > 0
                ? Number(
                      completed.reduce(
                          (sum, item) => sum + (item.overallScore || 0),
                          0
                      ) / completed.length
                  ).toFixed(1)
                : 0;

        const stats = {
            totalInterview: interviews.length,
            totalQuestions,
            completed: completed.length,
            averageScore: Number(averageScore),
        };

        const getAverageData = (list) => {
            const skills = [
                { key: "correctness", name: "Correctness" },
                { key: "clarity", name: "Clarity" },
                { key: "relevance", name: "Relevance" },
                { key: "detail", name: "Detail" },
                { key: "efficiency", name: "Efficiency" },
                { key: "communication", name: "Communication" },
                { key: "problemSolving", name: "Problem Solving" },
                { key: "creativity", name: "Creativity" },
            ];

            const total = {};
            skills.forEach((skill) => {
                total[skill.key] = 0;
            });

            let count = 0;

            list.forEach((item) => {
                item.questions.forEach((question) => {
                    if (!question.feedback) {
                        return;
                    }

                    skills.forEach((skill) => {
                        total[skill.key] +=
                            question.feedback[skill.key] || 0;
                    });

                    count++;
                });
            });

            return skills.map((skill) => ({
                skills: skill.name,
                score:
                    count > 0
                        ? Math.round(total[skill.key] / count)
                        : 0,
            }));
        };

        const technicalInterviews = completed.filter(
            (item) => item.type === "Technical"
        );

        const hrInterviews = completed.filter(
            (item) => item.type === "Hr"
        );

        const technicalData = getAverageData(technicalInterviews);
        const hrData = getAverageData(hrInterviews);

        const technicalCount = technicalInterviews.length;
        const hrCount = hrInterviews.length;

        const payload = {
            success: true,
            interviews,
            stats,
            technicalData,
            hrData,
            technicalCount,
            hrCount,
        };

        await redis.set(
            `interviews:${userId}`,
            JSON.stringify(payload),
            "EX",
            600
        );

        return res.status(200).json(payload);
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
