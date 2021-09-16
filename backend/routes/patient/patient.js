import { Router } from "express";
const router = Router();
import login from "./login";
import signup from "./signup";
import appointment from "./appointment";
import cases from "./cases";
router.use("/patient", login, signup, appointment, cases);

export default router;
