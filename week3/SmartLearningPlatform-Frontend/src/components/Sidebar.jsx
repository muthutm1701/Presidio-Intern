import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../contexts/authContext';
import { User, BarChart2, LogOut } from 'lucide-react';

const Sidebar = () => {

    const { user, logout } = useAuth();

    const navLinks = {
        student: [
            { to: '/student-dashboard', text: 'My Profile', icon: User },
        ],
        teacher: [
            { to: '/teacher-dashboard', text: 'Students', icon: User },
        ],
        admin: [
            { to: '/admin-dashboard', text: 'Analytics', icon: BarChart2 },
        ],
    };

    const links = user ? navLinks[user.role] : [];

    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-2xl font-bold">SLP Portal</div>
            <nav className="flex-1 p-4 space-y-2">
            
                {links.map((link) => (
                    <NavLink key={link.to} to={link.to}  >
                        <link.icon className="w-5 h-5 mr-3" />
                        {link.text}
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
              
                <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-2 rounded-lg hover:bg-red-500"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

