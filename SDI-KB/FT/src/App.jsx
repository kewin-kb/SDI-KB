import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/productos')
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sistema de Control de Inventarios SDI-KB</h1>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - Cantidad: {producto.cantidad} - Price: ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;