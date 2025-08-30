// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { User, IUser } from '../models/User';

// export interface AuthRequest extends Request {
//   user?: IUser;
// }

// export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid token.' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token.' });
//   }
// };
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Decode the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
console.log(process.env.JWT_SECRET);
    // Use `.lean<IUser>()` so that the result is a plain IUser object
    const user = await User.findById(decoded.userId).lean<IUser>();

    if (!user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};
