import { Router } from "express";
const router = Router();
import getProfilePic from "./getProfilePic";
import addAvailability from "./addAvailability";
import addQualification from "./addQualification";
import getDoctorQualification from "./getDoctorQualification";
import removeDoctorQualification from "./removeDoctorQualification";
import setDoctorAppointmentDuration from "./setDoctorAppointmentDuration";
import getDoctorAppointmentDuration from "./getDoctorAppointmentDuration";
import addSpecialization from "./addSpecialization";
import getDoctorSpecialization from "./getDoctorSpecialization";
import removeDoctorSpecialization from "./removeDoctorSpecialization";
router.use(
	"/admin",
	getProfilePic,
	addAvailability,
	addQualification,
	getDoctorQualification,
	removeDoctorQualification,
	setDoctorAppointmentDuration,
	getDoctorAppointmentDuration,
	addSpecialization,
	getDoctorSpecialization,
	removeDoctorSpecialization
);

export default router;
