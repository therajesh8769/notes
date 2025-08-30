import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { OAuth2Client } from "google-auth-library";
import { OTPService } from '../services/OTPService';
import { EmailService } from '../services/EmailService';




// const client = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI // e.g. "http://localhost:5000/api/auth/google/callback"
// );
export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { name, dateOfBirth, email } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser.isVerified) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Generate OTP
      const otp = OTPService.generateOTP();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Create or update user
      let user;
      if (existingUser) {
        user = await User.findByIdAndUpdate(existingUser._id, {
          name,
          dateOfBirth: new Date(dateOfBirth),
          otp,
          otpExpires,
        }, { new: true });
      } else {
        user = new User({
          name,
          email,
          dateOfBirth: new Date(dateOfBirth),
          otp,
          otpExpires,
        });
        await user.save();
      }

      // Send OTP via email 
      await EmailService.sendOTP(email, otp);

      res.status(200).json({
        message: 'OTP sent successfully',
        email,
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp, name, dateOfBirth } = req.body;

      const user = await User.findOne({ email }).select('+otp +otpExpires');
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      if (!user.otp || user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      if (!user.otpExpires || user.otpExpires < new Date()) {
        return res.status(400).json({ message: 'OTP expired' });
      }

      // Update user as verified
      user.isVerified = true;
      user.name = name;
      user.dateOfBirth = new Date(dateOfBirth);
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      // Generate JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        message: 'Account verified successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        },
      });
    } catch (error) {
      console.error('OTP verification error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async requestLoginOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email, isVerified: true });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Generate OTP
      const otp = OTPService.generateOTP();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();

      // Send OTP via email 
      await EmailService.sendOTP(email, otp);

      res.status(200).json({
        message: 'OTP sent successfully',
        email,
      });
    } catch (error) {
      console.error('Login OTP error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({ email, isVerified: true }).select('+otp +otpExpires');
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      if (!user.otp || user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      if (!user.otpExpires || user.otpExpires < new Date()) {
        return res.status(400).json({ message: 'OTP expired' });
      }

      // Clear OTP
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      // Generate JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async googleAuth(req: Request, res: Response) {
    try {
      const redirectUrl = client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
          "openid",
          "profile",
          "email",
        ],
      });

      return res.redirect(redirectUrl);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Google Auth failed" });
    }
  }


  static async googleCallback(req: Request, res: Response) {
    try {
      const { code } = req.query;

      // Exchange code for tokens
      const { tokens } = await client.getToken(code as string);
      client.setCredentials(tokens);

      // Verify ID token
      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if (!payload) {
        return res.status(400).json({ message: "Invalid Google response" });
      }

      // Find or create user in DB
      let user = await User.findOne({ email: payload.email });
      if (!user) {
        user = await User.create({
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
        });
        const appToken = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET!,
          { expiresIn: "7d" }
        );
  
        // Redirect back to frontend with token (or set cookie)
        return res.redirect(
          `${process.env.FRONTEND_URL}/auth/success?token=${appToken}`
        );
      }
     } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Google Callback failed" });
      }
    
  }
}  