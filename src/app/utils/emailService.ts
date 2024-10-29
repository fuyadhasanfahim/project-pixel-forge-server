import nodemailer from 'nodemailer'
import config from '../config'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: config.email,
        pass: config.password,
    },
})

export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${config.base_url}/verify-email?token=${token}`

    const mailOptions = {
        from: config.email,
        to: email,
        subject: 'Verify Your Email Address',
        html: `<p>Click the link below to verify your email:</p>
               <a href="${verificationUrl}">Verify Email</a>`,
    }

    await transporter.sendMail(mailOptions)
}
