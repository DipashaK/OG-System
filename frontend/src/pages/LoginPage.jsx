import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const saveToken = (token) => localStorage.setItem('auth_token', token);
const getToken = () => localStorage.getItem('auth_token');
const removeToken = () => localStorage.removeItem('auth_token');

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { emailId, password };
    setError('');
    setEmailError('');
    setPasswordError('');

    // Basic validations
    if (!emailId.includes('@gmail.com')) {
      setEmailError('Email must be a Gmail address.');
      return;
    }

    const emailLocalPart = emailId.split('@')[0];
    if (!/[a-zA-Z]/.test(emailLocalPart) || /^\d+$/.test(emailLocalPart)) {
      setEmailError('Email must contain at least one letter before the "@".');
      return;
    }

    if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain a special character.'
      );
      return;
    }

    try {
      setLoading(true); // Show loading indicator
      const response = await axios.post('http://localhost:5000/login', userData);
      console.log('Login successful, received token:', response.data.token);

      // Save the JWT token
      saveToken(response.data.token);

      // Store email in local storage
      localStorage.setItem('userEmail', emailId);

      const token = getToken();
      if (!token) {
        setError('Token not found, please login again.');
        setLoading(false);
        return;
      }

      try {
        const donorResponse = await axios.get('http://localhost:5000/api/donor', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Donor response:', donorResponse);

        // Redirect logic based on email
        if (emailId === 'dipashak0505@gmail.com') {
          navigate('/overview');
        } else {
          navigate('/donor-receiver');
        }
      } catch (error) {
        console.error('Error fetching donor data:', error);
        setError('Failed to fetch donor data.');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || 'Invalid credentials.');
      } else if (error.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg sm:w-full sm:p-4">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Login to Your Account
        </h2>
        {error && (
          <p className="text-sm text-red-500 text-center mb-3">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            {emailError && (
              <p className="text-xs text-red-500 mt-1">{emailError}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            <div
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible size={20} color="black" />
              ) : (
                <AiOutlineEye size={20} color="black" />
              )}
            </div>
            {passwordError && (
              <p className="text-xs text-red-500 mt-1">{passwordError}</p>
            )}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;