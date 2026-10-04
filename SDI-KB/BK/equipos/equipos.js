const express = require('express');
const router = express.Router();
const pool = require('../db');




// TODOS LOS EQUIPOS
router.get('/todosequipos', async (req, res) => {
    try {
        const resultado = await pool.query(`
        
        SELECT 
            T0.id AS "idEquipo",
            T1.id AS "idActivo",
            T1.codigo AS "codigoActivo",

            T2.id AS "idTipoEquipo",
            T2.nombre AS "nombreTipoEquipo",

            T3.nombre AS "nombreTipoDisco",
            T4.nombre AS "tipoSitemaOperativo",

            T5.id AS "idEstado",
            T5.nombre AS "tipoEstadoAsignado",

            TO_CHAR(T0.fechacompra, 'DD-MM-YYYY') AS "fechacompra",
            T0.marca,
            T0.hostname,
            T0.modelo,
            T0.serial,
            T0.procesador,
            T0.ram,
            T0.disco,
            T0.tipodisco,
            T0.tiposistope,
            T0.tipoequipo,
            T0.garantia

        FROM equipos T0
        INNER JOIN activos T1 ON T0.activo_id = T1.id
        INNER JOIN tipoequipo T2 ON T0.tipoequipo = T2.id
        INNER JOIN tipodisco T3 ON T0.tipodisco=T3.id
        INNER JOIN tiposo T4 ON T0.tiposistope=T4.id
        INNER JOIN estadoasignado T5 ON T1.estado_id = T5.id 
        
        ORDER BY T1.id DESC

        
        `);

        res.json(resultado.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error al obtener datos');
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
        ram == null ||
        disco == null ||
        tipodisco == null ||
        tiposistope == null ||
        !fechacompra ||
        garantia == null ||
        usuario_id == null
    ) {
        return res.status(400).json({
            mensaje: 'Todos los datos son obligatorios'
        });
    }
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
//validar hostname
        const verHostname = await client.query('SELECT id FROM equipos WHERE hostname= $1 AND tipoequipo= $2',[hostname, tipoequipo] );
        if(verHostname.rows.length > 0){
        await client.query('ROLLBACK');
        return res.status(400).json({mensaje:'Validar hostname, ya registrado'});
        };
//validar serial
        const verSerial = await client.query('SELECT id FROM equipos WHERE serial= $1 AND tipoequipo= $2',[serial, tipoequipo]);
        if(verSerial.rows.length > 0){
        await client.query('ROLLBACK');
        return res.status(400).json({mensaje:'Validar serial, ya registrado'});
        }



//cAsignar estado activo
    const tipoActivo = await client.query(
        `
        SELECT id
        FROM tipoactivo
        WHERE nombre = 'Equipo'
        AND activo = true
        LIMIT 1
        `
        );

        if(tipoActivo.rows.length === 0){
            await client.query('ROLLBACK');
            return res.status(400).json({
                mensaje:'No existe el tipo de activo Equipo'
            });
        }
        const tipoActivoId = tipoActivo.rows[0].id;
   
//Asignar estado inicial
    const estadoInicial = await client.query(
        `
        SELECT id
        FROM estadoasignado
        WHERE nombre = 'Disponible'
        AND activo=true
        LIMIT 1
        `
         );
        if (estadoInicial.rows.length === 0){
            await client.query('ROLLBACK');
            return res.status(400).json({
                mensaje:'Noexiste el estado disponible'
            });
        }
        const estadoId = estadoInicial.rows[0].id;


//crear activo

    const codigoTemporal = `TEMP-${Date.now()}`;

    const nuevoActivo = await client.query(
        `
    INSERT INTO activos (
        codigo,
        tipoactivo_id,
        estado_id
        )
    VALUES (
        $1,
        $2,
        $3
    )
    RETURNING id
         `,
         [
            codigoTemporal,
            tipoActivoId,
            estadoId
         ]
        );
    const activoId = nuevoActivo.rows[0].id;


//generar codigo activos
    const codigoActivo =
    `ACT-${String(activoId).padStart(6,'0')}`;

    await client.query(
        `
        UPDATE activos 
        SET codigo = $1
        WHERE id= $2
        `,
        [codigoActivo,activoId]
    );

//crear nuevo equipo
    const nuevoEquipo = await client.query(
        `
    INSERT INTO equipos (
        activo_id,
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
        garantia
        )
    VALUES (
        $1, $2, $3, $4, $5,$6, $7, $8, $9, $10,$11, $12, $13
    )
    RETURNING *
    `,[
        activoId,
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
        garantia
    ]
    );
//Crear historial
    await client.query(
        `
    INSERT INTO historial (
        activo_id,
        usuario_id,
        accion,
        observacion
        )
    VALUES(
        $1,
        $2,
        'CREACION',
        'Creacion del activo y equipo'
    )
    `,
    [
            activoId,
            usuario_id
    ]
    );
//Confirmacion
    await client.query('COMMIT');
    res.status(201).json({
        mensaje: 'Equipo creado correctamente',
        activo: {
            id: activoId,
            codigo: codigoActivo
        },
        equipo: nuevoEquipo.rows[0]
    });
}catch(error){
    await client.query('ROLLBACK');
    console.log('Error al agregar equipo:', error);

    res.status(500).json ({
        mensaje:'Error al agregar equipo',
        error: error.message
    });
}finally{
    client.release();
}


});


