import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import axios from 'axios';

function ModalAgregarEquipo({esAbierto, esCerrado, esAgregarEquipo}){
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
        const obtenerTipoEqui = async() =>{
            try{
                const respuesta = await axios.get('http://localhost:5050/api/equipo/tipo');
                setTipoEquipos(respuesta.data);
                if(respuesta.data && respuesta.length >0){
                  setPrimTipo(respuesta.data[0].nombre);  
                }
            }catch(err){
                console.error('Error al cargar tipo de equipos', err);
                setMensajeError('No cargan los tipos de equipos');
            }finally{
                setCargandoTipoEquipo(false);
            }
        };
        if (esAbierto) obtenerTipoEqui();
          }, [esAbierto]);

    useEffect(()=>{
        const obtenerDiscos = async() =>{
            try{
                const respuesta = await axios.get('http://localhost:5050/api/equipo/disco');
                setTipoDisco(respuesta.data);
                if(respuesta.data && respuesta.length >0){
                    setPrimDisco(respuesta.data[0].nombre);
                }
            }catch(err){
                console.error('Error al cargar tipo de discos',err)
                setMensajeError('No carga los tipos de discos');
            }finally{
                setCargandoTipoDisco(false);
            }
        };
        if (esAbierto) obtenerDiscos();
        }, [esAbierto]);

    useEffect(()=>{
      const obtenerSO = async() =>{
        try{
          const respuesta = await axios.get('http://localhost:5050/api/equipo/so');
          setTipoSO(respuesta.data);
          if(respuesta.data && respuesta.length >0){
            setPrimerSO(respuesta.data[0].nombre);
          }
        }catch(err){
          console.error('Error al cargar tipos de SO', err)
          setMensajeError('No carga tipo de so');
        }finally{
          setCargandoTipoSO(false);
        }
      };
      if (esAbierto) obtenerSO();
      }, [esAbierto]);

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
  if (tiposEquipos.length > 0) setPrimTipo(tiposEquipos[0].id);
  if (tipoDisco.length > 0) setPrimDisco(tipoDisco[0].id);
  if (tipoSO.length > 0) setPrimerSO(tipoSO[0].id);


};

useEffect(() => {
  if (!esAbierto) {
    limpiarFormulario();
  }
}, [esAbierto]);

const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');
    setMensajeExito('');

    try {
      const idTipoSeleccionado = primTipo || (tiposEquipos.length > 0 ? tiposEquipos[0].id : null);
      const idDiscoSeleccionado = primDisco || (tipoDisco.length > 0 ? tipoDisco[0].id : null);
      const idSOSeleccionado = primerSO || (tipoSO.length > 0 ? tipoSO[0].id : null); 


      const agregarEquipo ={
        tipoequipo:parseInt(idTipoSeleccionado,10),
        marca: marca,
        hostname:hostname,
        modelo:modelo,
        serial:serial,
        procesador:procesador,
        ram:ram,
        disco:parseInt(disco,10),
        tipodisco:parseInt(idDiscoSeleccionado),
        tiposistope:parseInt(idSOSeleccionado),
        fechacompra:fechaCompra,
        garantia:parseInt(garantia, 10),
        estado:1,
        usuario_id:usuarioGuardado.id
      };
      const respuesta = await axios.post('http://localhost:5000/api/equipo/agregarequipo', agregarEquipo);

      setMensajeExito('Equipo agregado exitosamente');
     
      if (esAgregarEquipo) esAgregarEquipo(respuesta.data.equipo);

      setTimeout(() => {
        limpiarFormulario();
        if (esCerrado) esCerrado();
      }, 1500);

    } catch (err) {
      console.error('Error al enviar equipo:', err);
      setMensajeError(err.response?.data?.mensaje || 'Error al agregar equipo');
    }
  };

const manejarCierre = () => {
    limpiarFormulario();
    if (esCerrado) esCerrado();
  };

return(
  
    <Modal esAbierto={esAbierto} esCerrado={manejarCierre} titulo="Agregar equipo" >
        

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
        Agregar
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