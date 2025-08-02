import express from 'express';
import patientRoutes from './routes/patientRoutes';
import sequelize from  './config/database'

const app = express();
const PORT = 5000;
 

app.use(express.json());

app.use('/api/patients', patientRoutes);

app.get('/', (req, res) => {
  res.send('Service-Patient API is running!');
});

// Start server
app.listen(PORT, () => {
  sequelize.authenticate()
  sequelize.sync({alter:true})
  .then(() => console.log('Data Sync done'))
  .catch((err) => console.error('DB connection failed:', err));

  // console.log(`Server is running on http://localhost:${PORT}`);
});  


