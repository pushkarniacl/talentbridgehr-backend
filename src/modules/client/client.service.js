import { clientRepository } from "./client.repository.js";

export const clientService = {
  createClient: (payload) => clientRepository.create(payload),
  getClient: (id) => clientRepository.findById(id),
  listClients: (q) => clientRepository.list(q),
  updateClient: (id, payload) => clientRepository.update(id, payload),
  deleteClient: (id) => clientRepository.remove(id)
};
