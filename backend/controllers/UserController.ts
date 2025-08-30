import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';

export class UserController {
  static async getMe(req: AuthRequest, res: Response) {
    try {
      const user = req.user!;
      
      res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        },
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}