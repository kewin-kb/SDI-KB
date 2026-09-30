import React, { useState }  from "react";
import ModalAgregarEquipo from '../componentes/modales/ModalAgregarEquipo';
import ModalAgregarUsuario from "../componentes/modales/ModalAgregarUsuario";



function Dashboard (){
    const [modalAgregarEquipoAbierto, setModalAgregarEquipoAbierto] = useState(false);
    const [modalAgregarUsuarioAbierto, setModalAgregarUsuarioAbierto]=useState(false);

    return(
        <div>
            <h2 className="text-center w-full text-3xl font-bold">DASHBOARD</h2>

        <div className="grid grid-cols-3">
            <a onClick={() => setModalAgregarEquipoAbierto(true)} className="bg-blue-600 m-2 flex justify-center items-center cursor-pointer rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/agregar.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Agregar equipo</span>
            </a>
            <a onClick={() => setModalAgregarUsuarioAbierto(true)} className="bg-blue-600 m-2 flex justify-center items-center cursor-pointer rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/agregar-usuario.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Agregar colaborador</span>
            </a>
            <a href="/" className="bg-blue-600 m-2 flex justify-center items-center rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/asignar.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Asignar equipo</span>
            </a>

        </div>

        <div className="grid grid-cols-4 space-x-2">

            <div className=" rounded-2xl border-2 p-1 flex">
                <div className="col-span-2 text-3xl font-semibold bg-amber-950">Total equipos
                    <span className="font-bold">150</span>
                </div>
                <div className="bg-amber-300">
                    <img src="./img/cpu.svg" alt="cpu" 
                    className="w-20 bg-blue-200 rounded-4xl p-1"/>
                </div>
            </div>


            <div className="bg-amber-300">hola</div>
            <div className="bg-purple-400">hola</div>
            <div className="bg-purple-400">hola</div>
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