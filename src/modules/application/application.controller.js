import { applicationService } from "./application.service.js";

export const applicationController = {
  apply: async (req, res, next) => {
    try {
      const payload = { ...req.body, jobId: req.params.jobId };
      const app = await applicationService.apply(payload);
      res.status(201).json(app);
    } catch (err) { next(err); }
  },

  list: async (req, res, next) => {
    try {
      const list = await applicationService.listForJob(req.params.jobId, req.query);
      res.json(list);
    } catch (err) { next(err); }
  },

  update: async (req, res, next) => {
    try {
      const updated = await applicationService.updateStatus(req.params.id, req.body);
      res.json(updated);
    } catch (err) { next(err); }
  }
};
