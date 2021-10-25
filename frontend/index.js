require("dotenv");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT;
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, "0.0.0.0", (req, res) => {
	console.log("Frontend is Running");
});
