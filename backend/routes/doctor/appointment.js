import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import appointment from "../../controllers/doctor/appointment";

router.get("/appointment", appointment);

export default router;