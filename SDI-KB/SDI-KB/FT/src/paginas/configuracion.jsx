import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalAgregarUsuario from "../componentes/modales/ModalAgregarUsuario";

function Configuracion (){
    const [todosUsuarios,setTodosUsuarios] = useState([]);
    const [modalAgregarUsuarioAbierto,setModalAgregarUsuarioAbierto]=useState(false);

    const cargarUsuario = () =>{
        axios.get('http://localhost:5050/api/usuario/usuarios')
        .then((response) =>{
            setTodosUsuarios(response.data);
        })
        .catch((error) =>{
            console.error('Error al obtener usuarios',error)
        })
    };

useEffect(() =>{
    cargarUsuario();
}, []);
return(
    <div>
        {/*Agregar un nuevo usuario*/}
    <div>
            <a onClick={()=>setModalAgregarUsuarioAbierto(true)} className="bg-blue-600 flex justify-center items-center cursor-pointer rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/agregar-usuario.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Agregar nuevo usuario</span>
            </a>
    </div>
    <div>
        
    <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border-2 border-gray-300 pl-1">Usuario</th>
                            <th className="border-2 border-gray-300 pl-1">Nombre</th>
                            <th className="border-2 border-gray-300 pl-1">Tipo usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                    {todosUsuarios.map((todosUsuarios) =>(
                    <tr key={todosUsuarios.id}>
                            <td className="border-2 border-gray-300 pl-1">{todosUsuarios.usuario}</td>
                            <td className="border-2 border-gray-300 pl-1">{todosUsuarios.nombre}</td>
                            <td className="border-2 border-gray-300 pl-1">{todosUsuarios.Tipo_usuario || '-'}</td>
                    </tr>
                    ))}

                    </tbody>
        </table>




    </div>
<ModalAgregarUsuario
    esAbierto={modalAgregarUsuarioAbierto}
    esCerrado={()=> setModalAgregarUsuarioAbierto(false)}
    esAgregarUsuario={()=>{
        console.log('Usuario registrado');
    }}
/>
    </div>
)
}
export default Configuracion;