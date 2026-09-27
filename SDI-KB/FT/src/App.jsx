import React, { useEffect, useState } from 'react';
import Login from './paginas/Login';
import BarraNavegacion from './componentes/navegacion';
import Dashboard from './paginas/dashboard';
import Inventario from './paginas/inventario';
import Usuario from './paginas/usuario';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true); // 1. Nuevo estado de carga

  useEffect(() => {
    // 2. Leemos la sesión en localStorage antes de renderizar las rutas
    const userStored = localStorage.getItem('usuario');
    if (userStored) {
      setUsuario(JSON.parse(userStored));
    }
    setCargando(false); // 3. Indicamos que ya terminó de comprobar la sesión
  }, []);

  // Mientras se comprueba si el usuario existe en localStorage, mostramos pantalla de carga
  if (cargando) {
    return <div style={{ padding: '20px' }}>Cargando sesión de SDI-KB...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
    
        <Route
          path="/login"
          element={!usuario ? <Login onLoginSuccess={(u) => setUsuario(u)} /> : <Navigate to="/" />}
        />

      
        <Route 
          path="/"
          element={usuario ? <BarraNavegacion usuario={usuario} cerrarSesion={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            setUsuario(null);
          }} /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="usuario" element={<Usuario/>} />
          
        
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;