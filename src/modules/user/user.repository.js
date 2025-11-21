import prisma from "../../config/database.js";

export const userRepository = {
  create: (data) => prisma.user.create({ data }),
  findById: (id) => prisma.user.findUnique({ where: { id } }),
  findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  list: (params = {}) => prisma.user.findMany({ take: params.take || 50, skip: params.skip || 0 })
};
