import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authAPI.signup(formData);
      localStorage.setItem('signupData', JSON.stringify(formData));
      toast.success('OTP sent to your email!');
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };
  // const handleGoogleSuccess = async (credentialResponse: any) => {
  //   if (!credentialResponse.credential) {
  //     toast.error("Google login failed");
  //     return;
  //   }

  //   try {
  //     // Decode Google token (optional: for extracting name/email directly)
  //     const userInfo: any = jwt_decode(credentialResponse.credential);

  //     // Send ID token to backend for verification & signup
  //     await authAPI.googleSignup({ token: credentialResponse.credential });

  //     toast.success("Signed up with Google!");
  //     navigate("/dashboard"); // Or wherever you redirect
  //   } catch (err: any) {
  //     toast.error("Google signup failed");
  //   }
  // };

  return (
    <AuthLayout>
      <div className="form-card">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign up</h1>
          <p className="text-gray-600">Sign up to enjoy the feature of HD</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jonas Khanwald"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="input-field pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jonas_kahnwald@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending OTP...' : 'Get OTP'}
          </button>
        </form>
        {/* Google Button */}
        {/* <div className="flex justify-center">
          <button
            type="button"
            className="btn-google border-1 border-gray-300"
            onClick={() => (window.location.href = "http://localhost:5001/api/auth/google")}
          >
            Continue with Google
          </button>

        </div> */}
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

export default SignUp;