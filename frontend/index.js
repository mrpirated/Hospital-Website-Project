const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5905, "0.0.0.0", (req, res) => {
	console.log("Frontend is Running");
});
