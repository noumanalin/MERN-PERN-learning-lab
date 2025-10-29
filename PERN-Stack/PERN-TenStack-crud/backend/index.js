import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

import { pool } from './src/config/connectDB.js';
import employeeRoutes from './src/routes/employeeR.js';



const corssOptions = {
  origin: '*', // Adjust this to your frontend's origin
//   optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corssOptions));
app.use(bodyParser.json());


// API/Endpoints
app.get('/', (req, res) => {
  res.json({ success:true, cmd:"Ping - Pong", message: 'Welcome to the PERN Stack CRUD API' });
});

app.use('/api/employees', employeeRoutes);





app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`); 
});