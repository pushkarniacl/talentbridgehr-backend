import { userRepository } from "./user.repository.js";

export const userService = {
  getProfile: async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    const { password, ...rest } = user;
    return rest;
  },

  listUsers: async (query) => {
    return userRepository.list(query);
  }
};
