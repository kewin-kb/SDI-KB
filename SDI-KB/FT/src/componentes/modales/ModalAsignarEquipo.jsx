import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import axios from "axios";

function ModalAsignarEquipo({
    esAbierto,
    esCerrado,
    alGuardarSuccess,
    equipoAAsignar
}) {

    const [colaboradores, setColaboradores] = useState([]);

    const [colaboradorSeleccionado, setColaboradorSeleccionado] =
        useState('');

    const [observacion, setObservacion] =
        useState('');

    const [mensajeError, setMensajeError] =
        useState('');

    const [mensajeExito, setMensajeExito] =
        useState('');

    const [cargando, setCargando] =
        useState(false);


    // =====================================================
    // CARGAR COLABORADORES
    // =====================================================

    useEffect(() => {

        if (!esAbierto) return;

        const cargarColaborador = async () => {

            try {

                const respuesta = await axios.get(
                    'http://localhost:5050/api/asignaciones/colaboradores'
                );

                setColaboradores(
                    respuesta.data
                );

            } catch (err) {

                console.error(
                    'Error cargando colaboradores:',
                    err
                );

                setMensajeError(
                    'No fue posible cargar los colaboradores'
                );
            }
        };

        cargarColaborador();

    }, [esAbierto]);


    // =====================================================
    // LIMPIAR FORMULARIO
    // =====================================================

    const limpiarFormulario = () => {

        setColaboradorSeleccionado('');
        setObservacion('');
        setMensajeError('');
        setMensajeExito('');
        setCargando(false);

    };


    const manejarCierre = () => {
        limpiarFormulario();
        if (esCerrado) esCerrado();
    };


    

    const handleAsignar = async (e) => {
        e.preventDefault();
        setMensajeError('');
        setMensajeExito('');


        if (!colaboradorSeleccionado) {
            setMensajeError(
                'Debe seleccionar un colaborador'
            );
            return;
        }


        if (!equipoAAsignar) {
            setMensajeError(
                'No se ha seleccionado ningún equipo'
            );
            return;
        }


        try {
            setCargando(true);
            const usuarioGuardado =
                JSON.parse(
                    localStorage.getItem('usuario')
                );

            const datos = {
                activo_id:
                    equipoAAsignar.idActivo,
                colaborador_id:
                    parseInt(
                        colaboradorSeleccionado,
                        10
                    ),
                observacion,
                usuario_asigna_id:
                    usuarioGuardado?.id

            };
            console.log(
                'Datos a enviar:',
                datos
            );


            const respuesta = await axios.post(
                'http://localhost:5050/api/asignaciones/asignar',
                datos
            );


            console.log(
                'Respuesta:',
                respuesta.data
            );


            setMensajeExito(
                respuesta.data.mensaje ||
                'Equipo asignado correctamente'
            );


            if (alGuardarSuccess) {
                alGuardarSuccess();
            }


            setTimeout(() => {

                manejarCierre();

            }, 800);


        } catch (error) {

            console.error(
                'Error al asignar equipo:',
                error
            );


            setMensajeError(
                error.response?.data?.mensaje ||
                'Error al asignar equipo'
            );

        } finally {

            setCargando(false);

        }

    };


    return (

        <Modal
            esAbierto={esAbierto}
            esCerrado={manejarCierre}
            titulo="Asignar colaborador"
        >

            <form
                onSubmit={handleAsignar}
            >

                {/* EQUIPO */}

                {equipoAAsignar && (

                    <div className="mb-4">

                        <p>
                            <strong>Código:</strong>{' '}
                            {equipoAAsignar.codigoActivo}
                        </p>

                        <p>
                            <strong>Equipo:</strong>{' '}
                            {equipoAAsignar.nombreTipoEquipo}
                        </p>

                        <p>
                            <strong>Marca:</strong>{' '}
                            {equipoAAsignar.marca}
                        </p>

                        <p>
                            <strong>Serial:</strong>{' '}
                            {equipoAAsignar.serial}
                        </p>

                    </div>

                )}


                {/* COLABORADOR */}

                <label>
                    Colaborador:
                </label>

                <select
                    value={colaboradorSeleccionado}
                    onChange={(e) =>
                        setColaboradorSeleccionado(
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg p-2"
                >

                    <option value="">
                        Selecciona un colaborador
                    </option>

                    {colaboradores.map(
                        (colaborador) => (

                            <option
                                key={colaborador.id}
                                value={colaborador.id}
                            >
                                {colaborador.nombrecompleto}
                            </option>

                        )
                    )}

                </select>


                {/* OBSERVACIÓN */}

                <label className="block mt-4 mb-2">
                    Observación
                </label>

                <textarea
                    value={observacion}
                    onChange={(e) =>
                        setObservacion(
                            e.target.value
                        )
                    }
                    placeholder="Observación de la asignación..."
                    className="w-full border rounded-lg p-2"
                    rows={3}
                />


                {/* MENSAJE ERROR */}

                {mensajeError && (

                    <p className="text-red-600 mt-3">
                        {mensajeError}
                    </p>

                )}


                {/* MENSAJE ÉXITO */}

                {mensajeExito && (

                    <p className="text-green-600 mt-3">
                        {mensajeExito}
                    </p>

                )}


                {/* BOTÓN */}

                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
                >

                    {cargando
                        ? 'Asignando...'
                        : 'Asignar'
                    }

                </button>

            </form>

        </Modal>

    );

}

export default ModalAsignarEquipo;