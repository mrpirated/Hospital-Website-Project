import { Router } from "express";
const router = Router();
import login from "./login";
import signup from "./signup";
import schedule from "./schedule";
import zoommeeting from "./zoommeeting";
router.use("/admin", login, signup, schedule, zoommeeting);

export default router;
