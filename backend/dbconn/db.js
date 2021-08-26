import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql";

const connection = mysql.createConnection({
	host: process.env.RDS_HOSTNAME,
	user: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD,
	port: process.env.RDS_PORT,
	database: "hmp",
});

connection.connect(function (err) {
	if (err) {
		console.error("Database connection failed: " + err.stack);
		return;
	}

	console.log("Connected to database.");
});

export default connection;
