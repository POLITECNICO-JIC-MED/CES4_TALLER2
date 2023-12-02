// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import EmployeeManagement from './pages/EmployeeManagement';
import VehicleManagement from './pages/VehicleManagement';
import ParkingManagement from './pages/VehicleEntry';
import Menu from './pages/Menu'



const App = () => {
  return (
    <Router>
     <Routes>
        {/* Ruta para la página de inicio de sesión (login) */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas con el componente Menu */}
        <Route
          path="/parqueadero/*"
          element={
            <>
              <Menu />
              <Routes>
                <Route path="/" element={<ParkingManagement />} />
                <Route path="/empleados" element={<EmployeeManagement />} />
                <Route path="/vehiculos" element={<VehicleManagement />} />
                {/* Agrega más rutas según sea necesario */}
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
