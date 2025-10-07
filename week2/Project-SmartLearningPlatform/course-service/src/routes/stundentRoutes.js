const express = require('express');
const router = express.Router();
const {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');
router.use(protect, authorize('teacher'));
router.route('/')
    .get(getAllStudents)
    .post(addStudent);
router.route('/:id')
    .put(updateStudent)
    .delete(deleteStudent);

module.exports = router;

