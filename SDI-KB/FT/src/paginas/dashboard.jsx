import React from "react";
import Modal from "../componentes/Modal";


function Dashboard (){
    return(
        <div>
            <h2 className="text-center w-full text-3xl font-bold">DASHBOARD</h2>

        <div className="grid grid-cols-3">
            <a href="/" className="bg-blue-600 m-2 flex justify-center items-center rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/agregar.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Agregar equipo</span>
            </a>
            <a href="/" className="bg-blue-600 m-2 flex justify-center items-center rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/agregar.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Agregar colaborador</span>
            </a>
            <a href="/" className="bg-blue-600 m-2 flex justify-center items-center rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/agregar.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Asignar equipo</span>
            </a>

        </div>
        </div>
    )
}
export default Dashboard;