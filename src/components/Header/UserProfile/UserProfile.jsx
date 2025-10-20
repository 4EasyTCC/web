// UserProfile.jsx - CORRIGIDO PARA ATUALIZAÇÃO IMEDIATA
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserProfile.module.css';

const UserProfile = ({ userData, isScrolled }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(userData);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ CORREÇÃO: Atualizar imediatamente quando userData mudar
  useEffect(() => {
    console.log('🔄 UserProfile - userData atualizado via props:', userData);
    setCurrentUserData(userData);
  }, [userData]);

  useEffect(() => {
    


    // Escutar eventos de atualização
    const handleStorageChange = () => {
      console.log('🗂️ UserProfile - Storage mudou, verificando...');
      setTimeout(checkLocalStorage, 100);
    };

    const handleUserUpdated = (event) => {
      console.log('📢 UserProfile - Evento usuarioAtualizado:', event.detail);
      setCurrentUserData(event.detail);
    };

    const handleAvatarUpdated = (event) => {
      console.log('🖼️ UserProfile - Evento avatarAtualizado:', event.detail);
      setCurrentUserData(prev => ({
        ...prev,
        avatarUrl: event.detail.avatarUrl
      }));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usuarioAtualizado', handleUserUpdated);
    window.addEventListener('avatarAtualizado', handleAvatarUpdated);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usuarioAtualizado', handleUserUpdated);
      window.removeEventListener('avatarAtualizado', handleAvatarUpdated);
    };
  }, []);

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
    // Voltar ao comportamento original: navegar para /profile sem state
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const handleMyEvents = () => {
    navigate('/meus-eventos');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userLoggedOut'));
    window.dispatchEvent(new Event('storage'));
    setIsDropdownOpen(false);
    
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 100);
  };

  // ✅ CORREÇÃO: Função MELHORADA para obter URL do avatar
  const getAvatarUrl = () => {
    if (!currentUserData) {
      return 'https://ui-avatars.com/api/?name=US&background=7c3aed&color=ffffff&bold=true&size=128';
    }

    // ✅ VERIFICAÇÃO RIGOROSA: avatarUrl existe E não está vazio
    if (currentUserData.avatarUrl && currentUserData.avatarUrl.trim() !== '') {
      let urlCompleta = currentUserData.avatarUrl.trim();
      
      // Se é um caminho relativo, adicionar domínio
      if (!urlCompleta.startsWith('http')) {
        urlCompleta = `http://localhost:3000${urlCompleta.startsWith('/') ? '' : '/'}${urlCompleta}`;
      }
      
      // Adicionar timestamp para evitar cache
      const timestamp = new Date().getTime();
      const separator = urlCompleta.includes('?') ? '&' : '?';
      return `${urlCompleta}${separator}t=${timestamp}`;
    }
    
    // ✅ FALLBACK: Apenas se realmente não tiver avatar
    if (currentUserData.nome) {
      const names = currentUserData.nome.split(' ');
      const initials = names.length > 1 
        ? `${names[0][0]}${names[names.length - 1][0]}` 
        : names[0].substring(0, 2).toUpperCase();
      
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=7c3aed&color=ffffff&bold=true&size=128`;
    }
    
    return 'https://ui-avatars.com/api/?name=US&background=7c3aed&color=ffffff&bold=true&size=128';
  };

  // ✅ CORREÇÃO: Função de fallback para erro de carregamento
  const handleImageError = (e) => {
    console.error("❌ Erro ao carregar avatar");
    
    if (currentUserData?.nome) {
      const names = currentUserData.nome.split(' ');
      const initials = names.length > 1 
        ? `${names[0][0]}${names[names.length - 1][0]}` 
        : names[0].substring(0, 2).toUpperCase();
      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=7c3aed&color=ffffff&bold=true&size=128`;
    } else {
      e.target.src = 'https://ui-avatars.com/api/?name=US&background=7c3aed&color=ffffff&bold=true&size=128';
    }
  };

  // Obter nome abreviado para display
  const getDisplayName = () => {
    if (!currentUserData?.nome) return 'Usuário';
    return currentUserData.nome.split(' ')[0];
  };

 
  return (
    <div className={styles.userProfile} ref={dropdownRef}>
      <button 
        className={`${styles.profileTrigger} ${isScrolled ? styles.scrolled : ''} ${isDropdownOpen ? styles.active : ''}`}
        onClick={toggleDropdown}
        aria-label="Perfil do usuário"
        aria-expanded={isDropdownOpen}
      >
        <div className={styles.avatarWrapper}>
          <img 
            src={getAvatarUrl()} 
            alt={`Avatar de ${getDisplayName()}`}
            className={styles.avatar}
            onError={handleImageError}
          />
          <div className={styles.statusIndicator}></div>
        </div>
        
        {!isScrolled && (
          <div className={styles.userInfo}>
            <span className={styles.userName}>{getDisplayName()}</span>
            <svg className={styles.chevron} width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          {/* Header do dropdown */}
          <div className={styles.dropdownHeader}>
            <div className={styles.avatarContainer}>
              <img 
                src={getAvatarUrl()} 
                alt="Avatar" 
                className={styles.headerAvatar}
                onError={handleImageError}
              />
            </div>
            <div className={styles.userDetails}>
              <h3 className={styles.userName}>{currentUserData?.nome || 'Usuário'}</h3>
              <p className={styles.userEmail}>{currentUserData?.email || ''}</p>
            </div>
          </div>

          <div className={styles.menuDivider}></div>

          {/* Itens do menu */}
          <nav className={styles.menuNavigation}>
            <button 
              className={styles.menuItem}
              onClick={handleProfileClick}
            >
              <div className={styles.menuIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.menuLabel}>Meu Perfil</span>
            </button>

            <button 
              className={styles.menuItem}
              onClick={handleMyEvents}
            >
              <div className={styles.menuIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.menuLabel}>Meus Eventos</span>
            </button>

            <button className={styles.menuItem}>
              <div className={styles.menuIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.menuLabel}>Histórico</span>
            </button>

            <button className={styles.menuItem}>
              <div className={styles.menuIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.4 15C19.2669 15.3016 19.2271 15.6362 19.285 15.9586C19.3428 16.281 19.4957 16.5772 19.724 16.8086C19.8526 16.9398 19.9543 17.0948 20.0235 17.2652C20.0927 17.4356 20.1281 17.6181 20.128 17.8024C20.1278 18.1759 19.9795 18.534 19.718 18.7964C17.8279 20.6886 15.0678 21.7662 12.2 21.8C9.33216 21.7662 6.57206 20.6886 4.68198 18.7964C4.42052 18.534 4.27219 18.1759 4.27203 17.8024C4.27189 17.6181 4.30733 17.4356 4.37652 17.2652C4.44571 17.0948 4.54739 16.9398 4.67598 16.8086C4.90431 16.5772 5.0572 16.281 5.11505 15.9586C5.1729 15.6362 5.13312 15.3016 4.99998 15C4.71987 14.396 4.56998 13.7469 4.55998 13.09C4.54998 12.4331 4.68005 11.7799 4.94198 11.17L4.99998 11L7.35998 7.06C7.52418 6.74731 7.76278 6.47953 8.05457 6.2799C8.34636 6.08027 8.68266 5.95482 9.03398 5.914L9.27998 5.9H15.12C15.4713 5.91482 15.8076 6.00027 16.0994 6.1499C16.3912 6.29953 16.6298 6.50831 16.794 6.754L16.88 6.88L19.24 10.82C19.502 11.4299 19.632 12.0831 19.622 12.74C19.612 13.3969 19.4621 14.046 19.182 14.65L19.118 14.794L19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.menuLabel}>Configurações</span>
            </button>
          </nav>

          <div className={styles.menuDivider}></div>

          {/* Logout */}
          <div className={styles.menuFooter}>
            <button 
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              <div className={styles.menuIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.logoutLabel}>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;