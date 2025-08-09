"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function authMiddleware(requiredRoles = []) {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.jwtSecret);
            req.user = decoded;
            if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
                return res.status(403).json({ error: 'Forbidden: insufficient role' });
            }
            next();
        }
        catch (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
}
exports.authMiddleware = authMiddleware;
