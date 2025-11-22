import jwt from "jsonwebtoken";
import crypto from "crypto";
import { refreshRepository } from "./refresh.repository.js";
import { config } from "../../config/index.js";

export const refreshService = {
  generateTokens: async (user) => {
    const accessToken = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      config.jwtSecret,
      { expiresIn: "15m" }
    );

    const refreshToken = crypto.randomBytes(40).toString("hex");

    await refreshRepository.create({
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    return { accessToken, refreshToken };
  },

  refresh: async (token) => {
    const stored = await refreshRepository.findByToken(token);

    if (!stored) {
      const err = new Error("Invalid refresh token");
      err.status = 401;
      throw err;
    }

    if (stored.expiresAt < new Date()) {
      await refreshRepository.delete(token);

      const err = new Error("Refresh token expired");
      err.status = 401;
      throw err;
    }

    const { user } = stored;

    const newAccess = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      config.jwtSecret,
      { expiresIn: "15m" }
    );

    return { accessToken: newAccess };
  }
};
