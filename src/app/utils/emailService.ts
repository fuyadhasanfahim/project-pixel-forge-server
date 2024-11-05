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
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto;">
                <h2 style="color: #333;">Verify Your Email Address</h2>
                <p style="color: #555;">Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
                <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p style="margin-top: 20px; color: #777;">If you did not create an account, you can safely ignore this email.</p>
                <footer style="margin-top: 30px; font-size: 12px; color: #999;">
                    <p>Best Regards,</p>
                    <p>Your Company Name</p>
                </footer>
            </div>
        `,
    }

    await transporter.sendMail(mailOptions)
}
