const nodemailer = require("nodemailer");
module.exports = {
    userRoles : [
        'admin',
        'insider',
        'editor',
        'viewer'
    ],
    transporter : nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ACCOUNT, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD // generated ethereal password
        }
    }),
    emailText : '<h1>Dear [name] </h1> <div> You were invited to use the databasetool of the Nike repair project. <br> Please klick on the link below to create your user accout. <br> [link]</div>'
}