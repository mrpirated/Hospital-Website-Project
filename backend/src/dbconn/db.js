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
	connectionLimit: 10,
});
debug("mysql pool created");
pool.on("connection", function (connection) {
	//connection.query("SET SESSION auto_increment_increment=1");
	debug("database pool connected");
});
pool.on("enqueue", function () {
	debug("Waiting for available connection slot");
});
pool.on("release", function (connection) {
	debug("Connection %d released", connection.threadId);
});
pool.on("acquire", function (connection) {
	debug("Connection %d acquired", connection.threadId);
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
