import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthButtons.module.css';

const AuthButtons = ({ variant = 'default' }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/paginaLogin');
  };

  const handleRegister = () => {
    navigate('/pageCadastro');
  };

  return (
    <div className={`${styles.authButtons} ${styles[variant]}`}>
      <button
        onClick={handleLogin}
        className={styles.loginButton}
        aria-label="Fazer login"
      >
        LOGIN
      </button>
      <button
        onClick={handleRegister}
        className={styles.registerButton}
        aria-label="Cadastrar-se"
      >
        CADASTRE-SE
      </button>
    </div>
  );
};

export default AuthButtons;