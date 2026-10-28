import React, { useState } from "react";
import ModalCentrado from "../ModalCentral";
import { useEffect } from "react";
import axios from "axios";

function ModalVerEquipo({ esAbierto, esCerrado, equipoVer }) {
  const [pestanaActiva, setPestanaActiva] = useState('general');
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if(!esAbierto || !equipoVer?.idActivo){
      return;
    }
    const cargarHistorial = async() =>{
      try{
        setCargando(true);
        const respuesta = await axios.get(
          `http://localhost:5050/api/equipo/historial/${equipoVer.idActivo}`
        );
        setHistorial(respuesta.data);
      }catch(error){
        console.error('Error al cargar historial', error);
        setHistorial([]);
      }finally{
        setCargando(false);
      }
    };
    cargarHistorial();
  },[esAbierto, equipoVer]);

  if (!equipoVer) return null;

  return (

    <ModalCentrado esAbierto={esAbierto} esCerrado={esCerrado} titulo={"Detalles del equipo"}>

    <div className="">
      <div className=" flex justify-center text-3xl">
        <h4 className="font-bold">Equipo:</h4>
        <span className="bg-blue-600 rounded-2xl px-1 text-white font-bold">{equipoVer.serial}</span>

      </div>

      <div className="justify-between flex border-blue-600 text-center border-b-2 font-bold mt-2">
        <button
        onClick={()=>setPestanaActiva('general')}
        className={`mx-1 w-full rounded-t-lg cursor-pointer
        ${pestanaActiva === 'general'
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-black hover:bg-gray-200'
        }`}>Información</button>

        <button
        onClick={()=>setPestanaActiva('asignacion')}
        className={`mx-1 w-full rounded-t-lg cursor-pointer
        ${pestanaActiva === 'asignacion'
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-black hover:bg-gray-200'
        }`}>Asignación</button>


        <button
        onClick={()=>setPestanaActiva('mantenimiento')}
        className={`mx-1 w-full rounded-t-lg cursor-pointer
        ${pestanaActiva === 'mantenimiento'
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-black hover:bg-gray-200'
        }`}>Mantenimiento</button>


        <button
        onClick={()=>setPestanaActiva('historial')}
        className={`mx-1 w-full rounded-t-lg cursor-pointer
        ${pestanaActiva === 'historial'
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-black hover:bg-gray-200'
        }`}>Historial</button>
        
      </div>

        {pestanaActiva === 'general' && (

            <div className="m-2">
              <div className="grid grid-flow-col grid-row-3 gap-4">
              <div className="row-span-2 bg-gray-200 rounded-2xl p-2 text-xl">

                <div className="text-center">
                <span className="font-bold text-2xl">Estado:{equipoVer.nombreTipoEquipo|| 'N/A'}</span>
                </div>

                <div className="border-b pb-1">
                <span className="font-bold">Marca: </span>
                <span>{equipoVer.marca || 'N/A'}</span>
                </div>

                <div className="border-b pb-1">
                <span className="font-bold">Modelo: </span>
                <span>{equipoVer.modelo || 'N/A'}</span>
                </div>

                <div className="border-b pb-1">
                <span className="font-bold">Serial: </span>
                <span>{equipoVer.serial|| 'N/A'}</span>
                </div>

                <div className="border-b pb-1">
                <span className="font-bold">Hostname: </span>
                <span>{equipoVer.hostname|| 'N/A'}</span>
                </div>

                <div className="border-b pb-1">
                <span className="font-bold">Procesador: </span>
                <span>{equipoVer.procesador|| 'N/A'}</span>
                </div>


                <div className="border-b pb-1">
                <span className="font-bold">Ram: </span>
                <span>{equipoVer.ram || 'N/A'}GB</span>
                </div>


                <div className="border-b pb-1">
                <span className="font-bold">Tipo disco: </span>
                <span>{equipoVer.nombreTipoDisco|| 'N/A'}</span>
                </div>

                <div className="border-b pb-1">
                <span className="font-bold">Disco: </span>
                <span>{equipoVer.disco || 'N/A'}GB</span>
                </div>

                <div className="border-b pb-1">
                <span className="font-bold">Sistema operativo: </span>
                <span>{equipoVer.tipoSitemaOperativo || 'N/A'}</span>
                </div>

                <div className="border-b pb-1">
                <span className="font-bold">Fecha compra: </span>
                <span>{equipoVer.fechacompra || 'N/A'}</span>
                </div>

                <div className="border-b pb-1">
                <span className="font-bold">Garantia: </span>
                <span>{equipoVer.garantia || 'N/A'} meses</span>
                </div>
              </div>


              <div className="bg-gray-200 rounded-2xl p-2">
                <div className="border-b pb-1">
                  <span className="text-xl font-bold">Asignación actual</span>
                </div>

                <div className="border-b pb-1">
                  <span className="font-bold">Nombre:</span>
                  <span>{equipoVer.nombreColaborador || 'N/A'}</span>
                </div>


                <div className="border-b pb-1">
                  <span className="font-bold">Area:</span>
                  <span>{equipoVer.areColaborador || 'N/A'}</span>
                </div>


                <div className="border-b pb-1">
                  <span className="font-bold">Cargo:</span>
                  <span>{equipoVer.cargoColaborador|| 'N/A'}</span>
                </div>

                <div>
                  <span className="font-bold">Asignado desde:</span>
                  <span>{equipoVer.asignadoColaborador|| 'N/A'}</span>
                </div>


              </div>


              <div className="bg-gray-200 rounded-2xl p-1 ">
                <span className="flex text-center justify-center text-2xl font-bold pb-2">Acciones rapidas</span>
                <div className=" content-center">
                <a href="" className="flex border-2 rounded-xl  border-blue-600 text-center justify-center mb-2 hover:invert-50 ">
                  <img src="./img/editar.svg" alt=""
                    className='w-5'
                    />
                  Editar equipo</a>

                <a href="" className="flex border-2 rounded-xl  border-blue-600 text-center justify-center mb-2 hover:invert-50 ">
                  <img src="./img/Mante.svg" alt=""
                    className='w-5'
                    />
                  Registrar mantenimiento</a>

                <a href="" className="flex border-2 rounded-xl  border-blue-600 text-center justify-center hover:invert-50">
                  <img src="./img/elimin.svg" alt=""
                    className='w-5'
                    />
                  Dar de baja</a>
              </div>
              </div>
              </div>


              
            </div>
          )}

         {pestanaActiva === 'asignacion' && (
            <div>
              holas asginacion
            </div>
         )}

         {pestanaActiva === 'historial' && (
            <div>

              <div className="text-center text-2xl font-bold pt-2">Historial de modificaciones </div>
              <div>
                <table className="w-full">
                  <thead>
                  <tr>
                    <th className="border-2 border-gray-300">Modificación</th>
                    <th className="border-2 border-gray-300">Tipo campo</th>
                    <th className="border-2 border-gray-300">Anterior</th>
                    <th className="border-2 border-gray-300">Nuevo</th>
                    <th className="border-2 border-gray-300">Obervacion</th>
                    <th className="border-2 border-gray-300">Fecha</th>
                    <th className="border-2 border-gray-300">Quien edito</th>
                    
                  </tr>
                  </thead>
                  <tbody className="text-center">
                    {historial.map((historialVer) =>(
                      <tr key={historialVer.id}>
                    
                    
                    <td className="border-2 border-gray-300">{historialVer.accion}</td>
                    <td className="border-2 border-gray-300">{historialVer.campo_modificado || '-'}</td>
                    <td className="border-2 border-gray-300">{historialVer.valor_anterior || '-' }</td>
                    <td className="border-2 border-gray-300">{historialVer.valor_nuevo || '-'}</td>
                    <td className="border-2 border-gray-300">{historialVer.observacion|| '-'}</td>
                    <td className="border-2 border-gray-300">{historialVer.fecha|| '-'}</td>
                    <td className="border-2 border-gray-300">{historialVer.usuario|| '-'}</td>
                    
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
         )}



      <div className="mt-6 flex justify-end">
        <button
          onClick={esCerrado}
          className="bg-slate-700 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors"
        >
          Cerrar
        </button>
      </div>
      </div>
    </ModalCentrado>
  );
}

export default ModalVerEquipo;