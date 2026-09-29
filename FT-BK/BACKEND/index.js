const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const registrarIniciar = require('./usuario/regisLogin');

const urls = express()
const PORT = process.env.PORT || 5050;

urls.use(cors());
urls.use(express.json());

//registrarse
urls.use('/api/usuario',registrarIniciar);

urls.get('/api/validar',async(req,res)=>{
    try{
        const resultado = await pool.query('SELECT * FROM usuarios');
        res.json(resultado.rows);
    }catch{
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});


urls.listen(PORT, ()=>{
    console.log(`Servidor de SDI-KB corriendo en el puerto ${PORT}`);
});