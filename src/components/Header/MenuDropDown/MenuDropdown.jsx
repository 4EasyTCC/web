// MenuDropdown.jsx - CORRIGIDO PARA ATUALIZAÇÃO IMEDIATA
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MenuDropdown.module.css';

const MenuDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  
  // ✅ CORREÇÃO: Buscar dados do localStorage dinamicamente
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          console.log('📦 MenuDropdown - Dados carregados:', user);
          setUserData(user);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Erro ao carregar userData:', error);
        setUserData(null);
      }
    };

    // Carregar dados quando o menu abrir
    if (isOpen) {
      loadUserData();
    }

    // Escutar mudanças no localStorage
    const handleStorageChange = () => {
      console.log('🗂️ MenuDropdown - Storage mudou, recarregando...');
      setTimeout(loadUserData, 100);
    };

    const handleUserUpdated = (event) => {
      console.log('📢 MenuDropdown - Evento usuarioAtualizado:', event.detail);
      setUserData(event.detail);
    };

    const handleAvatarUpdated = (event) => {
      console.log('🖼️ MenuDropdown - Evento avatarAtualizado:', event.detail);
      setUserData(prev => prev ? { ...prev, avatarUrl: event.detail.avatarUrl } : null);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usuarioAtualizado', handleUserUpdated);
    window.addEventListener('avatarAtualizado', handleAvatarUpdated);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usuarioAtualizado', handleUserUpdated);
      window.removeEventListener('avatarAtualizado', handleAvatarUpdated);
    };
  }, [isOpen]);

  const isLoggedIn = !!localStorage.getItem('token');

  const navigateTo = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userLoggedOut'));
    window.dispatchEvent(new Event('storage'));
    onClose();
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 100);
  };

  // ✅ CORREÇÃO: Função MELHORADA para obter URL do avatar
  const getAvatarUrl = (user) => {
    if (!user) return null;
    
    // ✅ VERIFICAÇÃO RIGOROSA: avatarUrl existe E não está vazio
    if (user.avatarUrl && user.avatarUrl.trim() !== '') {
      let urlCompleta = user.avatarUrl.trim();
      
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
    if (user.nome || user.name) {
      const nomeCompleto = user.nome || user.name || 'U';
      const names = nomeCompleto.split(' ');
      const initials = names.length > 1 
        ? `${names[0][0]}${names[names.length - 1][0]}` 
        : nomeCompleto.substring(0, 2).toUpperCase();
      
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=7c3aed&color=fff&bold=true&size=64`;
    }
    
    return `https://ui-avatars.com/api/?name=U&background=7c3aed&color=fff&bold=true&size=64`;
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
    { path: '/SearchEvents', label: 'Eventos', icon: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z' },
    { path: '/PageColecoes', label: 'Coleções', icon: 'M12 2l-5.5 9h11z M17.5 17.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z M3 13.5h8v8H3z' },
    { path: '/aboutUs', label: 'Sobre Nós', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' },
    { path: '/Contact', label: 'Contato', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' }
  ];

  const avatarUrl = getAvatarUrl(userData);

  // ✅ DEBUG: Log do estado atual
  console.log('🎯 MenuDropdown - Estado final:', {
    userData,
    isLoggedIn,
    hasAvatarUrl: !!userData?.avatarUrl,
    avatarUrl: userData?.avatarUrl,
    finalAvatarUrl: avatarUrl
  });

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
          {isLoggedIn && userData && (
            <div className={styles.userSection}>
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                className={styles.userAvatar}
                onError={(e) => {
                  // ✅ CORREÇÃO: Fallback melhorado
                  if (userData?.nome || userData?.name) {
                    const nomeCompleto = userData.nome || userData.name || 'U';
                    const names = nomeCompleto.split(' ');
                    const initials = names.length > 1 
                      ? `${names[0][0]}${names[names.length - 1][0]}` 
                      : nomeCompleto.substring(0, 2).toUpperCase();
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=7c3aed&color=fff&bold=true&size=64`;
                  } else {
                    e.target.src = 'https://ui-avatars.com/api/?name=U&background=7c3aed&color=fff&bold=true&size=64';
                  }
                }}
              />
              <div className={styles.userInfo}>
                <h4>{userData.nome || userData.name}</h4>
                <p>{userData.email}</p>
              </div>
            </div>
          )}
          
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
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigateTo('/profile')}
                  className={styles.menuProfileButton}
                >
                  Meu Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className={styles.menuLogoutButton}
                >
                  Sair
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDropdown;