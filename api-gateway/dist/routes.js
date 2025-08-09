"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = setupRoutes;
const http_proxy_middleware_1 = require("http-proxy-middleware");
const config_1 = require("./config");
const authMiddleware_1 = require("./authMiddleware");
function setupRoutes(app) {
    app.use('/admin', (0, authMiddleware_1.authMiddleware)(['admin']), (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: config_1.services.admin,
        changeOrigin: true,
        pathRewrite: { '^/admin': '' }
    }));
    app.use('/patient', (0, authMiddleware_1.authMiddleware)(['patient']), (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: config_1.services.patient,
        changeOrigin: true,
        pathRewrite: { '^/patient': '' }
    }));
    app.use('/doctor', (0, authMiddleware_1.authMiddleware)(['doctor']), (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: config_1.services.doctor,
        changeOrigin: true,
        pathRewrite: { '^/doctor': '' }
    }));
    app.use('/nurse', (0, authMiddleware_1.authMiddleware)(['nurse']), (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: config_1.services.nurse,
        changeOrigin: true,
        pathRewrite: { '^/nurse': '' }
    }));
    app.use('/receptionist', (0, authMiddleware_1.authMiddleware)(['receptionist']), (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: config_1.services.receptionist,
        changeOrigin: true,
        pathRewrite: { '^/receptionist': '' }
    }));
    app.use('/lab', (0, authMiddleware_1.authMiddleware)(['lab']), (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: config_1.services.lab,
        changeOrigin: true,
        pathRewrite: { '^/lab': '' }
    }));
    app.use('/billing', (0, authMiddleware_1.authMiddleware)(['billing']), (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: config_1.services.billing,
        changeOrigin: true,
        pathRewrite: { '^/billing': '' }
    }));
}
