const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger'); 

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};
exports.registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            logger.warn(`Registration failed: User already exists for email ${email}`);
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ username, email, password, role });
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        });
    } catch (error) {
        logger.error(`Server Error during registration: ${error.message}`);
        res.status(500).json({ message: 'server Error', error: error.message });
    }
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
         logger.warn(`Login failed for email ${email}: Invalid credentials`);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
         logger.error(`Server Error during login: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};