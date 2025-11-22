import prisma from "../../config/database.js";

export const refreshRepository = {
  create: (data) => prisma.refreshToken.create({ data }),

  findByToken: (token) =>
    prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true }
    }),

  delete: (token) =>
    prisma.refreshToken.delete({
      where: { token }
    }),

  deleteByUserId: (userId) =>
    prisma.refreshToken.deleteMany({
      where: { userId }
    })
};
