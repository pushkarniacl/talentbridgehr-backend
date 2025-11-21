import prisma from "../../config/database.js";

export const clientRepository = {
  create: (data) => prisma.client.create({ data }),
  findById: (id) => prisma.client.findUnique({ where: { id } }),
  list: (params = {}) => prisma.client.findMany({ take: params.take || 50, skip: params.skip || 0 }),
  update: (id, data) => prisma.client.update({ where: { id }, data }),
  remove: (id) => prisma.client.delete({ where: { id } })
};
