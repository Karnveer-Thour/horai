export interface EmailSender {
    send(toEmail: string, subject: string, body: string, isHtml?: boolean): Promise<void>;
}
