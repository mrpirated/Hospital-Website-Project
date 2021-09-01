import express from "express";
import cors from "cors";
import login from "./routes/login/login";
import login_doctor from "./routes/login/login_doctor";
import signup from "./routes/signup/signup";
import signup_doctor from "./routes/signup/signup_doctor";
import connection from "./dbconn/db";
const PORT = process.env.PORT;
const { json } = express;
const app = express();
app.use(express.json());
app.use(cors());
app.use(json({ extended: false }));
app.use("/api", login, signup, signup_doctor, login_doctor);
app.listen(PORT, () => {
	console.log("✨✨ Running on port " + PORT);
});
