const express = require ('express');
const router = express.Router();
const pool = require('../db');

router.get('/areas',async(req,res)=>{
    try{
        const resultado = await pool.query('SELECT * FROM areas ORDER BY nombre ASC');
        res.json(resultado.rows);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Error al obtener datos')
    }
});

router.post('/agregarcolaborador',async(req,res)=>{
    const{
        nombrecompleto,
        apellido,
        cedula,
        area,
        cargo,
        creadopor
    }=req.body;
    if(
        !nombrecompleto||
        !apellido||
        !cedula||
        !area||
        !cargo||
        !creadopor
    ){
        return res.status(400).json({
            mensaje: 'Todos los datos son obligatorios'
        });
    }
    try{
        const fechaRegistroActual = new Date();
        const verCedular = await pool.query('SELECT * FROM colaborador WHERE cedula=$1',[cedula]);
        if(verCedular.rows.length>0){
            return res.status(400).json({mensaje:'Validar cedula, ya registrada'});
        };

        const nuevoColaborador = await pool.query(
            `INSERT INTO colaborador(
            nombrecompleto,
            apellido,
            cedula,
            area,
            cargo,
            creadopor,
            fecharegistro
            )
            VALUES(
            $1,$2,$3,$4,$5,$6,$7)
            RETURNING *`,
            [
                nombrecompleto,
                apellido,
                cedula,
                area,
                cargo,
                creadopor,
                fechaRegistroActual
            ]
        );
        res.status(201).json({
            mensaje:'1',
            colaborador: nuevoColaborador.rows[0]
        });
    }catch(err){
        console.error('Erro al crear colaborador',err);
        res.status(500).json({
            mensaje:'Erro al crear colaborador'
        });
    }
});
module.exports = router;