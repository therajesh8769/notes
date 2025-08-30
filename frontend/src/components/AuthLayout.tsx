import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-gray-900">HD</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
      <div className="auth-right">
        <div className="relative w-full h-full flex items-center justify-center">
          <img src='./right.png'
          
          />

        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-500/30 to-blue-700/40"></div>
      </div>
    </div>
  );
};