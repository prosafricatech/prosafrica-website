const transporter = require("../config/mailer")
const ejs = require('ejs')
const path = require("path")

// Resolved from the working directory, not __dirname.
//
// This module is bundled into the Next route handler, where __dirname is the
// bundle's own location ("C:\ROOT") rather than this folder — so the old
// path.join(__dirname, '../views/emails/...') produced a path that does not
// exist and every send failed with ENOENT before reaching SMTP. Both `next`
// and the legacy Express app run from the repository root, so cwd is correct
// for both.
const emailTemplate = (name) =>
    path.join(process.cwd(), 'views', 'emails', name);

const sendInquiryEmail = (data) => {
    return new Promise((resolve, reject) => {
        const templatePath = emailTemplate('inquiryEmail.ejs');

        ejs.renderFile(templatePath, data, (err, html) => {
            if (err) return reject(err);

            const mailOptions = {
                from: 'landing@proserp.co.tz',
                to: 'Info@prosafrica.co.tz',
                subject: `New Inquiry from ${data.organization}`,
                html: html,
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) return reject(err);
                resolve(info);
            });
        });
    });
};

const sendQuestionEmail = (data) => {
    return new Promise((resolve, reject) => {
        const templatePath = emailTemplate('questionEmail.ejs');

        ejs.renderFile(templatePath, data, (err, html) => {
            if (err) return reject(err);

            const mailOptions = {
                from: 'landing@proserp.co.tz',
                to: 'Info@prosafrica.co.tz',
                subject: `New question from ${data.email}`,
                html: html,
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) return reject(err);
                resolve(info);
            });
        });
    });
};

module.exports = { sendInquiryEmail, sendQuestionEmail };