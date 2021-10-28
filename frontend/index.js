require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const https = require("https");
const PORT = process.env.PORT;
const HOST_NAME = process.env.HOST_NAME;
app.use(express.static(path.join(__dirname, "build")));

const options = {
	key: fs.readFileSync(path.resolve("key.pem")),
	cert: fs.readFileSync(path.resolve("cert.pem")),
};

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
const server = https.createServer(options, app);
server.listen(PORT, "0.0.0.0", (req, res) => {
	console.log(`Frontend is Running at https://${HOST_NAME}:${PORT}:`);
});
