import dbg from "debug";
const debug = dbg("controller:sendMail");
import config from "../config";
import nodemailer from "nodemailer";
const sendMail = async ({ to, subject, text }) => {
	var smtpConfig = {
		host: config.WEBMAIL_HOST,
		port: 465,
		secure: true,
		// logger: true,
		// debug: true,
		auth: {
			user: config.WEBMAIL_USER,
			pass: config.WEBMAIL_PASSWORD,
		},
		tls: {
			rejectUnAuthorized: false,
		},
	};
	const transporter = nodemailer.createTransport(smtpConfig);
	debug(transporter);
	transporter.verify((err, success) => {
		if (err) debug(err);
		else debug("Your config is correct", success);
	});
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
