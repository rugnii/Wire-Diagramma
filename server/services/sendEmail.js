const config = require('../config')
const jwt = require('jsonwebtoken')

const sendInvitationEmail = async (recipient, name, token) => {

    let info = await config.transporter.sendMail({
        from: '"Nike" <'+process.env.EMAIL_ACCOUNT+'>', // sender address
        to: recipient, // list of receivers
        subject: "Nike database Invitation", // Subject line
        html: getText(token, name), // plain text body
      });
    
      console.log("Message sent: %s", info.messageId);
}
const getText = function(emailToken, name) {
    const url = `${process.env.FRONTEND_URL}/#/confirm/${emailToken}`
    let text = config.emailText.replace('[link]', `<a href="${url}">Link</a>`)
    text = text.replace('[name]', name)
    return text
}

module.exports = sendInvitationEmail