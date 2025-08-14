import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authMiddleware } from './authMiddleware';
import { jwtSecret } from './config';

const app = express();
const PORT = 1000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// ✅ Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Proxy to service-admin for admin routes
app.use(
  '/admin',
  createProxyMiddleware({
    target: 'http://localhost:1000/admin', // service-admin backend port
    changeOrigin: true,
    pathRewrite: {
      '^/admin': '' // remove /admin prefix when forwarding
    },
    onProxyReq: (proxyReq, req) => {
      // Forward the authorization header if present
      if (req.headers.authorization) {
        proxyReq.setHeader('Authorization', req.headers.authorization);
      }
    },
  })
);

// Test route
app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});

// Global error handler
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

