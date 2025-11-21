import { applicationRepository } from "./application.repository.js";

export const applicationService = {
  apply: (payload) => applicationRepository.create(payload),
  listForJob: (jobId, q) => applicationRepository.listByJob(jobId, q),
  updateStatus: (id, payload) => applicationRepository.update(id, payload)
};
