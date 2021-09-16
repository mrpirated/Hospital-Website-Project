import { Router } from "express";
const router = Router();
import login from "./login";
import signup from "./signup";
router.use("/admin", login, signup);

export default router;
