import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect middleware
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // read JWT from cookie
    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(`decoded userid: ${decoded.userId}`);
            req.user = await User.findById(decoded.userId).select('-password');
            //console.log(`decodedUser: ${req.user}`);
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized. token invalid.');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized. No token.');
    }
});

// Admin middleware
const admin = asyncHandler(async (req, res, next) => {
    console.log(`checking admin: ${req.user}`);
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin.');
    }
});

export { protect, admin };