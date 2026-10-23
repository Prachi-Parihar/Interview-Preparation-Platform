
import { app as firebaseApp } from "../configs/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../models/userModel.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";

const SESSION_COOKIE = "sessionId";
const SESSION_TTL = 7 * 24 * 60 * 60;

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: SESSION_TTL * 1000,
};

export const GoogleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Firebase token is required",
      });
    }

    const decoded = await getAuth(firebaseApp).verifyIdToken(token);

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

    const sessionData = {
      userId: user._id.toString(),
      email: user.email,
      username: user.username,
      interviewCoins: user.interviewCoins,
    };

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify(sessionData),
      "EX",
      SESSION_TTL
    );

    res.cookie(SESSION_COOKIE, sessionId, cookieOptions);

    return res.status(200).json({
      message: "User authenticated successfully",
      user,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);

    return res.status(401).json({
      message: "Google authentication failed",
    });
  }
};

export const Logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.[SESSION_COOKIE];

    if (sessionId) {
      await redis.del(`session:${sessionId}`);
    }

    res.clearCookie(SESSION_COOKIE, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      message: "Logout failed",
    });
  }
};
