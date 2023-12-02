// VehicleManagement.jsx
import React, { useState, useEffect } from 'react';
import styles from './VehicleManagement.module.css';

const VehicleManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [cylinder, setCylinder] = useState('');
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(null);

  // Listas de valores ficticios para las listas desplegables
  const [vehicleBrands, setVehicleBrands] = useState(['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan']);
  const [motorcycleBrands, setMotorcycleBrands] = useState(['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Ducati']);  
  const modelOptions = ['Sedan', 'SUV', 'Hatchback', 'Pickup', 'Coupe', 'Convertible', 'Van', 'Truck', 'Crossover', 'Electric'];
  const cylinderOptions = ['125 cc', '250 cc', '500 cc', '750 cc', '1000 cc', '1200 cc', '1500 cc', '1800 cc', '2000 cc', '2500 cc'];

  const handleVehicleTypeChange = (type) => {
    setVehicleType(type);
    // Limpiar las marcas al cambiar el tipo de vehículo
    setBrand('');
  };
  
  useEffect(() => {
    // Cargar empleados almacenados en localStorage al cargar el componente
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleSaveVehicle = () => {
    // Realizar validaciones
    if (!selectedEmployee || !vehicleType || !licensePlate) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if(selectedVehicleIndex === null){
    const isLicensePlateExist = employees.some(employee =>
    employee.vehicles && employee.vehicles.some(vehicle => vehicle.licensePlate === licensePlate)
    );

    if (isLicensePlateExist) {
    alert('Esta placa ya está registrada. Por favor, ingrese una placa única.');
    return;
    }
  }

    // Crear un nuevo vehículo o actualizar el vehículo existente
    const newVehicle = {
        vehicleType,  // Asegúrate de que este valor provenga de tu formulario
        licensePlate,
        brand,
        model,
        cylinder,
    };

    const updatedEmployees = employees.map(employee =>
      employee.id === selectedEmployee
        ? {
            ...employee,
            vehicles: selectedVehicleIndex !== null
              ? employee.vehicles.map((vehicle, index) =>
                  index === selectedVehicleIndex ? newVehicle : vehicle
                )
              : [...(employee.vehicles || []), newVehicle],
          }
        : employee
    );

    setEmployees(updatedEmployees);

    // Almacenar empleados actualizados en localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    // Limpiar los campos del formulario después de la creación o actualización
    setSelectedEmployee('');
    setVehicleType('');
    setLicensePlate('');
    setBrand('');
    setModel('');
    setCylinder('');
    // Reiniciar el índice seleccionado
    setSelectedVehicleIndex(null);
  };

  const handleEditVehicle = (employeeId, vehicleIndex) => {
    // Obtener el vehículo seleccionado para edición
    const selectedVehicle = employees.find(emp => emp.id === employeeId)?.vehicles?.[vehicleIndex];
  
    if (selectedVehicle) {
      setSelectedEmployee(employeeId);
      setVehicleType(selectedVehicle.vehicleType || ''); // Ajusta según la propiedad real que indica el tipo de vehículo
      setLicensePlate(selectedVehicle.licensePlate);
      setBrand(selectedVehicle.brand);
      setModel(selectedVehicle.model);
      setCylinder(selectedVehicle.cylinder);
      // Establecer el índice del vehículo seleccionado para edición
      setSelectedVehicleIndex(vehicleIndex);
    }
  };
  

  const handleDeleteVehicle = (employeeId, vehicleIndex) => {
    // Eliminar el vehículo seleccionado y actualizar el estado
    const updatedEmployees = employees.map(employee =>
      employee.id === employeeId
        ? {
            ...employee,
            vehicles: employee.vehicles.filter((vehicle, index) => index !== vehicleIndex),
          }
        : employee
    );

    setEmployees(updatedEmployees);

    // Almacenar empleados actualizados en localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <div className={styles.vehicleContainer}>
      <h2>Vehiculos</h2>
      <form className={styles.vehicleForm}>
      <label>
          Empleado:
          <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
            <option value="">Seleccione un empleado</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} - Cédula: {employee.id}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tipo de Vehículo:
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <option value="">Seleccione un tipo de vehículo</option>
            <option value="car">Carro</option>
            <option value="motorcycle">Moto</option>
          </select>
        </label>
        <label>
          Número de Placa:
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
          />
        </label>
        {vehicleType === 'car' && (
          <>
            <label>
              Modelo:
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="">Seleccione un modelo</option>
                {modelOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              Marca:
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="">Seleccione la marca</option>
                {vehicleBrands.map(option => (
                <option key={option} value={option}>{option}</option>
                ))}                
            </select>
            </label>
          </>
        )}
        {vehicleType === 'motorcycle' && (
          <>
            <label>
              Cilindraje:
              <select value={cylinder} onChange={(e) => setCylinder(e.target.value)}>
                <option value="">Seleccione un cilindraje</option>
                {cylinderOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              Marca:
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="">Seleccione una marca</option>
                {motorcycleBrands.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </>
        )}
        <button type="button" onClick={handleSaveVehicle}>
          {selectedVehicleIndex !== null ? 'Actualizar Vehículo' : 'Guardar Vehículo'}
        </button>
      </form>
      <ul className={styles.vehicleList}>
        {employees.map(employee => (
          <li key={employee.id}>
            <strong>{employee.name} - Cédula: {employee.id}</strong>
            <ul>
              {employee.vehicles?.map((vehicle, index) => (
                <li key={index}>
                    <span>Tipo: {vehicle.vehicleType === 'car' ? 'Carro' : 'Moto'}</span>
                    <span>- Marca: {`${vehicle.brand}`}</span>
                    {vehicle.vehicleType === 'car' ? (
                      <span>- Modelo: {vehicle.model}</span>
                    ) : (
                      <>
                        <span>- Cilindraje: {vehicle.cylinder}</span>
                        <span>- Modelo: {vehicle.model}</span>
                      </>
                    )}
                    <span>- Placa: {vehicle.licensePlate}</span>
                  <button onClick={() => handleEditVehicle(employee.id, index)}>Editar</button>
                  <button onClick={() => handleDeleteVehicle(employee.id, index)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleManagement;
