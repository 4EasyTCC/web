import React, { useState } from 'react';
import styles from './CarouselEvents.module.css';

const CarouselEvents = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const getSlidePosition = (index) => {
    const diff = (index - currentIndex + events.length) % events.length;
    
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === 2) return 'far-right';
    if (diff === events.length - 1) return 'left';
    if (diff === events.length - 2) return 'far-left';
    return 'hidden';
  };

 const getSlideStyle = (position) => {
  const baseStyle = {
    transition: transitioning ? 'all 0.5s ease' : 'none',
    zIndex: 1,
    left: '50%',
    transformOrigin: 'center center'
  };

  switch (position) {
    case 'center':
      return { 
        ...baseStyle, 
        transform: 'translateX(-50%) scale(1.1)',
        zIndex: 5,
        opacity: 1,
        cursor: 'pointer',
        width: 'clamp(400px, 40vw, 600px)',
        height: 'clamp(300px, 30vw, 450px)'
      };
    case 'right':
      return { 
        ...baseStyle, 
        transform: 'translateX(calc(-50% + 60%)) scale(0.9)',
        zIndex: 4,
        opacity: 0.9,
        width: 'clamp(300px, 30vw, 450px)',
        height: 'clamp(225px, 22.5vw, 337px)'
      };
    case 'far-right':
      return { 
        ...baseStyle, 
        transform: 'translateX(calc(-50% + 120%)) scale(0.8)',
        zIndex: 3,
        opacity: 0.8,
        width: 'clamp(250px, 25vw, 375px)',
        height: 'clamp(187px, 18.7vw, 280px)'
      };
    case 'left':
      return { 
        ...baseStyle, 
        transform: 'translateX(calc(-50% - 60%)) scale(0.9)',
        zIndex: 4,
        opacity: 0.9,
        width: 'clamp(300px, 30vw, 450px)',
        height: 'clamp(225px, 22.5vw, 337px)'
      };
    case 'far-left':
      return { 
        ...baseStyle, 
        transform: 'translateX(calc(-50% - 120%)) scale(0.8)',
        zIndex: 3,
        opacity: 0.8,
        width: 'clamp(250px, 25vw, 375px)',
        height: 'clamp(187px, 18.7vw, 280px)'
      };
    default:
      return { 
        ...baseStyle, 
        transform: 'translateX(-50%) scale(0.7)',
        zIndex: 0,
        opacity: 0
      };
  }
};
  const goToNext = () => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % events.length);
    setTimeout(() => setTransitioning(false), 500);
  };

  const goToPrev = () => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    setTimeout(() => setTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (transitioning || index === currentIndex) return;
    setTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setTransitioning(false), 500);
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselContainer}>
        {events.map((event, index) => {
          const position = getSlidePosition(index);
          const style = getSlideStyle(position);
          
          return (
            <div 
              key={index}
              className={styles.slide}
              style={style}
              onClick={() => position === 'center' && goToSlide(index)}
            >
              <div className={styles.eventImage}>
                <img src={event.image} alt={event.alt} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Botões de navegação */}
      <button className={`${styles.arrow} ${styles.arrowPrev}`} onClick={goToPrev}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
        </svg>
      </button>
      <button className={`${styles.arrow} ${styles.arrowNext}`} onClick={goToNext}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      </button>

      {/* Dots de navegação */}
      <div className={styles.dotsContainer}>
        {events.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para o slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Descrição do slide atual */}
      <div className={styles.currentEventInfo}>
        <h3>{events[currentIndex].nome}</h3>
        <p className={styles.artist}>{events[currentIndex].artista}</p>
        <div className={styles.eventDetails}>
          <span>📍 {events[currentIndex].local}</span>
          <span>🗓️ {events[currentIndex].data}</span>
        </div>
      </div>
    </div>
  );
};

export default CarouselEvents;