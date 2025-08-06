import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import SearchBar from './SearchBar/SearchBar';
import AuthButtons from './AuthButtons/AuthButtons';
import LocationSelector from './LocationSelector/LocationSelector';
import MenuDropdown from './MenuDropdown/MenuDropdown';
import LogoOficial from '@images/logos/LogoOficial.png';
import LogoCompleta from '@images/logos/LogoExtended.png';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const headerRef = useRef(null);
  const animationFrameId = useRef(null);
  const lastScrollY = useRef(0);

  // Inicialização do estado de scroll
  useEffect(() => {
    setIsScrolled(isHomePage ? window.scrollY > 50 : true);
  }, [isHomePage]);

  // Handler de scroll otimizado
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    lastScrollY.current = currentScrollY;
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    animationFrameId.current = requestAnimationFrame(() => {
      const shouldBeScrolled = currentScrollY > 50;
      if (shouldBeScrolled !== isScrolled) {
        // Força um reflow antes da atualização
        if (headerRef.current) {
          headerRef.current.style.willChange = 'transform, background';
          headerRef.current.getBoundingClientRect();
        }
        setIsScrolled(shouldBeScrolled);
      }
    });
  }, [isScrolled]);

  useEffect(() => {
    if (!isHomePage) return;

    // Debounce para evitar chamadas excessivas
    const debouncedScroll = () => {
      setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
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

  return (
    <>
      {!isScrolled && isHomePage && (
        <div style={{ 
          height: '180px',
          position: 'relative',
          zIndex: -1,
          pointerEvents: 'none'
        }} />
      )}

      <header
        ref={headerRef}
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        style={{ zIndex: 1000 }}
      >
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
              {isScrolled && <LocationSelector />}
              <AuthButtons />
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
              <div className={styles.filtersRow}>
                <LocationSelector variant="filter" />
              </div>
            </div>
          </div>
        )}
      </header>

      <MenuDropdown
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        style={{ zIndex: 1001 }}
      />

      <div className={styles.headerSpacer} />
    </>
  );
}