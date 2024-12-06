import { transporter } from "../config/nodemailer"
import { token } from 'morgan';

interface IEmail {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfimationEmail = async (user: IEmail) => {
        await transporter.sendMail({
            from: 'TaskManager <team@taskmanager.com>',
            to: user.email,
            subject: 'TaskManager - confirm your account',
            text: 'TaskManager - Please, confirm your account to proceed',
            html: `
                <p>Hello ${user.name}, Everything is almost ready, you just need to confirm your account.</p>
                <p>Visit the next link:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirm account</a>
                <p>Enter the token: <b>${user.token}</b> </p>
                <p>This token expires in 5 minutes</p>
                `
        })
    }

    static sendPasswordResetToken = async (user: IEmail) => {
        await transporter.sendMail({
            from: 'TaskManager <team@taskmanager.com>',
            to: user.email,
            subject: 'TaskManager - Reset password',
            text: 'TaskManager - Reset password',
            html: `
                <p>Hello ${user.name}, you have requested to reset your password.</p>
                <p>Visit the next link:</p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Reset password</a>
                <p>Enter the token: <b>${user.token}</b> </p>
                <p>This token expires in 5 minutes</p>
                `
        })
    }
}