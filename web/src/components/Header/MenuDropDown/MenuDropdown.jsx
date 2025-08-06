import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MenuDropdown.module.css';

const MenuDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
    onClose();
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
    { path: '/eventos', label: 'Eventos', icon: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z' },
    { path: '/categorias', label: 'Categorias', icon: 'M12 2l-5.5 9h11z M17.5 17.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z M3 13.5h8v8H3z' },
    { path: '/aboutus', label: 'Sobre Nós', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' },
    { path: '/contato', label: 'Contato', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' }
  ];

  return (
    <>
      {isOpen && (
        <div
          className={styles.menuOverlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <div
        className={`${styles.menuDropdown} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.menuContent}>
          <h3 className={styles.menuTitle}>Menu</h3>
          <ul className={styles.menuItems}>
            {menuItems.map((item) => (
              <li 
                key={item.path}
                className={styles.menuItem} 
                onClick={() => navigateTo(item.path)}
              >
                <span>{item.label}</span>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d={item.icon} />
                </svg>
              </li>
            ))}
          </ul>
          <div className={styles.menuAuthButtons}>
            <button
              onClick={() => navigateTo('/paginaLogin')}
              className={styles.menuLoginButton}
            >
              Login
            </button>
            <button
              onClick={() => navigateTo('/pageCadastro')}
              className={styles.menuRegisterButton}
            >
              Cadastre-se
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDropdown;