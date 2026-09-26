const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');


//registrar usuario
router.post('/registrar', async(req, res) =>{
    const {nombre, usuario, password} = req.body;
    try{
    //validar si existe usuario
    const userExist = await pool.query('SELECT*  FROM usuarios WHERE usuario= $1', [usuario]);
    if(userExist.rows.length >0){
        return res.status(400).json({mensaje:'el usuario ya se encuentra registrado'});
    }

    //encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password,salt);

    //crear usuario
    const nuevoUsuario = await pool.query(
        'INSERT INTO usuarios (nombre, usuario, password) VALUES($1,$2,$3) RETURNING id, nombre, usuario',
        [nombre,usuario,passwordHashed]
    );
    res.status(201).json({mensaje:'Usuario creado exitosamente', usuario: nuevoUsuario.rows[0]});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Error en el servidorr');
    }
});

//iniciar sesion
router.post('/login', async (req,res) => {
    const {usuario,password}=req.body;
    try{
    //BUSCAR USUARIO
    const user = await pool.query('SELECT * FROM usuarios WHERE usuario = $1',[usuario]);
    if (user.rows.length === 0){
        return res.status(400).json({mensaje:'Credenciales invalidas'});
    }

    //VALIDAR CONTRASEÑA
    const validPassword = await bcrypt.compare(password,user.rows[0].password);
    if(!validPassword){
        return res.status(400).json({mensaje: 'Credenciales invalidas'});
    }

    //GENERAR TOKEN JWT
    const token = jwt.sign(
        {id:user.rows[0].id},
        process.env.JWT_SECRET,
        {expiresIn:'4h'}
    );
    res.json({
        mensaje: 'Inicio de sesion exitoso',
        token,
        usuario:{
            id:user.rows[0].id,
            nombre:user.rows[0].nombre,
            usuario:user.rows[0].usuario,
        }
    });

}catch(err){
    console.error(err.message);
    res.status(500).send('Error en el servidor');
}
});

module.exports = router;

