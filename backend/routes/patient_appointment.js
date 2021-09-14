import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import patient_appointment from "../controllers/patient_appointment";

router.get("/patient_appointment", patient_appointment);

export default router;