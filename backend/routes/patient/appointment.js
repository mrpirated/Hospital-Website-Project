import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import {
	MyAppointment,
	NewAppointment,
	NewCase,
} from "../../controllers/patient/appointment";

router.get("/myappointment", MyAppointment);
router.post("/newappointment", NewAppointment);
router.post("/newcase", NewCase);
export default router;
