// Header.jsx (CORRIGIDO PARA USAR "user")
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import SearchBar from './SearchBar/SearchBar';
import AuthButtons from './AuthButtons/AuthButtons';
import UserProfile from './UserProfile/UserProfile';
import MenuDropdown from './MenuDropDown/MenuDropdown';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import LogoOficial from '@images/logos/LogoOficial.png';
import LogoCompleta from '@images/logos/LogoExtended.png';

export default function Header({ customBreadcrumbs = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const headerRef = useRef(null);
  const animationFrameId = useRef(null);

  // ✅ VERIFICAÇÃO CORRIGIDA - usando "user" em vez de "userData"
  const checkAuthStatus = useCallback(() => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user'); // ⚠️ MUDOU PARA "user"
      
      console.log('🔐 Header - Verificando localStorage:', { 
        token: token ? `EXISTE (${token.substring(0, 20)}...)` : 'NÃO EXISTE', 
        user: userStr ? `EXISTE: ${JSON.parse(userStr).nome}` : 'NÃO EXISTE' 
      });

      if (token && userStr) {
        const user = JSON.parse(userStr);
        console.log('✅ Header - Usuário autenticado:', user.nome);
        setIsLoggedIn(true);
        setUserData(user);
      } else {
        console.log('❌ Header - Dados incompletos no localStorage');
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      console.error('❌ Header - Erro ao verificar autenticação:', error);
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, []);

  // ✅ EFFECT CORRIGIDO
  useEffect(() => {
    console.log('🚀 Header - Iniciando verificação de autenticação');
    
    // Verificação imediata
    checkAuthStatus();
    
    // Escutar eventos
    const handleAuthEvent = () => {
      console.log('📢 Header - Evento de autenticação detectado');
      setTimeout(checkAuthStatus, 100);
    };

    window.addEventListener('userLoggedIn', handleAuthEvent);
    window.addEventListener('userLoggedOut', handleAuthEvent);
    window.addEventListener('storage', handleAuthEvent);
    
    return () => {
      window.removeEventListener('userLoggedIn', handleAuthEvent);
      window.removeEventListener('userLoggedOut', handleAuthEvent);
      window.removeEventListener('storage', handleAuthEvent);
    };
  }, [checkAuthStatus]);

  // Restante do código permanece igual...
  useEffect(() => {
    setIsScrolled(isHomePage ? window.scrollY > 50 : true);
  }, [isHomePage]);

  const handleScroll = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    animationFrameId.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const shouldBeScrolled = currentScrollY > 50;
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    });
  }, [isScrolled]);

  useEffect(() => {
    if (!isHomePage) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isHomePage, handleScroll]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const showBreadcrumb = !isHomePage && location.pathname !== '/home';

  // ✅ DEBUG COMPLETO
  console.log('🎯 Header - Estado final:', { 
    isLoggedIn, 
    user: userData?.nome || 'Nenhum usuário',
    hasToken: !!localStorage.getItem('token'),
    hasUser: !!localStorage.getItem('user') // ⚠️ MUDOU PARA "user"
  });

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${showBreadcrumb ? styles.withBreadcrumb : ''}`}
      >
        <div className={styles.headerMain}>
          <div className={styles.headerContent}>
            <div className={styles.logoContainer}>
              <a href="/" className={styles.logoLink}>
                <img
                  src={isScrolled ? LogoOficial : LogoCompleta}
                  alt="Logo"
                  className={styles.logo}
                  loading="eager"
                />
                {!isScrolled && (
                  <p className={styles.tagline}>Seu evento, do jeito que você imagina.</p>
                )}
              </a>
            </div>

            {isScrolled && (
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSubmit={handleSearchSubmit}
                isScrolled={isScrolled}
              />
            )}

            <div className={styles.rightSection}>
              <div className={styles.rightAboveSection}>
                {isScrolled}
                
                {/* ✅ RENDERIZAÇÃO CONDICIONAL */}
                {isLoggedIn && userData ? (
                  <UserProfile 
                    userData={userData} 
                    isScrolled={isScrolled}
                  />
                ) : (
                  <AuthButtons />
                )}
                
                <button
                  onClick={toggleMenu}
                  className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
                  aria-label="Menu"
                  aria-expanded={isMenuOpen}
                >
                  <span className={styles.menuLine}></span>
                  <span className={styles.menuLine}></span>
                  <span className={styles.menuLine}></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {showBreadcrumb && (
          <div className={styles.breadcrumbWrapper}>
            <Breadcrumb additionalPaths={customBreadcrumbs} />
          </div>
        )}

        {!isScrolled && (
          <div className={styles.searchSectionWrapper}>
            <div className={styles.fullSearchSection}>
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSubmit={handleSearchSubmit}
                isScrolled={isScrolled}
                fullWidth
              />
            </div>
          </div>
        )}
      </header>

      <div className={`${styles.headerSpacer} ${isScrolled ? styles.scrolled : ''} ${showBreadcrumb ? styles.withBreadcrumb : ''}`} />

      <MenuDropdown
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}