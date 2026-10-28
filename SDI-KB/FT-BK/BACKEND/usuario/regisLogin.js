const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../db');
const jwt = require('jsonwebtoken');


//REGISTRAR USUARIO
router.post('/registrar', async(req, res) =>{
    const {nombre, usuario, contrasena} = req.body;
    try{
        const usuarioExiste = await pool.query('SELECT * FROM usuarios WHERE usuario=$1', [usuario]);
        if(usuarioExiste.rows.length > 0){
            return res.status(400).json({mensaje:'El nombre de usuario se encuentra registrado'});
        }
        const encriptar = await bcrypt.genSalt(10);
        const contraHash = await bcrypt.hash(contrasena,encriptar);

        const nuevoUsuario = await pool.query(
            'INSERT INTO usuarios(nombrecompleto,usuario,contrasena)VALUES($1,$2,$3) RETURNING id, nombrecompleto, usuario',
            [nombre,usuario,contraHash]
        );
        res.status(201).json({mensaje:'Usuario creado exitosamente',usuario: nuevoUsuario.rows[0]});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

//INICIAR SESION
router.post('/login', async(req,res)=>{
    const {usuario,contrasena}=req.body;
    try{
        //Buscar usuario
        const user = await pool.query('SELECT * FROM usuarios WHERE usuario =$1',[usuario]);
        if(user.rows.length ===0){
            return res.status(400).json({mensaje:'Validar datos ingresados'});
        }
        //validar contraseña
        const validarContrasena = await bcrypt.compare(contrasena,user.rows[0].contrasena);
        if(!validarContrasena){
            return res.status(400).json({mensaje:'Validar datos ingresados'});
        }

        //Generar token
        const token = jwt.sign(
            {id:user.rows[0].id},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        );
        res.json({
        mensaje: 'Inicio de sesion exitoso',
        token,
        usuario:{
            id:user.rows[0].id,
            nombre:user.rows[0].nombrecompleto,
            usuario:user.rows[0].usuario,
        }
    });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Error en el servidor');

    }
})

module.exports = router;