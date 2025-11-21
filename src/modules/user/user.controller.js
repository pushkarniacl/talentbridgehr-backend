import { userService } from "./user.service.js";

export const userController = {
  profile: async (req, res, next) => {
    try {
      const user = await userService.getProfile(req.user.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  list: async (req, res, next) => {
    try {
      const users = await userService.listUsers(req.query);
      res.json(users.map(u => {
        const { password, ...rest } = u;
        return rest;
      }));
    } catch (err) {
      next(err);
    }
  }
};
