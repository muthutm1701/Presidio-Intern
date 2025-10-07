import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { courseServiceAPI } from '../utils/api';
import { toast } from 'react-hot-toast';
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    age: yup.number().typeError('Age must be a number').positive('Age must be positive').integer().min(1, 'Age must be at least 1').required('Age is required'),
    guardian: yup.string().required('Guardian name is required'),
});

const StudentFormModal = ({ isOpen, onClose, student }) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        if (student) {
            reset({ name: student.name, age: student.age, guardian: student.guardian });
        } else {
            reset({ name: '', age: '', guardian: '' });
        }
    }, [student, isOpen, reset]);

    const mutation = useMutation({
        mutationFn: (data) => 
            student 
                ? courseServiceAPI.put(`/students/${student._id}`, data) 
                : courseServiceAPI.post('/students', data),              
        onSuccess: () => {
            toast.success(`Student ${student ? 'updated' : 'added'} successfully!`);
            queryClient.invalidateQueries({ queryKey: ['students'] }); 
            onClose();
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || `Failed to ${student ? 'update' : 'add'} student.`);
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">{student ? 'Edit Student' : 'Add New Student'}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input {...register('name')} className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                        <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input type="number" {...register('age')} className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                        <p className="text-red-500 text-xs mt-1">{errors.age?.message}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Guardian's Name</label>
                        <input {...register('guardian')} className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                        <p className="text-red-500 text-xs mt-1">{errors.guardian?.message}</p>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={mutation.isPending} className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-wait">
                            {mutation.isPending ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentFormModal;