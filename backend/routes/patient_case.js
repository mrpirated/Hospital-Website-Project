import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import patient_case from "../controllers/patient_case";

router.get("/patient_case", patient_case);

export default router;