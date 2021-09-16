import { Router } from "express";
const router = Router();
import login from "./login";
import signup from "./signup";
import schedule from "./schedule";
router.use("/doctor", login, signup, schedule);

export default router;
