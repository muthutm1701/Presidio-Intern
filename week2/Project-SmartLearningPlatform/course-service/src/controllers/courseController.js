const Course = require('../models/Course');
const axios = require('axios');
exports.createCourse = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const instructorId = req.user.id;
        const course = await Course.create({ title, description, category, instructorId });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
exports.getCourseDetails = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const userServiceUrl = process.env.USER_SERVICE_URL;
        const token = req.headers.authorization; 

        const response = await axios.get(`${userServiceUrl}/auth/users/${course.instructorId}`, {
            headers: { 'Authorization': token }
        });

        const courseResponse = {
            ...course.toObject(),
            instructor: response.data 
        };

        res.json(courseResponse);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Could not fetch course details' });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const skip = (page - 1) * limit;
        const query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        const sort = {};
        if (req.query.sort) {
        
            const [key, order] = req.query.sort.split('_');
            sort[key] = order === 'desc' ? -1 : 1;
        } else {
            sort.createdAt = -1; 
        }
        const courses = await Course.find(query).sort(sort).skip(skip).limit(limit);
        res.json({
            count: courses.length,
            page,
            data: courses
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.updateCourse = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (course.instructorId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to update this course' });
        }

        course.title = title || course.title;
        course.description = description || course.description;
        course.category = category || course.category;

        const updatedCourse = await course.save();
        res.json(updatedCourse);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        if (!course.enrolledStudentIds.includes(req.user.id)) {
            course.enrolledStudentIds.push(req.user.id);
            await course.save();
        }

        res.json({ message: 'Successfully enrolled in course' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
