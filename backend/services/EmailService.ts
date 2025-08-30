// export class EmailService {
//   static async sendOTP(email: string, otp: string): Promise<void> {
//     // In a real application, you would use a service like SendGrid, Mailgun, or AWS SES
//     console.log(`📧 Sending OTP to ${email}: ${otp}`);
    
//     // Simulate email sending delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     console.log(`✅ OTP sent successfully to ${email}`);
//   }

//   static async sendWelcomeEmail(email: string, name: string): Promise<void> {
//     console.log(`📧 Sending welcome email to ${name} (${email})`);
    
//     // Simulate email sending delay
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     console.log(`✅ Welcome email sent successfully to ${email}`);
//   }
// }
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()
export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  

  static async sendOTP(email: string, otp: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"HD" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      });
      
    } catch (error) {
      
      throw error;
    }
  }

  static async sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"MyApp Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to MyApp 🎉",
        html: `
          <h2>Welcome, ${name}!</h2>
          <p>We’re thrilled to have you onboard. Start exploring our app now.</p>
          <p>Cheers,<br/>MyApp Team</p>
        `,
      });
      console.log(`✅ Welcome email sent successfully to ${email}`);
    } catch (error) {
      console.error("❌ Failed to send Welcome email:", error);
      throw error;
    }
  }
}
