import { clientService } from "./client.service.js";

export const clientController = {
  create: async (req, res, next) => {
    try {
      const client = await clientService.createClient(req.body);
      res.status(201).json(client);
    } catch (err) { next(err); }
  },

  get: async (req, res, next) => {
    try {
      const client = await clientService.getClient(req.params.id);
      if (!client) return res.status(404).json({ error: "Not found" });
      res.json(client);
    } catch (err) { next(err); }
  },

  list: async (req, res, next) => {
    try {
      const clients = await clientService.listClients(req.query);
      res.json(clients);
    } catch (err) { next(err); }
  },

  update: async (req, res, next) => {
    try {
      const updated = await clientService.updateClient(req.params.id, req.body);
      res.json(updated);
    } catch (err) { next(err); }
  },

  remove: async (req, res, next) => {
    try {
      await clientService.deleteClient(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  }
};
