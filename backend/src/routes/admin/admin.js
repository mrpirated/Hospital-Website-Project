import { Router } from "express";
const router = Router();
import login from "./login";
import signup from "./signup";
import schedule from "./schedule";
import zoommeeting from "./zoommeeting";
import appointment from "./appointment";
import add_doctor from "./add_doctor";

router.use("/admin", login, signup, schedule, zoommeeting, appointment, add_doctor);

export default router;
