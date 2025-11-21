import { Router } from "express";
import { jobController } from "./job.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { body } from "express-validator";
import { validateRequest } from "../../middleware/validate.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate(["ADMIN", "HR"]),
  [body("title").notEmpty().withMessage("Title required"), body("clientId").notEmpty().withMessage("clientId required")],
  validateRequest,
  jobController.create
);

router.get("/", authenticate(), jobController.list);
router.get("/:id", authenticate(), jobController.get);
router.put("/:id", authenticate(["ADMIN", "HR"]), jobController.update);
router.delete("/:id", authenticate(["ADMIN"]), jobController.remove);

export default router;
