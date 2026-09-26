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
            const res = await axios.post('http://localhost:5000/api/auth/Login',{
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
        setError(err.response?.data?.mensaje || 'Error servidor');
        }
    };
    return(
    <div className='bg-green-700'>
      <h2>Iniciar Sesión - SDI-KB</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={comprobarSesion}>
        <div style={{ marginBottom: '15px' }}>
          <label>Correo Electrónico:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;