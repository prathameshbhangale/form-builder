import React, { useState } from 'react';
import HiglightText from '../components/common/helpers/HiglightText';
import { loginApi } from '../apis/auth/login';
import { setUserData } from '../slices/user';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await loginApi(formData);

      if (response) {
          // Dispatch the action to update user state
          dispatch(
              setUserData({
                  userId: response.userId,
                  name: response.name || "",
                  email: response.email || "",
                  token: response.token || "",
              })
          );
          console.log(response.token)
          navigate('/')
      }else{
        setError('Invalid email or password');
      }
    }

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/src/assets/dark-theme-background.jpg)' }}>
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-lg"></div>

      {/* Centered Login Block */}
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <HiglightText text="Log In"></HiglightText>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
