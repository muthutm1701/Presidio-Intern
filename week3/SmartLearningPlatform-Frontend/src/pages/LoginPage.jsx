import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Sign In
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Welcome to the Smart Learning Platform
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
