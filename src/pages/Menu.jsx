import React from 'react';
import { Link } from 'react-router-dom';
import style from "./Menu.module.css";

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/parqueadero">Parqueadero</Link>
        </li>
        <li>
          <Link to="/parqueadero/empleados">Empleados</Link>
        </li>
        <li>
          <Link to="/parqueadero/vehiculos">Vehículos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;