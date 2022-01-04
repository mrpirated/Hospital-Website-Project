import dotenv from "dotenv";
dotenv.config();
module.exports = {
	HOST_NAME: process.env.HOST_NAME,
	RDS_HOSTNAME: process.env.RDS_HOSTNAME,
	RDS_PORT: process.env.RDS_PORT,
	RDS_DB_NAME: process.env.RDS_DB_NAME,
	RDS_USERNAME: process.env.RDS_USERNAME,
	RDS_PASSWORD: process.env.RDS_PASSWORD,
	PORT: process.env.PORT,
	SALT_ROUNDS: process.env.SALT_ROUNDS,
	SECRET_KEY: process.env.SECRET_KEY,
	ZOOM_API_KEY: process.env.ZOOM_API_KEY,
	ZOOM_API_SECRET: process.env.ZOOM_API_SECRET,
	TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
	TWILIO_API_KEY: process.env.TWILIO_API_KEY,
	TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
	TWILIO_SERVICE_ID: process.env.TWILIO_SERVICE_ID,
	TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
	TWILIO_CHANNEL: process.env.TWILIO_CHANNEL,
};