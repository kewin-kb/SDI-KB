import React, { useState } from "react";
import ModalCentrado from "../ModalCentral";

function ModalVerEquipo({ esAbierto, esCerrado, equipoVer }) {
  const [pestanaActiva, setPestanaActiva] = useState('general');

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
        className={`mx-1 w-full rounded-t-lg
        ${pestanaActiva === 'general'
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-black hover:bg-slat-200'
        }`}>Información</button>

        <button
        onClick={()=>setPestanaActiva('asignacion')}
        className={`mx-1 w-full rounded-t-lg
        ${pestanaActiva === 'asignacion'
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-black hover:bg-slat-200'
        }`}>Asignación</button>


        <button
        onClick={()=>setPestanaActiva('mantenimiento')}
        className={`mx-1 w-full rounded-t-lg
        ${pestanaActiva === 'mantenimiento'
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-black hover:bg-slat-200'
        }`}>Mantenimiento</button>


        <button
        onClick={()=>setPestanaActiva('historial')}
        className={`mx-1 w-full rounded-t-lg
        ${pestanaActiva === 'historial'
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-black hover:bg-slat-200'
        }`}>Historial</button>
        
      </div>





        {pestanaActiva === 'general' && (

            <div className="m-2">
              <div className="grid grid-flow-col grid-row-3 gap-4">
                <div className="row-span-3 bg-amber-300 rounded-2xl p-1">
                <div className="text-center">
                  <span className="text-center">Estado:{equipoVer.tipoestadoasignado}</span>
                </div>
                </div>



                <div className="bg-green-400">hol2</div>
                <div className="bg-purple-500">hola3</div>
              </div>


              <div className="grid grid-cols-2 gap-2 border-b pb-2">
                <span className="font-semibold text-slate-500">Tipo de Equipo:</span>
                <span className="font-medium">{equipoVer.nombretipoequipo || 'N/A'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b pb-2">
                <span className="font-semibold text-slate-500">Marca / Modelo:</span>
                <span className="font-medium">{equipoVer.marca} - {equipoVer.modelo}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b pb-2">
                <span className="font-semibold text-slate-500">Serial:</span>
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded border border-gray-200 w-fit">{equipoVer.serial}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b pb-2">
                <span className="font-semibold text-slate-500">Procesador:</span>
                <span className="font-medium">{equipoVer.procesador}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b pb-2">
                <span className="font-semibold text-slate-500">Memoria RAM:</span>
                <span className="font-medium">{equipoVer.ram} GB</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b pb-2">
                <span className="font-semibold text-slate-500">Disco Duro:</span>
                <span className="font-medium">{equipoVer.disco} GB</span>
              </div>
            </div>
          )}

         {pestanaActiva === 'asignacion' && (
            <div>
              holas asginacion
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