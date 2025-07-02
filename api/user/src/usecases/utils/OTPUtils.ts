const otpGen = require('otp-generator');
const otpTool = require('otp-without-db');
const secret = process.env.HORAI_INTERNAL_HEADER_SECRET_KEY;
const otpExpiry = 5; //Set OTP expiry to 5 mins

export const generateOTP = (emailOrPhone: string) => {
    const otp = otpGen.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
    });
    const hash = otpTool.createNewOTP(emailOrPhone, otp, secret, otpExpiry);
    return { hash, otp };
};

export const verifyOTP = (emailOrPhone: string, otp: string, hash: string): Boolean => {
    return otpTool.verifyOTP(emailOrPhone, otp, hash, secret);
};
