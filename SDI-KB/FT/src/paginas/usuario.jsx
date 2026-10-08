import React, { useEffect, useState } from "react";
import ModalAgregarUsuario from "../componentes/modales/ModalAgregarUsuario";
import axios from "axios";

function Inventario (){

const [modalAgregarUsuarioAbierto, setModalAgregarUsuarioAbierto]=useState(false);
const [todosColaboradores, setTodosColaboradores] = useState([]);

const cargarColaborador = () =>{
    axios.get('http://localhost:5050/api/colaborador/vercolaboradores')
    .then((response) =>{
        setTodosColaboradores(response.data);
    })
    .catch((error) =>{
        console.error('Error al obtener colaboradores', error)
    })
};

useEffect(() =>{
    cargarColaborador();
}, []);


    return(
        <div>
            <div>
            <a onClick={() => setModalAgregarUsuarioAbierto(true)} className="bg-blue-600 flex justify-center items-center cursor-pointer rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/agregar-usuario.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Agregar nuevo colaborador</span>
            </a>
            </div>

            <div className="">
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border-2 border-gray-300 pl-1">Nombre</th>
                            <th className="border-2 border-gray-300 pl-1">Apellido</th>
                            <th className="border-2 border-gray-300 pl-1">Cedula</th>
                            <th className="border-2 border-gray-300 pl-1">Area</th>
                            <th className="border-2 border-gray-300 pl-1">cargo</th>
                        </tr>
                    </thead>
                    <tbody>
                    {todosColaboradores.map((todosColaborador) =>(
                    <tr>
                            <td className="border-2 border-gray-300 pl-1">{todosColaborador.nombrecompleto}</td>
                            <td className="border-2 border-gray-300 pl-1">{todosColaborador.apellido}</td>
                            <td className="border-2 border-gray-300 pl-1">{todosColaborador.cedula}</td>
                            <td className="border-2 border-gray-300 pl-1">{todosColaborador.nombre_Area}</td>
                            <td className="border-2 border-gray-300 pl-1">{todosColaborador.cargo}</td>
                    </tr>
                    ))}

                    </tbody>
                </table>
                </div>
           




<ModalAgregarUsuario
        esAbierto={modalAgregarUsuarioAbierto}
        esCerrado={() => setModalAgregarUsuarioAbierto(false)}
        esAgregarColaborador={() => {
          console.log('Colaborador registrado');
        }}
/>            
        </div>




    )
}
export default Inventario;