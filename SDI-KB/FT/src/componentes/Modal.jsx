import React from "react";

function Modal({esAbierto,esCerrado,titulo,contenido }){
    if (!esAbierto) return null;

return(
    //fondo del modal oscuro
    <div className="fixed inset-0 bg-black items-center">
    {/*tarjta modal*/}    
        <div className="flex items-center">
            <h3>{titulo}</h3>
            <button
            onClick={esCerrado}
            className="text-slate-400"
            >X</button>
        </div>   
    {/*contenido interno modal*/} 
        <div className="p-6">
        {contenido}
        </div>
    </div>
    )
}
export default Modal;