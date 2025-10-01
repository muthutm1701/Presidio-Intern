const jwt = require('jsonwebtoken');
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
         
            token = req.headers.authorization.split(' ')[1];
            const decoded =await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; 
            
            next();
        } catch (error) {
            res.status(401).json({ message: 'not authorized, token failed',err:error });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'not authorized, no token' });
    }
};


exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `User role ${req.user.role} is not authorized ` });
        }
        next();
    };
};
