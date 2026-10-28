const express= require('express');
const cors = require('cors');
require('dotenv').config();


const usuarios = require('./usuario/regisLogin');
const colaborador = require ("./colaborador/colaborador");
const tipoEquipo = require ('./equipos/equipos');
const asignaciones = require('./equipos/asignaciones')


const urls = express()
const PORT = process.env.PORT ||  5050;

urls.use(cors());
urls.use(express.json());


//Link de API generados
urls.use('/api/usuario', usuarios);
urls.use('/api/colaborador',colaborador)
urls.use('/api/equipo', tipoEquipo);
urls.use('/api/asignaciones', asignaciones);



urls.listen(PORT, () => {
  console.log(`Servidor de SDI-KB corriendo en el puerto ${PORT}`);
});