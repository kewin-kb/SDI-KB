const express = require('express');
const cors = require('cors');
require('dotenv').config();


const registrarIniciar = require('./usuario/regisLogin');

const urls = express()
const PORT = process.env.PORT || 5050;

urls.use(cors());
urls.use(express.json());

//registrarse y iniciar sesion
urls.use('/api/usuario',registrarIniciar);


urls.listen(PORT, ()=>{
    console.log(`Servidor de SDI-KB corriendo en el puerto ${PORT}`);
});