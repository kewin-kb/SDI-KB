import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import axios from 'axios';

function ModalAgregarEquipo({esAbierto, esCerrado, alGuardarSuccess, equipoAEditar = null}){

    const esModoEdicion = Boolean(equipoAEditar);

    const [primTipo, setPrimTipo] = useState('');
    const [tiposEquipos,setTipoEquipos] = useState([]);
    const [cargandoTiposEquipos, setCargandoTipoEquipo] = useState(true);

    const [hostname, setHostname] = useState('');
    const [marca, setMarca] =useState('');
    const [modelo, setModelo] =useState('');
    const [serial, setSerial] =useState('');
    const [procesador, setProcesador] =useState('');
    const [ram, setRam] = useState('');

    const [primDisco, setPrimDisco] = useState('');
    const [tipoDisco,setTipoDisco]=useState([]);
    const [disco, setDisco] = useState('');
    const [cargandoTipoDisco, setCargandoTipoDisco] = useState(true);

    const [primerSO, setPrimerSO] = useState('');
    const [tipoSO, setTipoSO] = useState([]);
    const [cargandoTipoSO,setCargandoTipoSO] =useState(''); 

    const [fechaCompra, setFechaCompra] = useState('');
    const [garantia,setGarantia] = useState('');

    const [mensajeError, setMensajeError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

    useEffect(() =>{

      if (!esAbierto) return;

      const cargarInfoquipo = async() =>{
        try{
          const [resTipo, resDisco, resSO] = await Promise.all([
            axios.get('http://localhost:5050/api/equipo/tipo'),
            axios.get('http://localhost:5050/api/equipo/disco'),
            axios.get('http://localhost:5050/api/equipo/so')
          ]);
          setTipoEquipos(resTipo.data);
          setTipoDisco(resDisco.data);
          setTipoSO(resSO.data);

          if(!equipoAEditar){
            if (resTipo.data.length > 0) setPrimTipo(resTipo.data[0].id);
            if (resDisco.data.length > 0) setPrimDisco(resDisco.data[0].id);
            if (resSO.data.length > 0) setPrimerSO(resSO.data[0].id);
          }
        }catch(err){
          console.log('Error al cargar tipos',err);
          setMensajeError('Erro al cargar opciones del formulario');
        }finally{
          setCargandoTipoEquipo(false);
          setCargandoTipoDisco(false);
          setCargandoTipoSO(false);
        }
      };
      cargarInfoquipo();
    }, [esAbierto,equipoAEditar]);

  useEffect(() =>{
    if (!esAbierto) return;

    if(esModoEdicion && equipoAEditar){
      setHostname(equipoAEditar.hostname || '');
      setMarca(equipoAEditar.marca || '');
      setModelo(equipoAEditar.modelo || '');
      setSerial(equipoAEditar.serial || '');
      setProcesador(equipoAEditar.procesador || '');
      setRam(equipoAEditar.ram || '');
      setDisco(equipoAEditar.disco || '');
      setGarantia(equipoAEditar.garantia || ''); 
      if (equipoAEditar.fechacompra){
        setFechaCompra(new Date (equipoAEditar.fechacompra).toISOString().split('T')[0]);
      }else {
        setFechaCompra('');
      }
      setPrimTipo(equipoAEditar.tipoequipo || '');
      setPrimDisco(equipoAEditar.tipodisco || '');
      setPrimerSO(equipoAEditar.tiposistope || '');
    }else {
      limpiarFormulario();
    }
  }, [esAbierto, equipoAEditar]);


{/*LIMPIAR DEPSUES DE AGREGAR UN EQUIPO*/}
const  limpiarFormulario = () =>{
  setMarca('');
  setHostname('');
  setModelo('');
  setSerial('');
  setProcesador('');
  setRam('');
  setDisco('');
  setFechaCompra('');
  setGarantia('');
  setMensajeError('');
  setMensajeExito('');
 };



const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');
    setMensajeExito('');

  const carga ={
    tipoequipo: parseInt(primTipo,10),
    marca,
    hostname,
    modelo,
    serial,
    procesador,
    ram:  parseInt(ram, 10),
    tipodisco: parseInt(primDisco, 10),
    disco: parseInt(disco, 10),
    tiposistope: parseInt(primerSO, 10),
    fechacompra: fechaCompra,
    garantia: parseInt(garantia, 10),
    usuario_id: usuarioGuardado?.id,
    };

    try{
      if(esModoEdicion){

        await axios.put(`http://localhost:5050/api/equipo/editar/${equipoAEditar.idEquipo}`, carga);
        setMensajeExito('Equipo actualizado exitosamente');
      }else{
        await  axios.post('http://localhost:5050/api/equipo/agregarequipo',carga);
        setMensajeExito('Equipo agregado exitosamente');
      }
      if(alGuardarSuccess) alGuardarSuccess();

      setTimeout(()=>{
        limpiarFormulario();
        if(esCerrado) esCerrado();
      }, 1200);
    }catch(err){
      console.error('Error al guardar equipo:', err);
      setMensajeError(err.response?.data?.mensaje || 'Eroror al procesar la solicitud');
    }
  };

const manejarCierre = () =>{
  limpiarFormulario();
  if(esCerrado) esCerrado();
};

return(
  
    <Modal
    esAbierto={esAbierto}
    esCerrado={manejarCierre}
    titulo={esModoEdicion ? `Editar Equipo: ${equipoAEditar?.serial || ''}`: "Agregar nuevo equipo"}>
        

  <form
    onSubmit={handleSubmit}
    className="flex flex-col h-full">

    <div className="space-y-3">
    <div className="flex items-center gap-3">
      <label>
        Tipo de equipo:
      </label>

      {cargandoTiposEquipos ? (
        <p>Cargando tipo de equipo...</p>
      ) : (
        <select
          value={primTipo}
          onChange={(e) => setPrimTipo(e.target.value)}
          className="bg-gray-200 flex-1 rounded-xl p-0.5 pl-1"
        >
          {tiposEquipos.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
        </select>
      )}
    </div>
    
    <div className="flex items-center gap-4">
        <label>Hostname:</label>
        <input type="text"
        value={hostname}
        onChange={(e) =>setHostname(e.target.value)}
        className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
        placeholder="Ingresa hostname..."
        required
         />
    </div>


    <div className="flex items-center gap-4">
        <label>Marca:</label>
        <input type="text"
        value={marca}
        onChange={(e) =>setMarca(e.target.value)}
        className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
        placeholder="Ingresa marca..."
        required
         />
    </div>
     <div className="flex items-center gap-4">
        <label>Modelo:</label>
        <input type="text"
        value={modelo}
        onChange={(e) =>setModelo(e.target.value)}
        className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
        placeholder="Ingresa modelo..."
        required
         />
    </div>
     <div className="flex items-center gap-4">
        <label>Serial:</label>
        <input type="text"
        value={serial}
        onChange={(e) =>setSerial(e.target.value)}
        className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
        placeholder="Ingresa serial..."
        required
         />
    </div>
    <div className="flex items-center gap-4">
        <label>Procesador:</label>
        <input type="text"
        value={procesador}
        onChange={(e) =>setProcesador(e.target.value)}
        className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
        placeholder="Ingresa procesador..."
        required
         />
    </div>
    <div className="flex items-center gap-4">
        <label>Ram:</label>
        <input type="number"
        value={ram}
        onChange={(e) =>setRam(e.target.value)}
        className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
        placeholder="Ingresa ram en (GB)..."
        required
         />
    </div>
    <div className="flex items-center gap-3">
      <label>
        Tipo de disco:
      </label>

      {cargandoTipoDisco ? (
        <p>Cargando tipo de disco...</p>
      ) : (
        <select
          value={primDisco}
          onChange={(e) => setPrimDisco(e.target.value)}
          className="bg-gray-200 flex-1 rounded-xl p-0.5 pl-1"
        >
          {tipoDisco.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
        </select>
      )}
    </div>
    <div className="flex items-center gap-4">
        <label>Disco:</label>
        <input type="number"
        value={disco}
        onChange={(e) =>setDisco(e.target.value)}
        className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
        placeholder="Ingresa disco en (GB)..."
        required
         />
    </div>
    <div className="flex items-center gap-3">
      <label>
        Sistema operativo:
      </label>

      {cargandoTipoSO ? (
        <p>Cargando tipo de so...</p>
      ) : (
        <select
          value={primerSO}
          onChange={(e) => setPrimerSO(e.target.value)}
          className="bg-gray-200 flex-1 rounded-xl p-0.5 pl-1"
        >
          {tipoSO.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
        </select>
      )}
    </div>
    <div className="flex items-center gap-4">
        <label>Fecha compra:</label>
        <input type="date"
        value={fechaCompra}
        onChange={(e) =>setFechaCompra(e.target.value)}
        className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
        placeholder="Ingresa fecha compra"
        required
         />
    </div>
    <div className="flex items-center gap-4">
        <label>Garantia:</label>
        <input type="number"
        value={garantia}
        onChange={(e) =>setGarantia(e.target.value)}
        className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
        placeholder="Ingresa garantia en meses..."
        required
         />
    </div>
    



    </div>

   
    <div className="mt-auto pt-4  flex gap-2">
      <button
        type="submit"
        className="bg-blue-600 flex-1 p-1 rounded-lg font-bold text-white hover:invert-25 cursor-pointer "
      >
        {esModoEdicion ? 'Guardar Cambios' : 'Guardar equipo'}
      </button>
      <button
        type="button"
        onClick={esCerrado}
        className="rounded-lg bg-gray-300 p-1 hover:invert-20 cursor-pointer font-bold"
      >
        Cancelar
      </button>
    </div>

  </form>
  {mensajeError && (
      <div className="bg-red-100 text-red-600 p-2 rounded-lg text-sm text-center mt-2">
        {mensajeError}
      </div>
    )}
   {mensajeExito && (
      <div className="bg-green-100 text-green-600 p-2 rounded-lg text-sm mt-2">
        {mensajeExito}
      </div>
    )}
                
    </Modal>

)
}

export default ModalAgregarEquipo;