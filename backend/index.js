import express from "express";
import cors from "cors";
import login from "./routes/login/login";
import login_doctor from "./routes/login/login_doctor";
import login_admin from "./routes/login/login_admin";
import signup from "./routes/signup/signup";
import signup_doctor from "./routes/signup/signup_doctor";
import signup_admin from "./routes/signup/signup_admin";
import token from "./routes/token";
import patient_case from "./routes/patient_case";
import patient_appointment from "./routes/patient_appointment";
import doctor_schedule from "./routes/doctor_schedule";

const PORT = process.env.PORT;
const { json } = express;
const app = express();

app.use(express.json());

app.use(cors());

app.use(json({ extended: false }));

app.use(
	"/api",
	login,
	login_doctor,
	login_admin,
	signup,
	signup_doctor,
	signup_admin,
	token,
	patient_case,
	patient_appointment,
	doctor_schedule
);

app.listen(PORT, () => {
	console.log("✨✨ Running on port " + PORT);
});
