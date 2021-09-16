import { Router } from "express";
const router = Router();
import login from "./login";
import signup from "./signup";
router.use("/patient", login, signup);

export default router;
