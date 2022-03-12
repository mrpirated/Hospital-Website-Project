import { Router } from "express";
const router = Router();
import getProfilePic from "./getProfilePic";
import addAvailability from "./addAvailability";
router.use("/admin", getProfilePic, addAvailability);

export default router;