//ACTUALIZAR EQUIPO
router.put('/editar/:id', async(req,res) => {
    const { id } = req.params;
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
        usuario_id
    } = req.body;
     if (
        tipoequipo == null ||
        !marca ||
        !hostname ||
        !modelo ||
        !serial ||
        !procesador ||
        ram == null ||
        disco == null ||
        tipodisco == null ||
        tiposistope == null ||
        !fechacompra ||
        garantia == null ||
        usuario_id == null
     )  {
        return res.status(400).json({
            mensaje:'Todos los datos son obligatorios'
        });
     } 
     const client = await pool.connect();
     try{
        await client.query('BEGIN');
    const equipoActual = await client.query(
    `SELECT 
        id,
        activo_id,
        tipoequipo,
        marca,
        modelo,
        serial,
        hostname,
        procesador,
        ram,
        disco,
        tipodisco,
        tiposistope,
        fechacompra,
        garantia
    FROM equipos
        WHERE id= $1
        `, [id]);
    if(equipoActual.rows.length === 0){
        await client.query('ROLLBACK');

        return res.status(404).json({
            mensaje:'El equipo no existe'
        });
    }
    const anterior = equipoActual.rows[0];


    const verHostname = await client.query(
    `SELECT id
        FROM equipos
        WHERE hostname = $1
        AND tipoequipo = $2
        AND id <> $3
    `,[
        hostname,
        tipoequipo,
        id
    ]);

    if (verHostname.rows.length >0){
        await client.query('ROLLBACK');
        return res.status(400).json({
            mensaje:'Validar hostname, ya registrado'
        });
    }

    const verSerial = await client.query(
        `SELECT id
        FROM equipos
        WHERE serial = $1
        AND tipoequipo = $2
        AND id <> $3
        `,[
            serial,
            tipoequipo,
            id
        ]);
        if(verSerial.rows.length > 0){
            await client.query('ROLLBACK');
            return res.status(400).json({
                mensaje:'Validar serial, ya registrado'
            });
        }
// actualizar equipo
        const equipoActualizado = await client.query(
            `
            UPDATE equipos
            SET
                tipoequipo = $1,
                marca = $2,
                hostname = $3,
                modelo = $4,
                serial = $5,
                procesador = $6,
                ram = $7,
                disco = $8,
                tipodisco = $9,
                tiposistope = $10,
                fechacompra = $11,
                garantia = $12
            WHERE id = $13
            RETURNING *
            `,[
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
                id
            ]);
//Registrar cambio tabla de historial
    const nuevo = equipoActualizado.rows[0];
    const cambios =[
        {
            campo: 'tipoequipo',
            anterior: anterior.tipoequipo,
            nuevo: nuevo.tipoequipo
        },{
            campo: 'marca',
            anterior: anterior.marca,
            nuevo: nuevo.marca
        },{
            campo:'hostname',
            anterior: anterior.hostname,
            nuevo: nuevo.hostname
        },{
            campo:'modelo',
            anterior: anterior.modelo,
            nuevo: nuevo.modelo
        },{
            campo:'serial',
            anterior: anterior.serial,
            nuevo: nuevo.serial
        },{
            campo:'procesador',
            anterior: anterior.procesador,
            nuevo: nuevo.procesador
        },{
            campo:'ram',
            anterior: anterior.ram,
            nuevo: nuevo.ram
        },{
            campo:'disco',
            anterior: anterior.disco,
            nuevo: nuevo.disco
        },{
            campo:'tipodisco',
            anterior: anterior.tipodisco,
            nuevo: nuevo.tipodisco
        },{
            campo:'tiposistope',
            anterior: anterior.tiposistope,
            nuevo: nuevo.tiposistope
        },{
            campo:'fechacompra',
            anterior: anterior.fechacompra,
            nuevo: nuevo.fechacompra
        },{
            campo:'garantia',
            anterior: anterior.garantia,
            nuevo: nuevo.garantia
        }
    ];
    for(const cambio of cambios){
        if(
            String(cambio.anterior ?? '') !==
            String(cambio.nuevo ?? '')
        ){
            await client.query(
            `
            INSERT INTO historial(
            activo_id,
            usuario_id,
            accion,
            campo_modificado,
            valor_anterior,
            valor_nuevo
            )
            VALUES(
            $1,
            $2,
            'EDICION',
            $3,
            $4,
            $5
            )
            `,[
                anterior.activo_id,
                usuario_id,
                cambio.campo,
                String(cambio.anterior ?? ''),
                String(cambio.nuevo ?? '')
            ]);
        }
    }
    await client.query('COMMIT');
    res.status(200).json({
        mensaje: 'Equipo actualizado correctamente',
        equipo: equipoActualizado.rows[0]
    });
     }catch(error){
        await client.query('ROLLBACK');
        console.log('Error al editar equipo:', error);
        res.status(500).json({
            mensaje: 'Error al editar equipo',
            error:error.message
        });
     }finally{
        client.release();
     }
});

module.exports = router;