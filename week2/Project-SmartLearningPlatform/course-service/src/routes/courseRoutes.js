const express = require('express');
const router = express.Router();
const { 
    createCourse, 
    getAllCourses, 
    getCourseDetails,
    updateCourse,
    enrollInCourse
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');
router.get('/', getAllCourses); 
router.get('/:id', getCourseDetails);
router.post('/', protect, authorize('teacher'), createCourse); 
router.put('/:id', protect, authorize('teacher'), updateCourse); 
router.post('/:id/enroll', protect, authorize('student'), enrollInCourse); 

module.exports = router;