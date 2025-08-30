import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import { authAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailFromState = location.state?.email;
    const signupData = localStorage.getItem('signupData');
    
    if (emailFromState) {
      setEmail(emailFromState);
    } else if (signupData) {
      const data = JSON.parse(signupData);
      setEmail(data.email);
    } else {
      navigate('/signup');
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const signupData = localStorage.getItem('signupData');
      if (!signupData) {
        throw new Error('Signup data not found');
      }

      const data = JSON.parse(signupData);
      const response = await authAPI.verifyOTP({ ...data, otp });
      
      login(response.token, response.user);
      localStorage.removeItem('signupData');
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const signupData = localStorage.getItem('signupData');
      if (!signupData) return;
      
      const data = JSON.parse(signupData);
      await authAPI.signup(data);
      toast.success('OTP resent successfully!');
    } catch (error: any) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <AuthLayout>
      <div className="form-card">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign up</h1>
          <p className="text-gray-600">Enter the OTP sent to {email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <div className="relative">
              <input
                id="otp"
                name="otp"
                type={showOtp ? 'text' : 'password'}
                required
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input-field pr-10"
                maxLength={6}
              />
              <button
                type="button"
                onClick={() => setShowOtp(!showOtp)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showOtp ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Sign up'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={handleResendOTP}
            className="text-sm text-primary-500 hover:text-primary-600"
          >
            Resend OTP
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary-500 hover:text-primary-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default OTPVerification;