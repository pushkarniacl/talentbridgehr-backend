import { Router } from "express";
import { clientController } from "./client.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { body } from "express-validator";
import { validateRequest } from "../../middleware/validate.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate(["ADMIN", "HR"]),
  [body("name").notEmpty().withMessage("Name required")],
  validateRequest,
  clientController.create
);

router.get("/", authenticate(), clientController.list);
router.get("/:id", authenticate(), clientController.get);
router.put("/:id", authenticate(["ADMIN", "HR"]), clientController.update);
router.delete("/:id", authenticate(["ADMIN"]), clientController.remove);

export default router;
