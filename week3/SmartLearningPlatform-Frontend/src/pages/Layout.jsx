import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Layout = () => {
    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-100">
                <Outlet /> 
            </main>
        </div>
    );
};

export default Layout;
