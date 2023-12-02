// EmployeeManagement.jsx
import React, { useState, useEffect } from 'react';
import styles from './EmployeeManagement.module.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Cargar empleados almacenados en localStorage al cargar el componente
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleCreateEmployee = () => {
    // Crear un nuevo empleado y actualizar el estado

    const isEmployeeExist = employees.some( employee => employee.id === id)
    ;

    if (isEmployeeExist) {
    alert('Este empleado ya está registrada. Por favor, ingrese un id inico.');
    return;
    }

    const newEmployee = { id, name, phone };
    setEmployees([...employees, newEmployee]);
    
    // Almacenar empleados en localStorage
    localStorage.setItem('employees', JSON.stringify([...employees, newEmployee]));
    
    // Limpiar los campos del formulario
    setName('');
    setId('');
    setPhone('');
    // Desactivar el modo de edición
    setIsEditMode(false);
  };

  const handleEditEmployee = (employeeId) => {
    // Obtener el empleado seleccionado
    const selectedEmployee = employees.find(emp => emp.id === employeeId);
    
    // Actualizar el estado con la información del empleado seleccionado
    setName(selectedEmployee.name);
    setId(selectedEmployee.id);
    setPhone(selectedEmployee.phone);
    
    // Activar el modo de edición
    setIsEditMode(true);
  };

  const handleUpdateEmployee = () => {
    // Actualizar la información del empleado seleccionado
    const updatedEmployees = employees.map(emp => 
      emp.id === id ? { id, name, phone } : emp
    );
    
    setEmployees(updatedEmployees);
    
    // Almacenar empleados actualizados en localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    
    // Limpiar los campos del formulario después de la actualización
    setName('');
    setId('');
    setPhone('');
    // Desactivar el modo de edición
    setIsEditMode(false);
  };

  const handleDeleteEmployee = (employeeId) => {
    // Eliminar el empleado seleccionado y actualizar el estado
    const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
    setEmployees(updatedEmployees);
    
    // Almacenar empleados actualizados en localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <div className={styles.employeeContainer}>
      <h2>Empleados</h2>
      <form className={styles.employeeForm}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Cédula:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <label>
          Celular:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <button type="button" onClick={isEditMode ? handleUpdateEmployee : handleCreateEmployee}>
          {isEditMode ? 'Actualizar Empleado' : 'Crear Empleado'}
        </button>
      </form>
      <ul className={styles.employeeList}>
        {employees.map(employee => (
          <li key={employee.id} className={styles.employeeItem}>
            {`${employee.name} - Cédula: ${employee.id} - Celular: ${employee.phone}`}
            <div className={styles.employeeActions}>
                <button onClick={() => handleEditEmployee(employee.id)}>Editar</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeManagement;
