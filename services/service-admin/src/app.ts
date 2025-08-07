import express from 'express';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/admins', adminRoutes);