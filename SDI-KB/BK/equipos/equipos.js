const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/tipo', async (req, res) =>{
    try{
        const resultado = await pool.query('SELECT * FROM tipoequipo ORDER BY nombre ASC');
        res.json(resultado.rows);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Error al obtener datos')
    }
});

router.get('/disco', async(req,res)=>{
    try{
        const resultado = await pool.query('SELECT * FROM tipodisco ORDER BY nombre ASC');
        res.json(resultado.rows);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Error al obtener datos')
    }
});
router.get('/so', async(req,res)=>{
    try{
        const resultado = await pool.query('SELECT * FROM tiposo ORDER BY nombre ASC');
        res.json(resultado.rows);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Error al obtener datos')
    }
});

router.post('/agregarequipo', async (req, res) => {
    const {
        tipoequipo,
        marca,
        hostname,
        modelo,
        serial,
        procesador,
        ram,
        disco,
        tipodisco,
        tiposistope,
        fechacompra,
        garantia,
        estado,
        usuario_id
    } = req.body;

    // Validar los campos obligatorios
    if (
        tipoequipo == null ||
        !marca ||
        !hostname ||
        !modelo ||
        !serial ||
        !procesador ||
        !ram ||
        !disco == null ||
        !tipodisco == null ||
        !tiposistope == null ||
        !fechacompra ||
        !garantia == null ||
        !estado == null ||
        !usuario_id == null
    ) {
        return res.status(400).json({
            mensaje: 'Todos los datos son obligatorios'
        });
    }

    try {
        const fechaRegistroActual = new Date();

        const verHostname = await pool.query('SELECT * FROM equipos WHERE hostname= $1 AND tipoequipo= $2',[hostname, tipoequipo] );
        if(verHostname.rows.length > 0){
        return res.status(400).json({mensaje:'Validar hostname, ya registrado'});
        };

        const verSerial = await pool.query('SELECT * FROM equipos WHERE serial= $1 AND tipoequipo= $2',[serial, tipoequipo]);
        if(verSerial.rows.length > 0){
        return res.status(400).json({mensaje:'Validar serial, ya registrado'});
        }

        const nuevoEquipo = await pool.query(
            `INSERT INTO equipos (
                tipoequipo,
                marca,
                hostname,
                modelo,
                serial,
                procesador,
                ram,
                disco,
                tipodisco,
                tiposistope,
                fechacompra,
                garantia,
                estado,
                usuario_id,
                fechacreado
            )
            VALUES (
                $1, $2, $3, $4, $5,
                $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15
            )
            RETURNING *`,
            [
                tipoequipo,
                marca,
                hostname,
                modelo,
                serial,
                procesador,
                ram,
                disco,
                tipodisco,
                tiposistope,
                fechacompra,
                garantia,
                estado,
                usuario_id,
                fechaRegistroActual
            ]
        );
        res.status(201).json({
            mensaje: '1',
            equipo: nuevoEquipo.rows[0]
        });

    } catch (err) {
        console.error('Error al guardar equipo:', err);

        res.status(500).json({
            mensaje: 'Error al agregar equipoo'
        });
    }
});  
module.exports = router;