const Student = require('../models/Students');

exports.getAllStudents = async (req, res) => {
    const { page = 1, limit = 5, search = '' } = req.query;
    try {
        const query = {
            createdBy: req.user.id, 
            name: { $regex: search, $options: 'i' } 
        };

        const students = await Student.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        
        const count = await Student.countDocuments(query);

        res.json({
            students,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.addStudent = async (req, res) => {
    try {
        const { name, age, guardian } = req.body;
        const student = await Student.create({
            name,
            age,
            guardian,
            createdBy: req.user.id 
        });
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: 'Failed to add student', error: error.message });
    }
};


exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
       
        if (student.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized' });
        }
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update student', error: error.message });
    }
};


exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        if (student.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized' });
        }
        await student.remove();
        res.json({ message: 'Student removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

