import React, {useState} from 'react';
import axios from 'axios';



function Login({ onLoginSuccess}){
    const [usuario,setUsuario] = useState('');
    const [password, setPassword] =useState('');
    const [error, setError] = useState('');

    const comprobarSesion = async (e) => {
        e.preventDefault();
        setError('');
        try{
            const res = await axios.post('http://localhost:5050/api/usuario/Login',{
                usuario,
                password
            });
            //GUARDAR TOKEN EN ALMACENAMIENTO LOCAL
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('usuario',JSON.stringify(res.data.usuario));
            if(onLoginSuccess){
                onLoginSuccess(res.data.usuario);
            }
        }catch(err){
        setError(err.response?.data?.mensaje || 'Error interno ');
        }
    };


    return(
    <div className=' flex  bg-blue-600 h-screen justify-center '>
      <div className='self-center w-150 shadow-lg bg-white rounded-xl h-100'> 

        <div className='flex justify-center'>
        <img src="/img/LOGO.png" alt="" />
        
        </div>
        <hr className='ml-5 mr-5 border-2 rounded-4xl'/>
        
        <form onSubmit={comprobarSesion} className='text-2xl mt-5 m-2'>
          <label>Usuario:</label>
          <input type="text" 
          className='bg-mist-200 w-full  rounded-2xl p-2 mb-3'
          value={usuario}
          onChange={(e)=>setUsuario(e.target.value)} required
          placeholder='Ingresa usuario...' />
          
          <label>Contraseña:</label>
          <input type="password" 
          className='bg-mist-200 w-full  rounded-2xl p-2'
          value={password}
          onChange={(e)=>setPassword(e.target.value)} required
          placeholder='Ingresa contraseña...' />
          <button type='submit'
          className='bg-blue-800 p-2 rounded-2xl mt-5 w-full cursor-pointer text-white hover:bg-blue-600 hover:border-2 border-2'
          >Iniciar sesión</button>
          
        </form>
        
        {error && 
        <p className='text-center text-red-700 text-3xl mt-5  hover:'>{error}</p>
        
        }
      
      </div>
      
    </div>
  );
}

export default Login;