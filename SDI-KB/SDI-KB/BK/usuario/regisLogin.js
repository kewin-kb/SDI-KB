const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');


//registrar usuario
router.post('/registrar', async(req, res) =>{
    const {nombre, usuario, password,rol} = req.body;
    if(
        !nombre ||
        !usuario ||
        !password ||
        !rol
    ){
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }
    try{
    //validar si existe usuario
    const userExist = await pool.query('SELECT *  FROM usuarios WHERE usuario= $1', [usuario]);
    if(userExist.rows.length >0){
        return res.status(400).json({mensaje:'el usuario ya se encuentra registrado'});
    }

    //encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password,salt);

    //crear usuario
    const nuevoUsuario = await pool.query(
        'INSERT INTO usuarios (nombre, usuario, password,rol_id) VALUES($1,$2,$3,$4) RETURNING id, nombre, usuario, rol_id',
        [nombre,usuario,passwordHashed,rol]
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
        return res.status(400).json({mensaje:'Validar datos ingresados'});
    }

    //VALIDAR CONTRASEÑA
    const validPassword = await bcrypt.compare(password,user.rows[0].password);
    if(!validPassword){
        return res.status(400).json({mensaje: 'Validar datos ingresados'});
    }

    //GENERAR TOKEN JWT
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
            nombre:user.rows[0].nombre,
            usuario:user.rows[0].usuario,
        }
    });

}catch(err){
    console.error(err.message);
    res.status(500).send('Error en el servidor');
}
});

router.get('/usuarios',async(req,res)=>{
    try{
        const respuesta = await pool.query( `
            SELECT T0.id, T0.usuario,T0.nombre, T1.nombre AS "Tipo_usuario"  FROM usuarios T0 
            LEFT JOIN tipousuario T1 ON T0.rol_id =T1.id
            `);
            res.json(respuesta.rows);
    }catch(err){
        console.log(err.menssage);
        res.status(500).send('Erro al obtener datos');
    }
})

router.get('/roles', async(req,res)=>{
    try{
        const respuesta = await pool.query(`
            SELECT * FROM tipousuario`);
            res.json(respuesta.rows);
    }catch(err){
        console.log(err.message);
        res.status(500).send('error al obtener datos')
    }
})

module.exports = router;

