import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config/index.js";
import { authRepository } from "./auth.repository.js";

export const authService = {
  register: async (payload) => {
    const existing = await authRepository.findByEmail(payload.email);
    if (existing) {
      const err = new Error("Email already in use");
      err.status = 400;
      throw err;
    }
    const hash = await bcrypt.hash(payload.password, config.bcryptSaltRounds);
    const created = await authRepository.createUser({
      email: payload.email,
      password: hash,
      name: payload.name,
      role: payload.role || "HR"
    });
    // omit password
    const { password, ...rest } = created;
    return rest;
  },

  login: async (email, password) => {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      throw err;
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      throw err;
    }
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    const { password: pwd, ...rest } = user;
    return { token, user: rest };
  }
};
