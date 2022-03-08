import dbg from "debug";
const debug = dbg("controller:sendMail");
import config from "../config";
import nodemailer from "nodemailer";
const sendMail = async ({ to, subject, text }) => {
	const transporter = nodemailer.createTransport({
		host: config.WEBMAIL_HOST,
		port: config.WEBMAIL_PORT,
		secure: true,
		auth: {
			user: config.WEBMAIL_USER,
			pass: config.WEBMAIL_PASSWORD,
		},
	});
	//debug(transporter);
	return await transporter
		.sendMail({
			from: '"PeriwalManavSeva " <support@periwalmanavseva.com>',
			to: to,
			subject: subject,
			text: text,
		})
		.then((response) => {
			debug(response);
			return response;
		})
		.catch((err) => debug(err));
	//debug("Message sent: %s", info.messageId);
	//debug("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
export default sendMail;
