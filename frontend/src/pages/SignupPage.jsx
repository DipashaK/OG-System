import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  // Validation function that runs on each input change
  const handleValidation = (field, value) => {
    let error = '';
    switch (field) {
      case 'firstName':
        if (!/^[A-Za-z]+$/.test(value) || value.trim() === '') {
          error = 'First name should only contain alphabets and cannot be empty.';
        }
        break;
      case 'lastName':
        if (!/^[A-Za-z]+$/.test(value) || value.trim() === '') {
          error = 'Last name should only contain alphabets and cannot be empty.';
        }
        break;
      case 'emailId':
        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
          error = 'Email must be a valid Gmail address.';
        }
        break;
      case 'password':
        if (!/(?=.*[!@#$%^&])[A-Za-z0-9!@#$%^&*]{8,}/.test(value)) {
          error = 'Password must be at least 8 characters long and include a special character.';
        }
        break;
      default:
        break;
    }
    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset errors
    setFormErrors({
      firstName: '',
      lastName: '',
      emailId: '',
      password: ''
    });

    const errors = {};
    if (!/^[A-Za-z]+$/.test(firstName) || firstName.trim() === '') {
      errors.firstName = 'First name should only contain alphabets and cannot be empty.';
    }
    if (!/^[A-Za-z]+$/.test(lastName) || lastName.trim() === '') {
      errors.lastName = 'Last name should only contain alphabets and cannot be empty.';
    }
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailId)) {
      errors.emailId = 'Email must be a valid Gmail address.';
    }
    if (!/(?=.*[!@#$%^&])[A-Za-z0-9!@#$%^&*]{8,}/.test(password)) {
      errors.password = 'Password must be at least 8 characters long and include a special character.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const userData = { firstName, lastName, phoneNumber, emailId, password };
    try {
      const response = await axios.post('http://localhost:5000/signup', userData);
      console.log(response.data);
      toast.success('Sign Up successful! Redirecting to login...');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setEmailId('');
      setPassword('');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong.');
      } else if (error.request) {
        setError('No response from server.');
      } else {
        setError('Error in form submission.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-lg mb-3">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-3">Create Your Account</h2>
        {error && <p className="text-sm text-red-500 text-center mb-3">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 text-left mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                handleValidation('firstName', e.target.value);
              }}
              placeholder="First name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            {formErrors.firstName && (
              <p className="text-sm text-red-500 mt-1">{formErrors.firstName}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 text-left mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                handleValidation('lastName', e.target.value);
              }}
              placeholder="Last name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            {formErrors.lastName && (
              <p className="text-sm text-red-500 mt-1">{formErrors.lastName}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 text-left mb-1">Email Address</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
                handleValidation('emailId', e.target.value);
              }}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            {formErrors.emailId && (
              <p className="text-sm text-red-500 mt-1">{formErrors.emailId}</p>
            )}
          </div>
          <div className="mb-3 relative">
            <label className="block text-sm font-semibold text-gray-700 text-left mb-1">Password</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleValidation('password', e.target.value);
              }}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            {formErrors.password && (
              <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>
            )}
            <div
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-2/3 transform -translate-y-1/2 cursor-pointer"
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible size={20} color="black" />
              ) : (
                <AiOutlineEye size={20} color="black" />
              )}
            </div>
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline font-medium">
            Log In
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;