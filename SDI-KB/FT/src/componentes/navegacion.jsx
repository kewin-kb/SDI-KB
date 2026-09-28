import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function BarraNavegacion({usuario, cerrarSesion}){

    const navegacion = useNavigate();

    const cerrarSesionClick = () =>{
        cerrarSesion();
        navegacion('/Login');
    
    };
    const activo = (path) =>location.pathname === path;

return(
        <div>
         <aside className='w-60 bg-blue-600 h-screen fixed flex flex-col'>
            <div className='px-4 mt-5'>
                <img src="../img/LOGO.png" alt="" 
                className='brightness-0 invert'/>
            </div>
            <nav className='flex items-center flex-1 my-8 text-xl text-white'>
                <ul className='w-full'>
                    <li className='mt-2'>
                     <Link to="/"
                     className={`flex ${activo('/')
                     ?'rounded-l-lg p-1 items-center bg-white text-black'
                     :'rounded-l-lg p-1 items-center  hover:bg-blue-500'}`}>
                        <img src="../img/inicio.svg" alt="" 
                        className='w-8'/>
                        <span>Dashboard</span>
                     </Link>
                    </li>
                    <li className='mt-2 ml-1'>
                     <Link to="/inventario"
                     className={`flex ${activo('/inventario')
                     ?'rounded-l-lg p-1 items-center bg-white text-black'
                     :'rounded-l-lg p-1 items-center  hover:bg-blue-500'}`}>
                        <img src="../img/inventario.svg" alt="" 
                        className='w-8'/>
                        <span>Inventario</span>
                     </Link>
                    </li>

                    <li className='mt-2 ml-1'>
                     <Link to="/usuario"
                     className={`flex ${activo('/usuario')
                     ?'rounded-l-lg p-1 items-center bg-white text-black'
                     :'rounded-l-lg p-1 items-center  hover:bg-blue-500'}`}>
                        <img src="../img/usuario.svg" alt="" 
                        className='w-8'/>
                        <span>Usuario</span>
                     </Link>
                    </li>
                </ul>
            </nav>
            <div className='px-4'>
                <button onClick={cerrarSesionClick}
                className='w-full text-black font-medium rounded-xl py-2 mb-2 bg-white hover:bg-blue-400 hover:text-white cursor-pointer'>
                    Cerrar sesion
                </button>
            </div>
         </aside>
        
        <main className='ml-60 p-2 min-h-screen'>
        <Outlet />
      </main>
        </div>
    )
}
export default BarraNavegacion;