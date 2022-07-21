import nodemailer from 'nodemailer';

import { API_URL, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from '../constants';


class MailService {
    transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD
            }
        });
    }

    async sendConfirmMail(email: string, link: string) {
        await this.transporter.sendMail({
            from: SMTP_USER,
            to: email,
            subject: 'Verify account via link: ' + API_URL,
            text: '',
            html:
                `<div>
                    <h1>Follow the link to confirm your account</h1>
                    <a href="${link}">${link}</a>    
                </div>
                `
        })
    }
}

export default new MailService();