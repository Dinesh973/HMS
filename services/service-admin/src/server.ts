import { app } from './app';
import { sequelize } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`Admin service running at http://localhost:${PORT}/api/admins`));
  } catch (err) {
    console.error('Unable to start server:', err);
  }
})();