import { app } from "../configs/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../models/userModel.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";

export const GoogleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = await getAuth(app).verifyIdToken(token);

    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        username: decoded.name || decoded.email?.split("@")[0],
        email: decoded.email,
      });
    }

    const sessionId = crypto.randomUUID();

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({
        userId: user._id,
        email: user.email,
        username: user.username,
        interviewCoins: user.interviewCoins,
      }),
      "EX",
      7 * 24 * 60 * 60
    );

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User authenticated successfully",
      user,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);

    return res.status(500).json({
      message: "Google authentication failed",
      error: error.message,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return res.status(400).json({
        message: "No session found",
      });
    }

    await redis.del(`session:${sessionId}`);

    res.clearCookie("sessionId");

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      message: "Logout failed",
      error: error.message,
    });
  }
};