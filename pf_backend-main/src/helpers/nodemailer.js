const nodemailer = require("nodemailer");
const config = require("../config/index.js");

async function mailing(mail, subject, html) {
	let testAccount = await nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
		service: "gmail",
		port: 587,
		secure: false,
		auth: {
			user: config.MAIL_FROM,
			pass: config.MAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	let info = await transporter.sendMail({
		from: config.MAIL_FROM,
		to: (await mail) || config.MAIL_TO,
		subject: await subject,
		html: await html,
	});

	console.log(info);
}

module.exports = mailing;
