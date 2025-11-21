import { Router } from "express";
import { applicationController } from "./application.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { body } from "express-validator";
import { validateRequest } from "../../middleware/validate.middleware.js";

const router = Router({ mergeParams: true });

router.post(
  "/",
  [body("candidateName").notEmpty(), body("candidateEmail").isEmail()],
  validateRequest,
  applicationController.apply
);

router.get("/", authenticate(["ADMIN", "HR", "CLIENT"]), applicationController.list);
router.put("/:id", authenticate(["ADMIN", "HR"]), applicationController.update);

export default router;
