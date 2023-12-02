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
      <Menu />
      <Routes>        
        <Route path="/" element={<Login />} />
        <Route path="/parqueadero" element={<ParkingManagement />} />
        <Route path="/empleados" element={<EmployeeManagement />} />
        <Route path="/vehiculos" element={<VehicleManagement />} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
};

export default App;
