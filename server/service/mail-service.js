const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transpoter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
        console.log(`${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}`)
    }

    async sendActivationMail(to, link) {
        await this.transpoter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Активация акавунта на ${process.env.API_URL}`,
            text: '',
            html:
                `
            <div>
                <h1>Для активации переходит по ссылке</h1>
                <a href="${link}">ТЫК</a>
            </div>
            `
        })
    }
}

module.exports = new MailService()