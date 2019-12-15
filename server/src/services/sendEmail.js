const nodemailer = require("nodemailer");

let transporter = null;

module.exports = async email => {
    try {
        if (!transporter) {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_SENDER,
                    pass: process.env.EMAIL_SENDER_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
        }
        
        await transporter.sendMail({
            to: email.to,
            from: email.from,
            subject: email.subject,
            html: email.html,
        });

        email.sended = 1;
        email.lastModifiedAt = new Date().toISOString();
        return email.save();

    } catch (error) {
        throw error;
    }
}