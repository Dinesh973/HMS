import express, { Router, Express } from 'express';
import { login, register, getAll } from '../controllers/adminController';
import { authenticate } from '../middlewares/authMiddleware';
import { authorizeRole } from '../middlewares/roleMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authenticate, authorizeRole('admin'), getAll);

export default router;