import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  cancelRegistration,
  eventRegistration,
  userRegistrations,
} from "../controllers/registration.controller.js";

const router = Router();

router.post("/:eventId", authMiddleware, eventRegistration);

router.delete("/:eventId", authMiddleware, cancelRegistration);

router.get("/me", authMiddleware, userRegistrations);

export default router;
