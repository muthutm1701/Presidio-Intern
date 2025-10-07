const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const generateAccessToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '15m', 
    });
};
const generateRefreshToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d', 
    });
};

exports.registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            logger.warn(`Registration failed: User already exists - ${email}`);
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ username, email, password, role });
        logger.info(`User registered successfully: ${user.email}`);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        logger.error(`Server Error during registration: ${error.message}`);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const accessToken = generateAccessToken(user._id, user.role);
            const refreshToken = generateRefreshToken(user._id, user.role);
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, 
            });

            res.json({
                message: "Logged in successfully",
                accessToken,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });
            logger.info(`User logged in: ${email}`);
        } else {
            logger.warn(`Login failed: Invalid credentials for ${email}`);
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        logger.error(`Server Error during login: ${error.message}`);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
exports.refreshToken = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized: No refresh token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = generateAccessToken(decoded.id, decoded.role);
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        logger.error(`Refresh token failed: ${error.message}`);
        return res.status(403).json({ message: 'Forbidden: Invalid refresh token' });
    }
};


exports.logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
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
        res.status(500).json({ message: 'Server Error' });
    }
};

