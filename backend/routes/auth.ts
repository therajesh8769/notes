import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/verify-otp', AuthController.verifyOTP);
router.post('/request-login-otp', AuthController.requestLoginOTP);
router.post('/login', AuthController.login);
router.get('/google', AuthController.googleAuth);
router.get('/google/callback', AuthController.googleCallback);

export default router;