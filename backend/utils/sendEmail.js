const nodemailer = require('nodemailer')

const sendMail = async(options) => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_AUTH_USER,
            pass: process.env.SMTP_AUTH_PASSWORD,
        },
    })

    const message = {
        from: 'LaLaPacha@server.com',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    }
    await transport.sendMail(message)
}

module.exports = sendMail