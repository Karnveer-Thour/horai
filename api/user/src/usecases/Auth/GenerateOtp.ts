import { generateOTP } from '../utils/OTPUtils';
import { EmailSender } from '../servicer/EmailSender';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructures/config/IoC/type';

@injectable()
export class GenerateOtp {
    emailSender: EmailSender;
    constructor(
        @inject(TYPES.SERVICER.EmailSender)
        emailSender: EmailSender,
    ) {
        this.emailSender = emailSender;
    }

    public execute = async (email: string): Promise<string> => {
        const { hash, otp } = generateOTP(email);
        await this.emailSender.send(
            email,
            `Horaiからセキュリティコードをお送りします`,
            `Eメールアドレスの確認のため、以下のセキュリティコードを入力してください：
            <br>
            <h3>${otp}</h3>
            <br>
            このOTPは誰とも共有しないでください。当社のカスタマーサービスチームからは、パスワード、OTP、クレジットカード、銀行情報を求めることはありません。`,
            true,
        );
        return hash;
    };
}
