import { Router } from "express";
const router = Router();
import getProfilePic from "./getProfilePic";
import addAvailability from "./addAvailability";
import addQualification from "./addQualification";
import getDoctorQualification from "./getDoctorQualification";
import removeDoctorQualification from "./removeDoctorQualification";
import setDoctorAppointmentDuration from "./setDoctorAppointmentDuration";
import getDoctorAppointmentDuration from "./getDoctorAppointmentDuration";
router.use(
	"/admin",
	getProfilePic,
	addAvailability,
	addQualification,
	getDoctorQualification,
	removeDoctorQualification,
	setDoctorAppointmentDuration,
	getDoctorAppointmentDuration
);

export default router;
