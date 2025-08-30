export class OTPService {
  static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static isValidOTP(otp: string): boolean {
    return /^\d{6}$/.test(otp);
  }
}