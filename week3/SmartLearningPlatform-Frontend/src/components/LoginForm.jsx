import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { userServiceAPI } from '../utils/api';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        try {
            const response = await userServiceAPI.post('/auth/login', formData);
            const { user, accessToken } = response.data;
            
            login(user, accessToken);
            toast.success('Logged in successfully!');
            switch (user.role) {
                case 'teacher':
                    navigate('/teacher-dashboard');
                    break;
                case 'student':
                    navigate('/student-dashboard');
                    break;
                case 'admin':
                    navigate('/admin-dashboard');
                    break;
                default:
                    navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register('password')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="mt-2 text-sm text-red-600">{errors.password?.message}</p>
            </div>
            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
