import dotenv from "dotenv";
import sequelize from "./config/database";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000; 

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Admin service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
