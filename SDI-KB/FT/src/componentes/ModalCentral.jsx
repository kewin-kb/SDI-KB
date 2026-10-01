import React from "react";

function ModalCentrado({esAbierto,esCerrado,titulo,children}){
    if (!esAbierto) return null;
    return(
        <div className="fixed bg-black/50  p-2 inset-0 flex justify-center  content-center ">
            <div className="bg-white ">
            <div className="bg-black/20">
            <h3>{titulo}</h3>
            <button onClick={esCerrado}>X</button>
            </div>
            <div>
                {children}
            </div>
            </div>

        </div>
    )
}

export default ModalCentrado;