import dbg from "debug";
const debug = dbg("controller:sendMail");
import nodemailer from "nodemailer";

const sendMail = async () => {
	const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});
	const info = await transporter.sendMail({
		from: '"Ayurveda " <support@periwalmanavseva.com>',
		to: "deepeshrathi9@gmail.com",
		subject: "Test Mail",
		text: "Temp text",
		html: "<b>Hello world?</b>",
	});
	debug("Message sent: %s", info.messageId);
	debug("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
export default sendMail;
