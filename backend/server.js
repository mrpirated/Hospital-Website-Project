import express from "express";
import cors from "cors";

import connectDB from "./dbconn/db.js";
const PORT = process.env.PORT;
const { json } = express;
const app = express();
app.use(express.json());

connectDB();

app.use(cors());
app.use(json({ extended: false }));

app.listen(3258, () => {
	console.log("Go!");
});
