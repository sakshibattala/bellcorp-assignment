import { Router } from "express";
import { getAllEvents, getEventById } from "../controllers/event.controller.js";

const router = Router();

router.get("/", getAllEvents);

router.post("/:id", getEventById);

export default router;
