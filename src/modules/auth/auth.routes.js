import { Router } from "express";
import { authController } from "./auth.controller.js";
import { body } from "express-validator";
import { validateRequest } from "../../middleware/validate.middleware.js";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
    body("name").notEmpty().withMessage("Name is required")
  ],
  validateRequest,
  authController.register
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").notEmpty()
  ],
  validateRequest,
  authController.login
);

export default router;
