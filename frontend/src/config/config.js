import dotenv from "dotenv";
dotenv.config();

console.log(process.env);
const config = {
	baseUrl: process.env.REACT_APP_BASE_URL,
	token: "/api/token",
	doctor: "/api/doctor",
	patient: "/api/patient",
	admin: "/api/admin",
	login: "/api/login",
	getSpecialization: "/api/getSpecialization",
	getDoctors: "/api/getDoctors",
	signup: "/api/signup",
	remaining_appointment: "/remaining_appointment",
	getPatientCases: "/api/getPatientCases",
	getPatientAppointments: "/api/getPatientAppointments",
	newCase: "/api/newCase",
	newAppointment: "/api/newAppointment",
	schedule: "/schedule",
	appointment: "/appointment",
	allappointments: "/allappointments",
	setAvailability: "/api/setAvailability",
	doctor_details: "/doctor_details",
	meeting: "/newmeeting",
	video_token: "/api/video/token",
	add_doctor: "/add_doctor",
	verify: "/verify",
	DOCTOR: "doctor",
	PATIENT: "patient",
	ADMIN: "admin",
	profilePicUpload: "/api/profilePicUpload",
	getScheduledAppointments: "/api/getScheduledAppointments",
	getProfilePic: "/api/getProfilePic",
};
export default config;
