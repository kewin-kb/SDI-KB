const express= require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT ||  5000;

app.use(cors());
app.use(express.json());

app.get('/api/productos', async(req, res) =>{
    try{
        const resultado = await pool.query('SELECT * FROM productos');
        res.json(resultado.rows);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});
