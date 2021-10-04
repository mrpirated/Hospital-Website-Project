import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql";

const connection = mysql.createConnection({
	host: process.env.RDS_HOSTNAME,
	user: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD,
	port: process.env.RDS_PORT,
	database: "hmp",
	// host: 'localhost', // host for connection
	// port: 3306, // default port for mysql is 3306
	// database: 'hmp', // database from which we want to connect out node application
	// user: 'root', // username of the mysql connection
	// password: process.env.PASSWORD // password of the mysql connection
});

connection.connect(function (err) {
	if (err) {
		console.error("Database connection failed: " + err.stack);
		return;
	}

	console.log("Connected to database.");
});

export default connection;
