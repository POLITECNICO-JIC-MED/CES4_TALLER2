import React, { useState, useEffect } from 'react';
import styles from './VehicleEntry.module.css';

const VehicleEntry = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesEmployee, setVehiclesEmployee] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [availableMotoSpots, setAvailableMotoSpots] = useState(
    Array(10).fill({
      state: "Disponible",
      vehicle: null ,
      enteredAt: null ,
    })
  );
  
  const [availableCarSpots, setAvailableCarSpots] = useState(
    Array(10).fill({
      state: "Disponible",
      vehicle: null, 
      enteredAt: null ,
    })
  );

  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [buttonsOcuVisible, setButtonsOcuVisible] = useState(true);

  useEffect(() => {
    // Cargar empleados almacenados en localStorage al cargar el componente
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setVehicles(storedEmployees.map(employee => employee || []).flat());

    const storedMoto = JSON.parse(localStorage.getItem('availableMotoSpots')) || availableMotoSpots;
    setAvailableMotoSpots(storedMoto.map(employee => employee || availableMotoSpots).flat());

    const storedCar = JSON.parse(localStorage.getItem('availableCarSpots')) || availableCarSpots;
    setAvailableCarSpots(storedCar.map(employee => employee || availableCarSpots).flat());
    
  }, []);

  const handleSearchByEmployeeId = () => {
    setSelectedVehicle([]);
    const vehiclesByEmployeeId = vehicles.filter(vehicle => vehicle.id === employeeId);
    console.log(vehiclesByEmployeeId)
    setVehiclesEmployee(vehiclesByEmployeeId ? vehiclesByEmployeeId || [] : []);
    
  };

  const handleSearchByLicensePlate = () => {
    const isPlateInParking = availableMotoSpots[number]?.vehicle?.licensePlate === selectedVehicle.licensePlate;
    setVehiclesEmployee([]);
    for (const vehicle of vehicles) {
      const vehicleByLicensePlate = vehicle.vehicles.find((vehicle) => vehicle.licensePlate === licensePlate);
      console.log(vehicle)
      setButtonsVisible(true);
      setSelectedVehicle(vehicleByLicensePlate ? vehicleByLicensePlate || [] : []);
      
    }
  }

  const handleSelectVehicle = (vehiclesel) => {
    // Marcar el vehículo como ingresado
    console.log(availableCarSpots)
    var isLicensePlateExist = false;

    if(vehiclesel.vehicleType==='car')
    {
      isLicensePlateExist = availableCarSpots.some((availableCarSpot) => {
        // Verificar que availableCarSpot.vehicle esté definido y que licensePlate esté definido
        return (
          availableCarSpot.vehicle &&
          availableCarSpot.vehicle.licensePlate === vehiclesel.licensePlate
        );
      });
    }else{
      isLicensePlateExist = availableMotoSpots.some((availableMotoSpot) => {
        // Verificar que availableCarSpot.vehicle esté definido y que licensePlate esté definido
        return (
          availableMotoSpot.vehicle &&
          availableMotoSpot.vehicle.licensePlate === vehiclesel.licensePlate
        );
      });
    }

    if (isLicensePlateExist) {
    alert('Esta placa ya está registrada. Por favor, ingrese una placa única.');
    return;
    }
    setButtonsVisible(true);
    setSelectedVehicle(vehiclesel);
  };

  const ParkingSpots = ({  occupiedParkingSpots  }) => {
    const rows = [];
  
    const isMotoSpotAvailable = (index) => {
      return availableMotoSpots[index];
    };

    const makeMotoSpotAvailable = (index) => {
      const updatedSpots = [availableMotoSpots];
      updatedSpots[index] = true;
      setAvailableMotoSpots(updatedSpots);
    };

    const makeMotoSpotUnavailable = (index) => {
      const updatedSpots = [availableMotoSpots]; 
      updatedSpots[index] = false;
      setAvailableMotoSpots(updatedSpots);
    };

    const isCarSpotAvailable = (index) => {
      return availableCarSpots[index];
    };

    const makeCarSpotAvailable = (index) => {
      const updatedSpots = [...availableCarSpots];
      updatedSpots[index] = true;
      setAvailableCarSpots(updatedSpots); 
    };

    const makeCarSpotUnavailable = (index) => {
      const updatedSpots = [...availableCarSpots]; 
      updatedSpots[index] = false;
      setAvailableCarSpots(updatedSpots);
    }; 
  
  
    return (
     
      <div className={styles.parkingSpotsContainer}>
      <div className={styles.carSpotsContainer}>
      <h2>Motos</h2>
        {availableMotoSpots.map((spot, index) => (
          <ParkingSpot  
            type="motorcycle"
            number={index}
            data={spot}
            vehi={spot.vehicle}          
          />
        ))}
        </div>

        <div className={styles.motoSpotsContainer}>
        <h2>Carros</h2>
        {availableCarSpots.map((spot, index) => (
          <ParkingSpot  
            type="car"
            number={index}
            data={spot}
            vehi={spot.vehicle}          
          />
        ))}

  </div>
  </div>
      
    )
  }

  const ParkingSpot = ({type,number,data,vehi,onTake}) => {
   
    const takeSpotMoto = (selectedVehicle, number) => {

      const updated = [...availableMotoSpots];
      updated[number] = {
        state: "Ocupado",
        vehicle: selectedVehicle,
        enteredAt: new Date(),
      };
      setAvailableMotoSpots(updated);
      localStorage.setItem('availableMotoSpots', JSON.stringify(updated));
      
    }

    const unableSpotMoto = (number) => {

      const updated = [...availableMotoSpots];
      updated[number] = {
        state: "Disponible",
        vehicle: null,
        enteredAt: null, 
      };
      setAvailableMotoSpots(updated);
      localStorage.setItem('availableMotoSpots', JSON.stringify(updated));
      
    }

    const takeSpotCar = (selectedVehicle, number) => {

      const updated = [...availableCarSpots];
      updated[number] = {
        state: "Ocupado",
        vehicle: selectedVehicle,
        enteredAt: new Date(), 
      };
      setAvailableCarSpots(updated);
      localStorage.setItem('availableCarSpots', JSON.stringify(updated));
      
    }

    const unableSpotCar = (number) => {

      const updated = [...availableCarSpots];
      updated[number] = {
        state: "Disponible",
        vehicle: null,
        enteredAt: null , 
      };
      setAvailableCarSpots(updated);
      localStorage.setItem('availableCarSpots', JSON.stringify(updated));
      
    }
  
    return (
      <div className={`${styles.parkingSpot} ${data.state === 'Disponible' ? styles.available : styles.occupied}`}>
       <h3>#{number + 1}</h3>
      <div className={styles.infoContainer}>
        <div className={styles.infoSection}>
          <p>
            <strong>Estado:</strong> {data.state}
          </p>
          {data.enteredAt && (
            <p>
              <strong>Entrada:</strong>{" "}
              {new Date(data.enteredAt).toLocaleString()}
            </p>
          )}
        </div>
        {vehi && (
          <div className={styles.infoSection}>
            <p>
              <strong>Placa:</strong> {vehi.licensePlate}
            </p>
          </div>
        )}
      </div>
      {type === selectedVehicle?.vehicleType && (
        <div className={styles.buttonContainer}>
          {data.state === "Disponible" && (
            <button
              onClick={() => {
                if (selectedVehicle?.vehicleType === "motorcycle") {
                  takeSpotMoto(selectedVehicle, number);
                } else {
                  takeSpotCar(selectedVehicle, number);
                }
                setButtonsVisible(false);
                setVehiclesEmployee([]);
                setSelectedVehicle([]);
              }}
              className={styles.occupyButton}
              style={{ display: buttonsVisible ? 'block' : 'none' }}
            >
              Ocupar Celda
            </button>
          )}

          
        </div>
      )}

          {data.state === "Ocupado" && (
            <button
              onClick={() => {
                if (vehi.vehicleType === "motorcycle") {
                  unableSpotMoto(number);
                } else {
                  unableSpotCar(number);
                }
              }}
              className={styles.releaseButton}
            >
              Poner en Disponible
            </button>
          )}
    </div>
    );  
  
  };
  return (
    <div className={styles.vehicleEntryContainer}>
      <h2>Ingreso de Vehículos</h2>

      <form className={styles.vehicleEntryForm}>
        <label>
          Ingrese el número de cédula del propietario:
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSearchByEmployeeId}>
          Buscar por Cédula
        </button>

        <label>
          Ingrese la placa del vehículo:
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSearchByLicensePlate}>
          Buscar por Placa
        </button>

        {vehicles.length > 0 && (
          <ul className={styles.vehicleList}>
            {vehiclesEmployee.map(vehicle => (
              <li key={vehicle.id}>
                <strong>{vehicle.id} - {vehicle.name}</strong>
                <ul>
                {vehicle.vehicles?.map((vehicle, index) => (
                  <li key={index}>
                      <span>Tipo: {vehicle.vehicleType === 'car' ? 'Carro' : 'Moto'} </span>
                      <span>- Marca: {`${vehicle.brand} - Modelo: ${vehicle.model} - Placa: ${vehicle.licensePlate}`}</span>
                      <button
                        type="button"
                        onClick={() => handleSelectVehicle(vehicle)}
                      >
                        Seleccionar
                      </button>
                  </li>
                ))}
              </ul>               
              </li>
            ))}
          </ul>
        )}
      </form>

      {selectedVehicle && (
        <div className={styles.vehicleDetails}>
          <strong>Placa:</strong> {selectedVehicle.licensePlate}
          <br />
          <strong>Tipo de vehículo:</strong> {selectedVehicle.vehicleType}
          <br />
          <strong>Marca:</strong> {selectedVehicle.brand}
          <br />
          {selectedVehicle.vehicleType === 'motorcycle' ? (
            <>
              <strong>Cilindraje:</strong> {selectedVehicle.cylinder}
            </>
          ) : (
            <>
              <strong>Modelo:</strong> {selectedVehicle.model}
            </>
          )}
        </div>
      )}

    <ParkingSpots />

    </div>
  );
};

export default VehicleEntry;
