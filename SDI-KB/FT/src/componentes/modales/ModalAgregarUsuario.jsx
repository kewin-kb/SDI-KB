import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import axios from 'axios';

function ModalAgregarUsuario({esAbierto, esCerrado, esAgregarUsuario}){

    const [mensajeError, setMensajeError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));


    const [nombre, setNombre]=useState('');
    const [apellido, setApellido] =useState('');
    const [cedula,setCedula]=useState('');
    const [areaPrim,setAreaPrim]=useState('');
    const [areas,setAreas]=useState([]);
    const [cargo,setCargo]=useState('');

    

    useEffect(() =>{
        const obtenerAreas = async() =>{
            try{
                const respuesta = await axios.get('http://localhost:5050/api/colaborador/areas');
                setAreas(respuesta.data);
                if (respuesta.data && respuesta.data.length > 0) {
                  setAreaPrim(respuesta.data[0].id);  
                }
            }catch(err){
                console.error('Error al cargar areas', err);
                setMensajeError('No cargan areas');
            }
        };
        if (esAbierto) obtenerAreas();
          }, [esAbierto]);

{/*LIMPIAR DEPSUES DE AGREGAR UN EQUIPO*/}
const  limpiarFormulario = () =>{
    setNombre('');
    setApellido('');
    setCedula('');
    setCargo('');
  if (areas.length > 0) setAreaPrim(areas[0].id);
};

useEffect(() => {
  if (!esAbierto) {
    limpiarFormulario();
  }
}, [esAbierto]);

const EnviarColaborador = async (e) => {
    e.preventDefault();
    setMensajeError('');
    setMensajeExito('');

    try {
      const idTipoSeleccionado = areaPrim || (areas.length > 0 ? areas[0].id : null);


      const agregarColaborador ={
        nombrecompleto: nombre,
        apellido:apellido,
        area:parseInt(idTipoSeleccionado,10),
        cedula:parseInt(cedula,10),
        cargo:cargo,
        creadopor:usuarioGuardado.id
      };
      const respuesta = await axios.post('http://localhost:5050/api/colaborador/agregarcolaborador', agregarColaborador);

      setMensajeExito('Colaborador agregado exitosamente');
     
      if (esAgregarUsuario) esAgregarUsuario(respuesta.data.usuario);

      setTimeout(() => {
        limpiarFormulario();
        if (esCerrado) esCerrado();
      }, 1500);

    } catch (err) {
      console.error('Error al enviar colaborador:', err);
      setMensajeError(err.response?.data?.mensaje || 'Error al agregar colaborador');
    }
  };

const manejarCierre = () => {
    limpiarFormulario();
    if (esCerrado) esCerrado();
  };

return(
  
    <Modal esAbierto={esAbierto} esCerrado={manejarCierre} titulo="Agregar colaborador" >
        

  <form
  onSubmit={EnviarColaborador}
    className="flex flex-col h-full">
    <div className="space-y-5">
    <div className="flex items-center gap-4">
      <label>Nombre:</label>
      <input type="text"
      value={nombre} 
      onChange={(e)=>setNombre(e.target.value)}
      className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
      placeholder="Ingresa nombre..."
      required
      />
    </div>

    <div className="flex items-center gap-4">
      <label>Apellido:</label>
      <input type="text"
      value={apellido} 
      onChange={(e)=>setApellido(e.target.value)}
      className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
      placeholder="Ingresa apellidos..."
      required
      />
    </div>

    <div className="flex items-center gap-4">
      <label>Cedula:</label>
      <input type="number"
      value={cedula} 
      onChange={(e)=>setCedula(e.target.value)}
      className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
      placeholder="Ingresa apellidos..."
      required
      />
    </div>

    <div className="flex items-center gap-4">
      <label>Area:</label>
    <select
    value={areaPrim}
    onChange={(e)=> setAreaPrim(e.target.value)}
    className="bg-gray-200 flex-1 rounded-xl p-0.5 pl-1"
    >
      {areas.map((r)=>(
        <option value={r.id} key={r.id}>
          {r.nombre}
        </option>
      ))}
      
    </select>
    </div>

    <div className="flex items-center gap-4">
      <label>Cargo:</label>
      <input type="text"
      value={cargo} 
      onChange={(e)=>setCargo(e.target.value)}
      className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
      placeholder="Ingresa cargo..."
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
        onClick={manejarCierre}
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

export default ModalAgregarUsuario;