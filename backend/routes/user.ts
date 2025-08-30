import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/me', authMiddleware as any, UserController.getMe);

export default router;