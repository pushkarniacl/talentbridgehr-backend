import prisma from "../../config/database.js";

export const jobRepository = {
  create: (data) => prisma.job.create({ data }),
  findById: (id) => prisma.job.findUnique({ where: { id } }),
  list: (params = {}) => prisma.job.findMany({
    take: params.take || 50,
    skip: params.skip || 0,
    where: params.where || undefined
  }),
  update: (id, data) => prisma.job.update({ where: { id }, data }),
  remove: (id) => prisma.job.delete({ where: { id } })
};
