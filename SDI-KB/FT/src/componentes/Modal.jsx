import React from "react";

function Modal({esAbierto,esCerrado,titulo,children }){
    if (!esAbierto) return null;

return(
    //fondo del modal oscuro
    <div className="fixed inset-0 bg-black/50 ">
        <div className=" bg-white w-100 h-screen ml-auto flex flex-col">
    {/*tarjta modal*/}    
        <div className="flex w-full  justify-between p-2">
            <h3 className="bg-gray-300 p-1 rounded-xl  w-80 text-center font-bold">{titulo}</h3>
            <button
            onClick={esCerrado}
            className="text-white bg-red-600  rounded-xl px-4 text-xl font-extrabold cursor-pointer hover:invert-20"
            >X</button>
        </div>
        <div className=" p-2 flex-1 flex flex-col">
    {/*contenido interno modal*/} 
        {children}
        </div>
        
        </div>
    </div>
    )
}
export default Modal;