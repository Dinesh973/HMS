// src/routes.ts
import { Express, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { services } from './config';
import { authMiddleware } from './authMiddleware';

export function setupRoutes(app: Express) {
  // Health check
  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  /**
   * Admin routes
   * Login route is public (no token needed)
   */
 app.use(
    "/service-admin",
    createProxyMiddleware({
      target: services.admin,
      changeOrigin: true,
      pathRewrite: {
        "^/service-admin": "", // remove /admin prefix before sending to admin service
      },
    })
  );
  // Protect all other admin routes
  app.use(
    '/admin',
    authMiddleware(['admin']),
    createProxyMiddleware({
      target: services.admin,
      changeOrigin: true,
      pathRewrite: {
        '^/admin': '', // so /admin/users → /users in admin service
      },
    })
  );

  /**
   * Doctor routes
   * Login public, rest protected
   */
  app.use(
    '/doctor/login',
    createProxyMiddleware({
      target: services.doctor,
      changeOrigin: true,
      pathRewrite: {
        '^/doctor': '',
      },
    })
  );

  app.use(
    '/doctor',
    authMiddleware(['doctor']),
    createProxyMiddleware({
      target: services.doctor,
      changeOrigin: true,
      pathRewrite: {
        '^/doctor': '',
      },
    })
  );

  // Add similar blocks for patient, nurse, etc.
}




// import { Express } from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// import { services } from './config';
// import { authMiddleware } from './authMiddleware';

// export function setupRoutes(app: Express) {
//   /**
//    * ADMIN SERVICE
//    * Public routes: /admin/login, /admin/register
//    */
//   app.use('/admin/login', createProxyMiddleware({
//     target: services.admin,
//     changeOrigin: true,
//     pathRewrite: { '^/admin': '' }
//   }));

//   app.use('/admin/register', createProxyMiddleware({
//     target: services.admin,
//     changeOrigin: true,
//     pathRewrite: { '^/admin': '' }
//   }));

//   // Protected admin routes
//   app.use('/admin', authMiddleware(['admin', 'superadmin']), createProxyMiddleware({
//     target: services.admin,
//     changeOrigin: true,
//     pathRewrite: { '^/admin': '' }
//   }));

//   /**
//    * PATIENT SERVICE
//    */
//   app.use('/patient/login', createProxyMiddleware({
//     target: services.patient,
//     changeOrigin: true,
//     pathRewrite: { '^/patient': '' }
//   }));

//   app.use('/patient/register', createProxyMiddleware({
//     target: services.patient,
//     changeOrigin: true,
//     pathRewrite: { '^/patient': '' }
//   }));

//   app.use('/patient', authMiddleware(['patient']), createProxyMiddleware({
//     target: services.patient,
//     changeOrigin: true,
//     pathRewrite: { '^/patient': '' }
//   }));

//   /**
//    * DOCTOR SERVICE
//    */
//   app.use('/doctor', authMiddleware(['doctor']), createProxyMiddleware({
//     target: services.doctor,
//     changeOrigin: true,
//     pathRewrite: { '^/doctor': '' }
//   }));

//   /**
//    * NURSE SERVICE
//    */
//   app.use('/nurse', authMiddleware(['nurse']), createProxyMiddleware({
//     target: services.nurse,
//     changeOrigin: true,
//     pathRewrite: { '^/nurse': '' }
//   }));

//   /**
//    * RECEPTIONIST SERVICE
//    */
//   app.use('/receptionist', authMiddleware(['receptionist']), createProxyMiddleware({
//     target: services.receptionist,
//     changeOrigin: true,
//     pathRewrite: { '^/receptionist': '' }
//   }));

//   /**
//    * LAB SERVICE
//    */
//   app.use('/lab', authMiddleware(['lab']), createProxyMiddleware({
//     target: services.lab,
//     changeOrigin: true,
//     pathRewrite: { '^/lab': '' }
//   }));

//   /**
//    * BILLING SERVICE
//    */
//   app.use('/billing', authMiddleware(['billing']), createProxyMiddleware({
//     target: services.billing,
//     changeOrigin: true,
//     pathRewrite: { '^/billing': '' }
//   }));
// }


