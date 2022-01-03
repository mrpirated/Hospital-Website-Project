import express from "express";
import cors from "cors";
import admin from "./routes/admin/admin";
import patient from "./routes/patient/patient";
import doctor from "./routes/doctor/doctor";
import zoommeeting from "./routes/admin/zoommeeting";
import login from "./routes/login";
import signup from "./routes/signup";
import setAvailability from "./routes/setAvailability";
import getPatientCases from "./routes/getPatientCases";
import getDoctors from "./routes/getDoctors";
import newAppointment from "./routes/newAppointment";
import newCase from "./routes/newCase";
import fs from "fs";
import path from "path";
import https from "https";
import dbg from "debug";
const debug = dbg("http");
// import login_doctor from "./routes/login/login_doctor";
const options = {
	key: fs.readFileSync(path.resolve("src/key.pem")),
	cert: fs.readFileSync(path.resolve("src/cert.pem")),
};
// import signup from "./routes/signup/signup";
// import signup_doctor from "./routes/signup/signup_doctor";
// import signup_admin from "./routes/signup/signup_admin";
import token from "./routes/token";

// import patient_case from "./routes/patient_case";
// import patient_appointment from "./routes/patient_appointment";
// import doctor_schedule from "./routes/doctor_schedule";

const PORT = process.env.PORT;
const HOST_NAME = process.env.HOST_NAME;
const { json } = express;
const app = express();

app.use(express.json());

app.use(cors());

app.use(json({ extended: false }));

app.use(
	"/api",
	patient,
	doctor,
	admin,
	token,
	zoommeeting,
	login,
	signup,
	setAvailability,
	getPatientCases,
	getDoctors,
	newAppointment,
	newCase
);
app.use("/", (req, res) => {
	res.send("Server is Running");
});
const server = https.createServer(options, app);
app.listen(PORT, HOST_NAME, () => {
	debug(`✨✨ Server running at http://${HOST_NAME}:${PORT}:`);
});
