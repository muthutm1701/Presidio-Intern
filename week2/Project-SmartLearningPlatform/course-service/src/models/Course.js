const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    instructorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    enrolledStudentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;