import React from "react";

function ModalCentrado({esAbierto,esCerrado,titulo,children}){
    if (!esAbierto) return null;
    return(
        <div className="fixed bg-black/50   inset-0 flex justify-center items-center ">
            <div className="bg-white h-200 p-3 rounded-2xl min-w-2/4">

            <div className="w-full flex justify-between">
            <h3 className="w-full text-center font-bold text-4xl mb-3">{titulo}</h3>
            <button onClick={esCerrado}
            className="bg-red-500 text-4xl rounded-3xl px-1 text-white hover:invert-25 cursor-pointer">X</button>
            </div>
            <div>
                {children}
            </div>
            </div>

        </div>
    )
}

export default ModalCentrado;