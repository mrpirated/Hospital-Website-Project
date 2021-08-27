import express from "express";
import cors from "cors";
import login from "./routes/login/login";
import connection from "./dbconn/db";
const PORT = process.env.PORT;
const { json } = express;
const app = express();
app.use(express.json());

app.use(cors());
app.use(json({ extended: false }));
app.use("/", login);
app.listen(PORT, () => {
	console.log("✨✨ Running on port " + PORT);
});
