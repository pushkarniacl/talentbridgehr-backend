import prisma from "../../config/database.js";
import { authService } from "./auth.service.js";
import { logger } from "../../utils/logger.js";

export const authController = {
  // -------------------------------------------------------------
  // REGISTER
  // -------------------------------------------------------------
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await authService.register({ name, email, password });

      return res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: { user },
      });
    } catch (err) {
      logger.error("Register error:", err);
      return res.status(400).json({
        status: "fail",
        message: err.message || "Registration failed",
      });
    }
  },

  // -------------------------------------------------------------
  // LOGIN
  // -------------------------------------------------------------
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const { user, accessToken, refreshToken } = await authService.login({ email, password });

      // Set refresh token in HttpOnly cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        data: {
          user,
          accessToken,
        }
      });

    } catch (err) {
      logger.error("Login error:", err);
      return res.status(401).json({
        status: "fail",
        message: err.message || "Invalid email or password",
      });
    }
  },

  // -------------------------------------------------------------
  // REFRESH TOKEN
  // -------------------------------------------------------------
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ status: "fail", message: "Refresh token missing" });
      }

      const { accessToken, newRefreshToken } = await authService.refresh(refreshToken);

      // set new refresh token
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        status: "success",
        accessToken,
      });

    } catch (err) {
      logger.error("Refresh token error:", err);
      return res.status(403).json({
        status: "fail",
        message: err.message || "Invalid refresh token",
      });
    }
  },

  // -------------------------------------------------------------
  // LOGOUT
  // -------------------------------------------------------------
  logout: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        await prisma.refreshToken.deleteMany({
          where: { token: refreshToken }
        });
      }

      // Clear cookie
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.status(200).json({
        status: "success",
        message: "Logged out successfully",
      });

    } catch (err) {
      logger.error("Logout error:", err);
      return res.status(500).json({
        status: "fail",
        message: "Logout failed",
      });
    }
  }
};
