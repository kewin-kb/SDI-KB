import React, { useEffect, useState } from 'react';
import ModalAgregarEquipo from '../componentes/modales/ModalAgregarEquipo';
import ModalVerEquipo from '../componentes/modales/ModalVerEquipo';
import axios from 'axios';


function Inventario (){
    const [modalFormularioAbierto, setModalFormularioAbierto] = useState(false);
    const [todosEquipos, setTodosEquipos]=useState([]);

    const [modalVerEquipo, setModalVerEquipo] = useState(false);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

    const cargarInventario = () => {
    axios.get('http://localhost:5050/api/equipo/todosequipos')
      .then((response) => {
        setTodosEquipos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener inventario', error);
      });
  };

  useEffect(() => {
    cargarInventario();
  }, []);


//abrir modal para gregar nuevo equipo
const abrirModalAgregar = () =>{
    setEquipoSeleccionado(null);
    setModalFormularioAbierto(true);
};

//abrir modal para editar equipo registrado
const abrirModalEditar = (equipo) =>{
    setEquipoSeleccionado(equipo);
    setModalFormularioAbierto(true);
};

//ACTIVAR MODAL PARA VER EQUIPO
    const ventanaEditarEquipo = (todosEquipos) =>{
        setEquipoSeleccionado(todosEquipos);
        setModalVerEquipo(true);
    };

return(
    <div className=''>
    <h2 className="text-center w-full text-3xl font-bold">INVENTARIOS</h2>

    <div className=''>
        <div className='grid grid-cols-2 space-x-1'>
        <a onClick={() => setModalFormularioAbierto(true)} className="bg-blue-600  flex justify-center items-center cursor-pointer rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/agregar.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Agregar equipo</span>
        </a>

        <a href='#' className="bg-blue-600  flex justify-center items-center cursor-pointer rounded-xl p-1 text-white hover:invert-20 ">
                <img src="./img/descargar.svg" alt="" className="w-8 brightness-0 invert" />
                <span className="">Descargar inventario</span>
        </a>
        </div>
    </div>

    <div className=' mt-2'>
        <table className=" w-full border-collapse border border-gray-400 ">
            <thead>
            <tr>
                <th className='border-2 border-gray-300'>Tipo</th>
                <th className='border-2 border-gray-300'>Marca</th>
                <th className='border-2 border-gray-300'>Modelo</th>
                <th className='border-2 border-gray-300'>Serial</th>
                <th className='border-2 border-gray-300'>Hostname</th>
                <th className='border-2 border-gray-300'>Estado</th>
                <th className='border-2 border-gray-300'>Asignado a</th>
                <th className='border-2 border-gray-300'>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {todosEquipos.map((todosEquipos) =>(
            <tr key={todosEquipos.idEquipo}>

                <td className='border-2 border-gray-300 pl-1'>{todosEquipos.nombreTipoEquipo}</td>
                <td className='border-2 border-gray-300 pl-1'>{todosEquipos.marca}</td>
                <td className='border-2 border-gray-300 pl-1'>{todosEquipos.modelo}</td>
                <td className='border-2 border-gray-300 pl-1'>{todosEquipos.serial}</td>
                <td className='border-2 border-gray-300 pl-1'>{todosEquipos.hostname}</td>
                <td className='border-2 border-gray-300 pl-1'>{todosEquipos.tipoEstadoAsignado}</td>
                <td className='border-2 border-gray-300 pl-1'>prueb</td>
                <td className='border-2 border-gray-300 flex'>
                    <button className='w-full justify-center items-center flex border rounded-2xl hover:invert-90 cursor-pointer'
                    onClick={()=>ventanaEditarEquipo(todosEquipos)}>
                    <img src="./img/ojo.svg" alt=""
                    className='w-5'
                    />
                    </button>
                    <button className='w-full justify-center items-center flex border rounded-2xl'
                    title="Editar Equipo"
                    onClick={() => abrirModalEditar(todosEquipos)}
                    >
                    <img src="./img/editar.svg" alt=""
                    className='w-5'
                    />
                    </button>
                    <button className='w-full justify-center items-center flex border rounded-2xl'>
                    <img src="./img/opciones.svg" alt=""
                    className='w-5'
                    />
                    </button>
                </td>
                
            </tr>
                ))}
                
        
            </tbody>
        </table>
    </div>






    <ModalAgregarEquipo
        esAbierto={modalFormularioAbierto}
        esCerrado={() => {
          setModalFormularioAbierto(false);
          setEquipoSeleccionado(null);
        }}
        equipoAEditar={equipoSeleccionado}
        esAgregarEquipo={cargarInventario}
      />

      <ModalVerEquipo
      esAbierto={modalVerEquipo}
      esCerrado={()=>{
        setModalVerEquipo(false);
        setEquipoSeleccionado(null);
      }}
      equipoVer ={equipoSeleccionado}
      esEquipoVer={todosEquipos}
      />    
    </div>
    
    )
}
export default Inventario;