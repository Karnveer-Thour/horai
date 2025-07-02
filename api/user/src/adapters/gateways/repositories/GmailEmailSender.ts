import { injectable } from 'inversify';
import { EmailSender } from '../../../usecases/servicer/EmailSender';
import { emailProviderConnectionHolder } from '../../../infrastructures/config/IoC/inversify.config';

@injectable()
export class GmailEmailSender implements EmailSender {
    async send(toEmail: string, subject: string, body: string, isHtml: boolean = false): Promise<void> {
        emailProviderConnectionHolder.initialize();
        const transporter = emailProviderConnectionHolder.getInstance();
        const emaiBody = isHtml ? { html: body } : { text: body };
        try {
            console.log(`Email: ${toEmail}, subject: ${subject}.`);
            await transporter.verify();
            await transporter.sendMail({
                from: `Horai予約サポートチーム <${emailProviderConnectionHolder.getSenderGmailAddress()}>`,
                to: toEmail,
                subject,
                ...emaiBody,
            });
        } catch (e) {
            console.log(`failed to send mail. to: ${toEmail}, subject: ${subject}, body: ${body}`);
            console.log(e);
        }
    }
}
