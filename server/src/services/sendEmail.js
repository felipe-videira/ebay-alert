const nodemailer = require("nodemailer");
const Email = require('../models/email');

let transporter = null;

module.exports = async email => {
    try {
        new Email(email).validateSync()
    
        if (!transporter) {
            const { user, pass } = await nodemailer.createTestAccount();
    
            transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false, 
              auth: { user, pass }
            });
        }
    
        return transporter.sendMail({
            to: email.to,
            from: email.from,
            subject: email.subject,
            html: email.html,
        });

    } catch (error) {
        console.log("[sendEmail] error:", error);

        throw error;
    }
}