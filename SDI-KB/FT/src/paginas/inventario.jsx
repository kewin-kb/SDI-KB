import React, { useState } from 'react';
import ModalAgregarEquipo from '../componentes/modales/ModalAgregarEquipo';



function Inventario (){
    const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);

return(
    <div>
    <h2 className="text-center w-full text-3xl font-bold">INVENTARIOS</h2>

    <div>
        <button
        onClick={() => setModalAgregarAbierto(true)}
        className='bg-blue-700'
        >
            Agregar equipo
        </button>
    </div>
    <ModalAgregarEquipo
        esAbierto={modalAgregarAbierto}
        esCerrado={() => setModalAgregarAbierto(false)}
        esAgregarEquipo={() => {
          console.log('Equipo registrado');
        }}
      />
    
    </div>
    
    )
}
export default Inventario;