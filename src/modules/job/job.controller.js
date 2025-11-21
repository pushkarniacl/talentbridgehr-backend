import { jobService } from "./job.service.js";

export const jobController = {
  create: async (req, res, next) => {
    try {
      const payload = {
        ...req.body,
        createdById: req.user.id
      };
      const job = await jobService.createJob(payload);
      res.status(201).json(job);
    } catch (err) { next(err); }
  },

  get: async (req, res, next) => {
    try {
      const job = await jobService.getJob(req.params.id);
      if (!job) return res.status(404).json({ error: "Not found" });
      res.json(job);
    } catch (err) { next(err); }
  },

  list: async (req, res, next) => {
    try {
      const jobs = await jobService.listJobs(req.query);
      res.json(jobs);
    } catch (err) { next(err); }
  },

  update: async (req, res, next) => {
    try {
      const updated = await jobService.updateJob(req.params.id, req.body);
      res.json(updated);
    } catch (err) { next(err); }
  },

  remove: async (req, res, next) => {
    try {
      await jobService.deleteJob(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  }
};
