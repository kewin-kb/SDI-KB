import React, { useState,useEffect }  from "react";
import ModalAgregarEquipo from '../componentes/modales/ModalAgregarEquipo';
import ModalAgregarUsuario from "../componentes/modales/ModalAgregarUsuario";
import axios from "axios";



function Dashboard (){
    const [modalAgregarEquipoAbierto, setModalAgregarEquipoAbierto] = useState(false);
    const [modalAgregarUsuarioAbierto, setModalAgregarUsuarioAbierto]=useState(false);
    const [todosEquipos, setTodosEquipos] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:5050/api/equipo/todosequipos')
        .then((response)=>{
            setTodosEquipos(response.data);
        })
        .catch((error)=>{
            console.error('Error al obtener inventatio',error);
        });
    }, []);


//FILTRAR TOTALES, DISPONIBLES, USASDO, DE BAJA
//1-Disponible, 2-Asignado, 3-De baja

    const totalEquipos = todosEquipos.length;

    const equiposDisponibles = todosEquipos.filter(
        (equipo)=>Number(equipo.estado)===1
    ).length;

    const equiposAsignados = todosEquipos.filter(
        (equipo)=>Number(equipo.estado)===2
    ).length;

    const equiposDeBaja = todosEquipos.filter(
        (equipo)=>Number(equipo.estado)===3
    ).length;




    return(
        <div className="">
            <h2 className="text-center w-full text-3xl font-bold">DASHBOARD</h2>

        <div className="grid grid-cols-3 space-x-1">
            <a onClick={() => setModalAgregarEquipoAbierto(true)} className="bg-blue-600  flex justify-center items-center cursor-pointer rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/agregar.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Agregar equipo</span>
            </a>
            <a onClick={() => setModalAgregarUsuarioAbierto(true)} className="bg-blue-600 flex justify-center items-center cursor-pointer rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/agregar-usuario.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Agregar colaborador</span>
            </a>
            <a href="/" className="bg-blue-600  flex justify-center items-center rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/asignar.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Asignar equipo</span>
            </a>

        </div>

        <div className="grid grid-cols-4 space-x-5 mt-3">

            <div className="bg-gray-300 rounded-2xl border-2 grid grid-cols-3">
                <div className="col-span-2 text-2xl font-semibold p-2">Total equipos
                    <div>
                        <span className="text-6xl font-bold">{totalEquipos}</span>
                    </div>
                </div>
                <div className="bg-blue-300 rounded-full flex justify-center m-1">
                    <img src="./img/cpu.svg" alt="cpu" 
                    className="w-20 p-2 flex justify-center"></img>
                </div>
            </div>


            <div className="bg-gray-300 rounded-2xl border-2 grid grid-cols-3">
                <div className="col-span-2 text-2xl font-semibold p-2">Disponibles<div>
                        <span className="text-6xl font-bold">{equiposDisponibles}</span>
                    </div>
                </div>
                <div className="bg-green-300 rounded-full flex justify-center m-1">
                    <img src="./img/Valida.svg" alt="cpu" 
                    className="w-20 p-2 flex justify-center"></img>
                </div>
            </div>

            <div className="bg-gray-300 rounded-2xl border-2 grid grid-cols-3">
                <div className="col-span-2 text-2xl font-semibold p-2">Asignados<div>
                        <span className="text-6xl font-bold">{equiposAsignados}</span>
                    </div>
                </div>

            <div className="bg-blue-300 rounded-full flex justify-center m-1">
                    <img src="./img/usuario.svg" alt="cpu" 
                    className="w-20 p-2 flex justify-center"></img>
                </div>
            </div>
            
            <div className="bg-gray-300 rounded-2xl border-2 grid grid-cols-3">
                <div className="col-span-2 text-2xl font-semibold p-2">De baja<div>
                        <span className="text-6xl font-bold">{equiposDeBaja}</span>
                    </div>
                </div>

            <div className="bg-yellow-200 rounded-full flex justify-center m-1">
                    <img src="./img/Mante.svg" alt="cpu" 
                    className="w-20 p-2 flex justify-center"></img>
                </div>
            </div>

        </div>



        <ModalAgregarEquipo
        esAbierto={modalAgregarEquipoAbierto}
        esCerrado={() => setModalAgregarEquipoAbierto(false)}
        esAgregarEquipo={() => {
          console.log('Equipo registrado');
        }}
      />

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
export default Dashboard;