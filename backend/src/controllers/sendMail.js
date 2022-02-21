import dbg from "debug";
const debug = dbg("controller:sendMail");
import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, text }) => {
	const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: "tracy.brown12@ethereal.email", // generated ethereal user
			pass: "SV7G98Qwc69sEgWRqE", // generated ethereal password
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
		});
	//debug("Message sent: %s", info.messageId);
	//debug("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
export default sendMail;
