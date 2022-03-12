import { Router } from "express";
const router = Router();
import getProfilePic from "./getProfilePic";
import addAvailability from "./addAvailability";
import addQualification from "./addQualification";
import getDoctorQualification from "./getDoctorQualification";
import removeDoctorQualification from "./removeDoctorQualification";
router.use(
	"/admin",
	getProfilePic,
	addAvailability,
	addQualification,
	getDoctorQualification,
	removeDoctorQualification
);

export default router;
