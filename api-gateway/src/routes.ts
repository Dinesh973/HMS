import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { services } from './config';
import { authMiddleware } from './authMiddleware';

export function setupRoutes(app: Express) {
  app.use('/admin', authMiddleware(['admin']), createProxyMiddleware({
    target: services.admin,
    changeOrigin: true,
    pathRewrite: { '^/admin': '' }
  }));

  app.use('/patient', authMiddleware(['patient']), createProxyMiddleware({
    target: services.patient,
    changeOrigin: true,
    pathRewrite: { '^/patient': '' }
  }));

  app.use('/doctor', authMiddleware(['doctor']), createProxyMiddleware({
    target: services.doctor,
    changeOrigin: true,
    pathRewrite: { '^/doctor': '' }
  }));

  app.use('/nurse', authMiddleware(['nurse']), createProxyMiddleware({
    target: services.nurse,
    changeOrigin: true,
    pathRewrite: { '^/nurse': '' }
  }));

  app.use('/receptionist', authMiddleware(['receptionist']), createProxyMiddleware({
    target: services.receptionist,
    changeOrigin: true,
    pathRewrite: { '^/receptionist': '' }
  }));

  app.use('/lab', authMiddleware(['lab']), createProxyMiddleware({
    target: services.lab,
    changeOrigin: true,
    pathRewrite: { '^/lab': '' }
  }));

  app.use('/billing', authMiddleware(['billing']), createProxyMiddleware({
    target: services.billing,
    changeOrigin: true,
    pathRewrite: { '^/billing': '' }
  }));
}
