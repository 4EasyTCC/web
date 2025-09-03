import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './AlternativeHeader.module.css';
import logoExtended from '@images/logos/logoExtended.png';

export default function AlternativeHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logoLink}>
            <img
              src={logoExtended}
              alt="Logo 4Easy"
              className={styles.logo}
            />
          </Link>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.rightSection}>
          <h2 className={location.pathname === '/about' ? styles.active : ''}>Sobre nós</h2>
        </div>
      </div>
    </header>
  );
}