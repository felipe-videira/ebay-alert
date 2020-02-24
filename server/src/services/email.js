const Email = require('../models/email');
const nodemailer = require("nodemailer");
const { getOne, save, updateOne } = require('./db');

let transporter = null;

module.exports = {
    getTemplate: (db, type) => {
        return getOne(db, 'emailTemplates', { type }, { subject: 1, html: 1 });
    },
    schedule: (db, subject, html, to, frequency) => {
        return save(db, Email, { 
            subject,
            html,
            to,
            from: process.env.EMAIL_SENDER,
            frequency: frequency.value
        });
    },
    send: async (db, email) => {
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
        return updateOne(db, email);
    }
}