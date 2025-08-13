import React, { useState } from 'react';
import styles from './CarouselCriadores.module.css';

const CarouselCriadores = ({ criadores }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === criadores.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? criadores.length - 1 : prevIndex - 1
    );
  };

  const getAdjacentIndex = (offset) => {
    return (currentIndex + offset + criadores.length) % criadores.length;
  };

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.navButton} onClick={prevSlide} aria-label="Slide anterior">
        &lt;
      </button>
      
      <div className={styles.carousel}>
        {/* Slide anterior */}
        <div className={`${styles.slide} ${styles.leftSlide}`}>
          <div className={styles.imageWrapper}>
            <img 
              src={criadores[getAdjacentIndex(-1)].image} 
              alt={criadores[getAdjacentIndex(-1)].alt} 
              className={styles.slideImage}
            />
          </div>
          <div className={styles.slideInfo}>
            <h3>{criadores[getAdjacentIndex(-1)].nome}</h3>
          </div>
        </div>

        {/* Slide atual */}
        <div className={`${styles.slide} ${styles.centerSlide}`}>
          <div className={styles.imageWrapper}>
            <img 
              src={criadores[currentIndex].image} 
              alt={criadores[currentIndex].alt} 
              className={styles.slideImage}
            />
          </div>
          <div className={styles.slideInfo}>
            <h3>{criadores[currentIndex].nome}</h3>
            <p>{criadores[currentIndex].descricao}</p>
          </div>
        </div>

        {/* Próximo slide */}
        <div className={`${styles.slide} ${styles.rightSlide}`}>
          <div className={styles.imageWrapper}>
            <img 
              src={criadores[getAdjacentIndex(1)].image} 
              alt={criadores[getAdjacentIndex(1)].alt} 
              className={styles.slideImage}
            />
          </div>
          <div className={styles.slideInfo}>
            <h3>{criadores[getAdjacentIndex(1)].nome}</h3>
          </div>
        </div>
      </div>

      <button className={styles.navButton} onClick={nextSlide} aria-label="Próximo slide">
        &gt;
      </button>
    </div>
  );
};

export default CarouselCriadores;   