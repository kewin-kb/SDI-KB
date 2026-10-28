import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./paginas/Login";
import Dashboard from "./paginas/Dashboard";

function App(){
  const [usuario, setUsuario]=useState(null);

  useEffect(()=>{
    const userStored = localStorage.getItem('usuario');
    if(userStored){
      setUsuario(JSON.parse(userStored));
    }
  }, []);

return(
  
  <BrowserRouter>
    <Routes>
      {/*REDiRGIR AL DASHBOARD SI ENCUENTRA USUARIO*/}
      <Route 
      path="/Login"
      element={!usuario ? <Login iniciarCorrectamente={(u) =>setUsuario(u)} />:<Navigate to="/" replace />}
      />

      {/*REDiRGIR AL LOGIN SI NO TIENE INICIADO SESION*/}
      <Route
      path="/"
      element={usuario ? <Dashboard /> : <Navigate to="/login" replace />}
      />


      
      <Route path="*" element={<Navigate to="/" replace />} />

      
    </Routes>
  </BrowserRouter>
)
}

export default App;