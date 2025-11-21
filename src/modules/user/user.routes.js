import { Router } from "express";
import { userController } from "./user.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/me", authenticate(), userController.profile);
router.get("/", authenticate(["ADMIN"]), userController.list);

export default router;
