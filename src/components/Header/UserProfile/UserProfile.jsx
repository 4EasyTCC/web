// UserProfile/UserProfile.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserProfile.module.css';

const UserProfile = ({ userData, isScrolled }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    
    // Disparar evento personalizado para notificar outros componentes
    window.dispatchEvent(new Event('userLoggedOut'));
    
    setIsDropdownOpen(false);
    navigate('/');
  };

  // Avatar padrão se não houver imagem
  const getAvatarUrl = () => {
    if (userData?.avatarUrl) {
      return userData.avatarUrl;
    }
    
    // Iniciais do nome como fallback
    if (userData?.nome) {
      const names = userData.nome.split(' ');
      const initials = names.length > 1 
        ? `${names[0][0]}${names[names.length - 1][0]}` 
        : names[0][0];
      
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=4a00e0&color=fff&bold=true&size=128`;
    }
    
    return 'https://ui-avatars.com/api/?name=U&background=4a00e0&color=fff&bold=true&size=128';
  };

  return (
    <div className={styles.userProfile} ref={dropdownRef}>
      <button 
        className={`${styles.profileButton} ${isScrolled ? styles.scrolled : ''}`}
        onClick={toggleDropdown}
        aria-label="Perfil do usuário"
        aria-expanded={isDropdownOpen}
      >
        <div className={styles.avatarContainer}>
          <img 
            src={getAvatarUrl()} 
            alt="Avatar do usuário" 
            className={styles.avatar}
            onError={(e) => {
              // Fallback para avatar com iniciais se a imagem falhar
              if (userData?.nome) {
                const names = userData.nome.split(' ');
                const initials = names.length > 1 
                  ? `${names[0][0]}${names[names.length - 1][0]}` 
                  : names[0][0];
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=4a00e0&color=fff&bold=true&size=128`;
              } else {
                e.target.src = 'https://ui-avatars.com/api/?name=U&background=4a00e0&color=fff&bold=true&size=128';
              }
            }}
          />
          {!isScrolled && userData?.nome && (
            <span className={styles.userName}>{userData.nome.split(' ')[0]}</span>
          )}
        </div>
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownHeader}>
            <img 
              src={getAvatarUrl()} 
              alt="Avatar" 
              className={styles.dropdownAvatar}
            />
            <div className={styles.userInfo}>
              <h4>{userData?.nome || 'Usuário'}</h4>
              <p>{userData?.email || ''}</p>
            </div>
          </div>

          <div className={styles.menuItems}>
            <button 
              className={styles.menuItem}
              onClick={handleProfileClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Meu Perfil</span>
            </button>

            <button className={styles.menuItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Meus Eventos</span>
            </button>

            <button className={styles.menuItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7.5V12L14.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Histórico</span>
            </button>

            <button className={styles.menuItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15C19.2669 15.3016 19.2271 15.6362 19.285 15.9586C19.3428 16.281 19.4957 16.5772 19.724 16.8086C19.8526 16.9398 19.9543 17.0948 20.0235 17.2652C20.0927 17.4356 20.1281 17.6181 20.128 17.8024C20.1278 18.1759 19.9795 18.534 19.718 18.7964C17.8279 20.6886 15.0678 21.7662 12.2 21.8C9.33216 21.7662 6.57206 20.6886 4.68198 18.7964C4.42052 18.534 4.27219 18.1759 4.27203 17.8024C4.27189 17.6181 4.30733 17.4356 4.37652 17.2652C4.44571 17.0948 4.54739 16.9398 4.67598 16.8086C4.90431 16.5772 5.0572 16.281 5.11505 15.9586C5.1729 15.6362 5.13312 15.3016 4.99998 15C4.71987 14.396 4.56998 13.7469 4.55998 13.09C4.54998 12.4331 4.68005 11.7799 4.94198 11.17L4.99998 11L7.35998 7.06C7.52418 6.74731 7.76278 6.47953 8.05457 6.2799C8.34636 6.08027 8.68266 5.95482 9.03398 5.914L9.27998 5.9H15.12C15.4713 5.91482 15.8076 6.00027 16.0994 6.1499C16.3912 6.29953 16.6298 6.50831 16.794 6.754L16.88 6.88L19.24 10.82C19.502 11.4299 19.632 12.0831 19.622 12.74C19.612 13.3969 19.4621 14.046 19.182 14.65L19.118 14.794L19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 5L17.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 5L6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Configurações</span>
            </button>

            <div className={styles.divider}></div>

            <button 
              className={`${styles.menuItem} ${styles.logout}`}
              onClick={handleLogout}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;