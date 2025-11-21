import { jobRepository } from "./job.repository.js";

export const jobService = {
  createJob: (payload) => jobRepository.create(payload),
  getJob: (id) => jobRepository.findById(id),
  listJobs: (q) => jobRepository.list(q),
  updateJob: (id, payload) => jobRepository.update(id, payload),
  deleteJob: (id) => jobRepository.remove(id)
};
