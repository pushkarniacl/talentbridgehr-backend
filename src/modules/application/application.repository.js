import prisma from "../../config/database.js";

export const applicationRepository = {
  create: (data) => prisma.application.create({ data }),
  findById: (id) => prisma.application.findUnique({ where: { id } }),
  listByJob: (jobId, params = {}) => prisma.application.findMany({ where: { jobId }, take: params.take || 50, skip: params.skip || 0 }),
  update: (id, data) => prisma.application.update({ where: { id }, data })
};
