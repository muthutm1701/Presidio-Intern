import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseServiceAPI } from '../utils/api';
import { toast } from 'react-hot-toast';
import { Edit, Trash2, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

const StudentTable = ({ onEdit }) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['students', page, searchTerm],
        queryFn: () => courseServiceAPI.get(`/students?page=${page}&limit=5&search=${searchTerm}`).then(res => res.data),
        keepPreviousData: true, 
    });
    const deleteMutation = useMutation({
        mutationFn: (studentId) => courseServiceAPI.delete(`/students/${studentId}`),
        onSuccess: () => {
            toast.success("Student deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ['students'] });
            setIsDeleteModalOpen(false);
            setStudentToDelete(null);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to delete student.");
        },
    });

    const handleDeleteClick = (student) => {
        setStudentToDelete(student);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (studentToDelete) {
            deleteMutation.mutate(studentToDelete._id);
        }
    };

    if (isLoading) return <div className="text-center p-4">Loading students...</div>;
    if (isError) return <div className="text-center p-4 text-red-500">Error: {error.message}</div>;

    const students = data?.students || [];
    const totalPages = data?.totalPages || 1;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search students by name..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1); 
                        }}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guardian</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.length > 0 ? students.map((student) => (
                            <tr key={student._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.guardian}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                    <button onClick={() => onEdit(student)} className="text-indigo-600 hover:text-indigo-900">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDeleteClick(student)} className="text-red-600 hover:text-red-900">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                </button>
                <span className="text-sm text-gray-700">Page {page} of {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    Next <ChevronRight className="w-4 h-4 ml-2" />
                </button>
            </div>
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Student"
                message={`Are you sure you want to delete the student "${studentToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default StudentTable;