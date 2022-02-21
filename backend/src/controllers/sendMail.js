import dbg from "debug";
const debug = dbg("controller:sendMail");
import config from "../config";
import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, text }) => {
	const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: config.WEB_MAIL_HOST,
		port: config.WEB_MAIL_PORT,
		auth: {
			user: config.WEB_MAIL_USER,
			pass: config.WEB_MAIL_PASSWORD,
		},
	});
	const info = await transporter
		.sendMail({
			from: '"Ayurveda " <support@periwalmanavseva.com>',
			to: to,
			subject: subject,
			text: text,
		})
		.then((response) => {
			debug(response);
		})
		.catch((err) => debug(err));
	//debug("Message sent: %s", info.messageId);
	//debug("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
export default sendMail;
