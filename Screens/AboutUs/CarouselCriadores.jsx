import React, { useState, useEffect } from 'react';
import styles from './CarouselCriadores.module.css';

const CarouselCriadores = ({ criadores }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Reiniciar a transição quando o índice mudar
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === criadores.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? criadores.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setCurrentIndex(index);
  };

  const getAdjacentIndex = (offset) => {
    return (currentIndex + offset + criadores.length) % criadores.length;
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselContainer}>
        <button 
          className={`${styles.navButton} ${styles.navButtonLeft}`} 
          onClick={prevSlide} 
          aria-label="Slide anterior"
          disabled={isTransitioning}
        >
          <span className={styles.navArrow}>&#8249;</span>
        </button>
        
        <div className={styles.carousel}>
          {/* Slide anterior (esquerda) */}
          <div className={`${styles.slide} ${styles.leftSlide}`}>
            <div className={styles.slideContent}>
              <div className={styles.imageWrapper}>
                <img 
                  src={criadores[getAdjacentIndex(-1)].image} 
                  alt={criadores[getAdjacentIndex(-1)].alt} 
                  className={styles.slideImage}
                />
                <div className={styles.imageOverlay}></div>
              </div>
              <div className={styles.slideInfo}>
                <h3>{criadores[getAdjacentIndex(-1)].nome}</h3>
                <p className={styles.slideRole}>{criadores[getAdjacentIndex(-1)].cargo}</p>
              </div>
            </div>
          </div>

          {/* Slide atual (centro) */}
          <div className={`${styles.slide} ${styles.centerSlide}`}>
            <div className={styles.slideContent}>
              <div className={styles.imageWrapper}>
                <img 
                  src={criadores[currentIndex].image} 
                  alt={criadores[currentIndex].alt} 
                  className={styles.slideImage}
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.slideBadge}>Destaque</div>
              </div>
              <div className={styles.slideInfo}>
                <h3>{criadores[currentIndex].nome}</h3>
                <p className={styles.slideRole}>{criadores[currentIndex].cargo}</p>
                <p className={styles.slideDescription}>{criadores[currentIndex].descricao}</p>
                <div className={styles.socialLinks}>
                  <button className={styles.socialButton}>in</button>
                  <button className={styles.socialButton}>ig</button>
                  <button className={styles.socialButton}>✉</button>
                </div>
              </div>
            </div>
          </div>

          {/* Próximo slide (direita) */}
          <div className={`${styles.slide} ${styles.rightSlide}`}>
            <div className={styles.slideContent}>
              <div className={styles.imageWrapper}>
                <img 
                  src={criadores[getAdjacentIndex(1)].image} 
                  alt={criadores[getAdjacentIndex(1)].alt} 
                  className={styles.slideImage}
                />
                <div className={styles.imageOverlay}></div>
              </div>
              <div className={styles.slideInfo}>
                <h3>{criadores[getAdjacentIndex(1)].nome}</h3>
                <p className={styles.slideRole}>{criadores[getAdjacentIndex(1)].cargo}</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          className={`${styles.navButton} ${styles.navButtonRight}`} 
          onClick={nextSlide} 
          aria-label="Próximo slide"
          disabled={isTransitioning}
        >
          <span className={styles.navArrow}>&#8250;</span>
        </button>
      </div>

      {/* Indicadores de slide */}
      <div className={styles.indicators}>
        {criadores.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselCriadores;