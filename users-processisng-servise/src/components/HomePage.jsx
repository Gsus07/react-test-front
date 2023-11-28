import React from 'react';
import { Link } from 'react-router-dom';
import Users from './Users'; // Corregir la ruta del componente User

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/Users">Gestión de Usuarios</Link></li>
          {/* Agrega más enlaces */}
        </ul>
      </nav>
      {/* <Users /> */}
    </div>
  );
};

export default HomePage;


