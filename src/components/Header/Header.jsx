// Header.jsx (atualizado)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import SearchBar from './SearchBar/SearchBar';
import AuthButtons from './AuthButtons/AuthButtons';
import UserProfile from './UserProfile/UserProfile'; // Novo componente
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticação
  const [userData, setUserData] = useState(null); // Dados do usuário
  const headerRef = useRef(null);
  const animationFrameId = useRef(null);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('userData');
      
      if (token && user) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(user));
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuthStatus();
    
    // Ouvir eventos de login/logout
    window.addEventListener('userLoggedIn', checkAuthStatus);
    window.addEventListener('userLoggedOut', checkAuthStatus);
    
    return () => {
      window.removeEventListener('userLoggedIn', checkAuthStatus);
      window.removeEventListener('userLoggedOut', checkAuthStatus);
    };
  }, []);

  // Restante do código permanece igual...
  // Inicialização do estado de scroll
  useEffect(() => {
    setIsScrolled(isHomePage ? window.scrollY > 50 : true);
  }, [isHomePage]);

  // Handler de scroll otimizado
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

  // Não mostrar breadcrumb na homepage
  const showBreadcrumb = !isHomePage && location.pathname !== '/home';

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
                
                {/* Substituição dos AuthButtons pelo UserProfile quando logado */}
                {isLoggedIn ? (
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