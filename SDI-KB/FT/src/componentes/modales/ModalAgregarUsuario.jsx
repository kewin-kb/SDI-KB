import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import axios from "axios";

function ModalAgregarUsuario({esAbierto,esCerrado,esAgregarUsuario}){
    const [mensajeError, setMensajeError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    const [nombre, setNombre]=useState('');
    const [usuario,setUsuario]=useState('');
    const [rolPrim,setRolPrim] = useState('');
    const [rol,setRol]=useState([]);
    const [contrasena,setContrasena]=useState('');
    

    useEffect(() =>{
        const obtenerRol = async() =>{
            try {
                const respuesta = await axios.get('http://localhost:5050/api/usuario/roles');
                setRol(respuesta.data);
                if(respuesta.data && respuesta.data.length >0){
                    setRolPrim(respuesta.data[0].id);
                }
            }catch(err){
                console.error('Error al cargar roles', err);
                setMensajeError('No cargan roles');
            }
        };
        if (esAbierto) obtenerRol();
    },[esAbierto]);
const  limpiarFormulario = () =>{
    setNombre('');

  if (rol.length > 0) setRolPrim(rol[0].id);
};

const EnviarUsuario = async (newUsuario) =>{
    newUsuario.preventDefault();
    setMensajeError('');
    setMensajeExito('');

    try{
        const idTipoRolSelec = rolPrim || (rol.length > 0 ? rol[0].id : null);

        const agregarUsuario ={
            nombre: nombre,
            usuario: usuario,
            rol:parseInt(idTipoRolSelec,10),
            password:contrasena
        };
        const respuesta = await axios.post('http://localhost:5050/api/usuario/registrar', agregarUsuario);
        setMensajeExito('Usuario registrado correctamente');
        if(esAgregarUsuario) esAgregarUsuario(respuesta.data.usuario);

        setTimeout(() => {
        limpiarFormulario();
        if (esCerrado) esCerrado();
        }, 1500);

    }catch(err){
        console.error('Error al crear usuario',err);
        setMensajeError(err.response?.data?.mensaje || 'Error al agregar usuario');
    }
};

    const manejarCierre = () => {
    limpiarFormulario();
    if (esCerrado) esCerrado();
  };

return(
  <Modal esAbierto={esAbierto} esCerrado={manejarCierre} titulo="Agregar nuevo usuario" >
    <form
    onSubmit={EnviarUsuario}
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
      <label>Usuario:</label>
      <input type="text"
      value={usuario} 
      onChange={(e)=>setUsuario(e.target.value)}
      className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
      placeholder="Ingresa usuario..."
      required
      />
    </div>

    <div className="flex items-center gap-4">
      <label>Contraseña:</label>
      <input type="password"
      value={contrasena} 
      onChange={(e)=>setContrasena(e.target.value)}
      className="flex-1 bg-gray-200 p-0.5 rounded-xl pl-1"
      placeholder="Ingresa contrasena..."
      required
      />
    </div>
    <div className="flex items-center gap-4">
        <label>Rol:</label>
        <select value={rolPrim}
        onChange={(r)=>setRolPrim(r.target.value)}
        className="bg-gray-200 flex-1 rounded-xl p-0.5 pl-1">
         {rol.map((ro) =>(
                <option value={ro.id} key={ro.id}>{ro.nombre}</option>
            ))}   

        </select>
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