import React, { useState } from 'react';
import StudentTable from '../components/StudentTable';
import StudentFormModal from '../components/StudentFormModal';
import { PlusCircle } from 'lucide-react';

const TeacherDashboard = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    const handleOpenModalForCreate = () => {
        setEditingStudent(null); 
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (student) => {
        setEditingStudent(student); 
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingStudent(null); 
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
                <button
                    onClick={handleOpenModalForCreate}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add Student
                </button>
            </div>

          
            <StudentTable onEdit={handleOpenModalForEdit} />
            <StudentFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                student={editingStudent}
            />
        </div>
    );
};

export default TeacherDashboard;