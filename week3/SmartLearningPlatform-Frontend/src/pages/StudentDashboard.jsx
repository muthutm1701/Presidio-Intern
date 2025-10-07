import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/authContext';
import { userServiceAPI, courseServiceAPI } from '../utils/api';
import { BookOpen, Mail, User, ShieldCheck } from 'lucide-react';

const StudentDashboard = () => {

    const { user } = useAuth();

 
    const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['userProfile', user?.id],
        queryFn: async () => {
            const { data } = await userServiceAPI.get(`/api/users/me`);
            return data;
        },
        enabled: !!user,
    });

    const { data: enrolledCourses, isLoading: isLoadingCourses, isError } = useQuery({
        queryKey: ['myCourses', user?.id],
        queryFn: async () => {
            const { data } = await courseServiceAPI.get('/courses/my-courses');
            return data;
        },
        enabled: !!user,
    });
    if (isLoadingProfile) {
        return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800">My Dashboard</h1>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center space-x-6">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-4">
                        <User size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold capitalize">{userProfile?.username}</h2>
                        <p className="text-gray-600 flex items-center mt-1">
                            <Mail size={16} className="mr-2" />
                            {userProfile?.email}
                        </p>
                        <p className="text-gray-500 flex items-center mt-2 text-sm bg-gray-100 px-3 py-1 rounded-full w-fit">
                            <ShieldCheck size={16} className="mr-2 text-green-500" />
                            Role: <span className="font-semibold ml-1 capitalize">{userProfile?.role}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">My Enrolled Courses</h2>
                {isLoadingCourses ? (
                    <div className="text-center py-10">Loading courses...</div>
                ) : isError ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> Could not fetch enrolled courses.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrolledCourses && enrolledCourses.length > 0 ? (
                            enrolledCourses.map(course => (
                                <div key={course._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200">
                                    <div className="flex items-center mb-3">
                                        <BookOpen className="text-blue-500 mr-3" />
                                        <h3 className="text-xl font-semibold text-gray-700">{course.title}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4 text-sm line-clamp-3 h-16">{course.description}</p>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {course.category}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full">You are not enrolled in any courses yet. Go to "Browse Courses" to find one!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;

