const nodeMailer = require('nodemailer');
const asyncHandler = require('express-async-handler');


const sendEmail = asyncHandler(async (data, req, res) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MP,
        },
    });
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@gmail.com>',
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html,
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));
});

module.exports = sendEmail;