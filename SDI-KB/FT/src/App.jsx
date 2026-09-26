import React, {useEffect, useState} from 'react';
import Login from './paginas/Login';

function App(){
  const [usuario,setUsuario] = useState(null);

  useEffect(() =>{
const userStored= localStorage.getItem('usuario');
if(userStored){
  setUsuario(JSON.parse(userStored));
}
},[]);


const cerrarSesion = () =>{
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  setUsuario(null);
};
if(!usuario){
  return <Login onLoginSuccess={(u) =>setUsuario(u)}/>;
}

return(
  <div>
    <header>
      <h1>sistem dashboard</h1>
      <div>
        <span>Bienvenido , <strong>{usuario.nombre}</strong></span>
        <button onClick={cerrarSesion}></button>
      </div>
    </header>
  </div>
)
}

export default App;