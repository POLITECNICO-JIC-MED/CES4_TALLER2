import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./Login.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState('admin');
  const [password, setPassword] = useState('123');
  const navigate = useNavigate();

  const handleLogin = () => {

    if (credentials.username === user && credentials.password === password) {
      navigate('/parqueadero');  
    } else {
      setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className={style.loginContainer}>
      <h2>Login</h2>
      <form className={style.loginForm}>
        <label className="form-label">
          Usuario:
          <input
            className={style.formInput}
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </label>
        <label className={style.formLabel}>
          Contraseña:
          <input
            className={style.formInput}
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </label>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <button className={style.formButton} type="button" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
