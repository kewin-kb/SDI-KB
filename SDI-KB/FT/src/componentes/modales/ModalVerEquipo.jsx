import React from "react";
import ModalCentrado from "../ModalCentral";

function ModalVerEquipo({ esAbierto, esCerrado, equipoVer }) {
  if (!equipoVer) return null;

  return (
    <ModalCentrado esAbierto={esAbierto} esCerrado={esCerrado} titulo={`Detalles de: ${equipoVer.hostname || 'Equipo'}`}>
      <div className="space-y-3 text-sm text-slate-700">
        <div className="grid grid-cols-2 gap-2 border-b pb-2">
          <span className="font-semibold">Tipo:</span>
          <span>{equipoVer.nombretipoequipo || 'N/A'}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-b pb-2">
          <span className="font-semibold">Marca / Modelo:</span>
          <span>{equipoVer.marca} - {equipoVer.modelo}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-b pb-2">
          <span className="font-semibold">Serial:</span>
          <span className="font-mono bg-gray-100 p-1 rounded">{equipoVer.serial}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-b pb-2">
          <span className="font-semibold">Hostname:</span>
          <span>{equipoVer.hostname}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-b pb-2">
          <span className="font-semibold">Procesador / RAM:</span>
          <span>{equipoVer.procesador} | {equipoVer.ram} GB</span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-b pb-2">
          <span className="font-semibold">Disco:</span>
          <span>{equipoVer.disco} GB</span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-b pb-2">
          <span className="font-semibold">Estado:</span>
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium w-fit">
            {equipoVer.tipoestadoasignado || 'Activo'}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={esCerrado}
          className="bg-slate-700 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </ModalCentrado>
  );
}

export default ModalVerEquipo;