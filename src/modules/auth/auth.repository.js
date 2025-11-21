import prisma from "../../config/database.js";

export const authRepository = {
  createUser: (data) => prisma.user.create({ data }),
  findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  findById: (id) => prisma.user.findUnique({ where: { id } })
};
