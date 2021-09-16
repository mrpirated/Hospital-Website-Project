import { Router } from "express";
const router = Router();
import login from "./login";
import signup from "./signup";
import schedule from "./schedule";
router.use("/admin", login, signup, schedule);

export default router;
