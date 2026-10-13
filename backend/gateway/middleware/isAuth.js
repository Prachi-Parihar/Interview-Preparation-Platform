
import redis from "../../shared/redis/redis.js";

export const isAuth = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.sessionId;

    if (!sessionId) {
      return res.status(401).json({
        message: "Login required. Session cookie is missing.",
      });
    }

    const session = await redis.get(`session:${sessionId}`);

    if (!session) {
      return res.status(401).json({
        message: "Session not found or expired. Please login again.",
      });
    }

    try {
      req.user = JSON.parse(session);
    } catch {
      console.error("Invalid session data in Redis");

      return res.status(401).json({
        message: "Invalid session. Please login again.",
      });
    }

    return next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(500).json({
      message: "Authentication service error",
    });
  }
};
