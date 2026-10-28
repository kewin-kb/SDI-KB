const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/asignar', async (req,res)=>{
    const {
        activo_id,
        colaborador_id,
        observacion,
        usuario_asigna_id
    }=req.body;
    if(
        activo_id == null ||
        colaborador_id == null ||
        usuario_asigna_id == null
    ){
        return res.status(400).json({
            mensaje: 'todos los campos con obligatirios'
        });
    }

    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        const activo = await client.query(
            `
            SELECT 
            T0.id,
            T0.codigo,
            T0.estado_id,
            T1.nombre AS estado
            FROM activos T0
            INNER JOIN estadoasignado T1 ON T0.estado_id = T1.id
            WHERE T0.id= $1
            `, [activo_id]);
        if (activo.rows.length === 0){
            await client.query('ROLLBACK');
            return res.status(404).json({
                mensaje: 'El actiov no existe'
            });
        }
        const datosActivo = activo.rows[0];

        if (datosActivo.estado !== 'Disponible'){
            await client.query('ROLLBACK');
            return res.status(400).json({
                mensaje: `El activo ${datosActivo.codigo} no esta disponible. Estado actual: ${datosActivo.estado}`
            });
        }

        const colaborador = await client.query(`
            SELECT
            id,
            nombrecompleto
            FROM colaborador
            WHERE id= $1
            `, [colaborador_id]);
            if (colaborador.rows.length === 0) {

            await client.query('ROLLBACK');

            return res.status(404).json({
                 mensaje: 'El colaborador no existe'
            });
}

        const asignacionActiva = await client.query(`
        SELECT id
        FROM asignaciones
        WHERE activo_id = $1
        AND estado = 'Activa'
        `,[activo_id]);

        if (asignacionActiva.rows.length > 0){
            await client.query('ROLLBACK');
            return res.status(400).json({
                mensaje:'El equipo ya tiene una asignacion activa'
            });
        }
        const nuevaAsignacion = await client.query(`
        INSERT INTO asignaciones(
            activo_id,
            usuario_id,
            observacion,
            usuario_asigna_id)
        VALUES(
            $1,
            $2,
            $3,
            $4
            )
            RETURNING *
            `,[
                activo_id,
                colaborador_id,
                observacion || null,
                usuario_asigna_id
            ]);
        const estadoAsignado = await client.query(`
        SELECT id
        FROM estadoasignado
        WHERE nombre= 'Asignado'
        AND  activo = true
        LIMIT 1
        `);
        if (estadoAsignado.rows.length === 0){
            await client.query('ROLLBACK');
            return res.status(400).json({
                mensaje:'No existe el estado Asignado'
            });
        }
        const estadoAsignadoId = estadoAsignado.rows[0].id;

        await client.query(`
            update activos
            SET estado_id = $1
            WHERE id= $2
            `,[
                estadoAsignadoId,
                activo_id
            ]);
        await client.query(`
            INSERT INTO historial(
            activo_id,
            usuario_id,
            accion,
            observacion)
            VALUES(
                $1,
                $2,
                'ASIGNACION',
                $3
            ) `, [
                activo_id,
                usuario_asigna_id,
                observacion || `Activo asignado a colaborador ${colaborador_id}`
            ]);

            await client.query('COMMIT');
            res.status(201).json({
                mensaje:'Equipo asignado correctamente',
                asignacion: nuevaAsignacion.rows[0],
                activo:{
                    id: activo_id,
                    codigo: datosActivo.codigo,
                    estado: 'Asginado'
                },
                colaborador: colaborador.rows[0]
            });
    }catch(error) {

    await client.query('ROLLBACK');

    console.error('=================================');
    console.error('ERROR AL ASIGNAR EQUIPO');
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
    console.error('Detalle:', error.detail);
    console.error('Hint:', error.hint);
    console.error('Tabla:', error.table);
    console.error('Columna:', error.column);
    console.error('=================================');

    res.status(500).json({
        mensaje: 'Error al asignar equipo',
        error: error.message
    });

} finally {

    client.release();
    } 
});

//OBTENER LOS COLABORADORES
router.get('/colaboradores', async (req,res)=>{
    try{
        const resultado = await pool.query(
            `
            SELECT *
            FROM colaborador
            ORDER BY nombrecompleto ASC
            `);
            res.json(resultado.rows);
    }catch(error){
        console.log(
            'Error al obtener colaboradores:', error
        );
        res.status(500).json({
            mensaje: 'Error al obtener colaboradores'
        });
    }
});

module.exports = router;