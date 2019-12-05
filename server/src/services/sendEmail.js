const nodemailer = require("nodemailer");
const Email = require('../models/email');

let transporter = null;

module.exports = async email => {
    try {
        await new Email(email).validateSync();
    
        if (!transporter) {
            const { user, pass } = await nodemailer.createTestAccount();
    
            transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false, 
              auth: { user, pass }
            });
        }
    
        return transporter.sendMail(email);

    } catch (error) {
        console.log("Error [sendEmail]: ", error);

        throw error;
    }
}