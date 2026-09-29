import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App({onLoginSucess}) {
  const[usuario, setUsuario] = useState('');
  const[contrasena,setContrasena]=useState('');
  const[nombre,setNombre]=useState('');
  const[error, setError] = useState('');

  const registrarUsuario = async(e) =>{
    e.preventDefault();
    setError('');

    try{
      const res = await axios.post('http://localhost:5050/api/usuario/registrar',{
        nombre,
        usuario,
        contrasena
      });
      
      if(onLoginSucess){
        onLoginSucess(res.data.usuario);
      }
    }
    catch(err){
      setError(err.response?.data?.mensaje || 'Error de servidor');
        
      }
  }
return(
  <div>
  <h2>Registrarse</h2>
  {/*formulario de registro*/}
  <form onSubmit={registrarUsuario}>
    <div>
      <label>Ingresa nombre completo:</label>
      <input 
      type="text" 
      value={nombre}
      onChange={(e) =>setNombre(e.target.value)}
      required
      className='border-2'
      />
    </div>
    <div>
      <label>Ingresa usuario:</label>
      <input 
      type="text" 
      value={usuario}
      onChange={(e) =>setUsuario(e.target.value)}
      required
      className='border-2'
      />
    </div>
    <div>
      <label>Ingresa contraseña:</label>
      <input 
      type="password" 
      value={contrasena}
      onChange={(e) =>setContrasena(e.target.value)}
      required
      className='border-2'
      />
    </div>
    <button
    type="submit"
    className='border-2 rounded-3xl'>Registrar</button>
  </form>
  {/*IMPRIMI ERROR */}
  {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>
)
};


export default App
