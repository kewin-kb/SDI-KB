const express = require('express');
const router = express.Router();
const pool = require('../db');


//TODOS LOS EQUIPOS
router.get('/todosequipos',async(req,res)=>{
    try{
        const resultado = await pool.query(
            'SELECT T0."id" AS idEquipo, T1."id" AS idTipoEquipo, T1."nombre" AS nombreTipoEquipo,T2."nombre" AS nombreTipoDisco,T3."nombre" AS tipoSistemaOperativo,T4."nombre" AS tipoEstadoAsignado,T0.*,T1.*,T2.*,T4.* FROM equipos T0 INNER JOIN tipoequipo T1 ON T0."tipoequipo"=T1."id" INNER JOIN tipodisco T2 ON T0."tipodisco"=T2."id" INNER JOIN tiposo T3 ON T0."tiposistope"=T3."id" INNER JOIN estadoasignado T4 ON T0."estado"=T4."id" ORDER BY T0."fechacreado" DESC');
            res.json(resultado.rows);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Error al obtener datos')
    }
});



//TIPOS DE EQUIPOS
router.get('/tipo', async (req, res) =>{
    try{
        const resultado = await pool.query('SELECT * FROM tipoequipo ORDER BY nombre ASC');
        res.json(resultado.rows);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Error al obtener datos')
    }
});


//TIPOS DE DISCOS
router.get('/disco', async(req,res)=>{
    try{
        const resultado = await pool.query('SELECT * FROM tipodisco ORDER BY nombre ASC');
        res.json(resultado.rows);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Error al obtener datos')
    }
});

//TIPOS SISTEMA OPERATIVO
router.get('/so', async(req,res)=>{
    try{
        const resultado = await pool.query('SELECT * FROM tiposo ORDER BY nombre ASC');
        res.json(resultado.rows);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Error al obtener datos')
    }
});

//AGREGAR EQUIPOS
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