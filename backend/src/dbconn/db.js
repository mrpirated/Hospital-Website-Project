import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql";
import dbg from "debug";
const debug = dbg("database");
const connection = mysql.createConnection({
	host: process.env.RDS_HOSTNAME,
	user: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD,
	port: process.env.RDS_PORT,
	database: "hmp",
});

connection.connect(function (err) {
	if (err) {
		debug("Database connection failed: " + err.stack);
		return;
	}

	debug("Connected to database.");
});

export default connection;
