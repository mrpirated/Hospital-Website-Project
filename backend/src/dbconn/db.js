import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql";
import dbg from "debug";
const debug = dbg("database");
const pool = mysql.createPool({
	host: process.env.RDS_HOSTNAME,
	user: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD,
	port: process.env.RDS_PORT,
	database: process.env.RDS_DB_NAME,
});

// connection.connect(function (err) {
// 	if (err) {
// 		debug("Database connection failed: " + err.stack);
// 		return;
// 	}

// 	debug("Connected to database.");
// });
const usePoolConnection = async (actionAsync) => {
	const connection = await new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				debug(err);
				reject(err);
			} else resolve(connection);
		});
	});
	try {
		return await actionAsync(connection);
	} finally {
		connection.release();
	}
};
export default pool;
