const express= require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express()
const PORT = process.env.PORT ||  5000;

app.use(cors());
app.use(express.json());

//validar inicio sesion
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor de SDI-KB corriendo en el puerto ${PORT}`);
});