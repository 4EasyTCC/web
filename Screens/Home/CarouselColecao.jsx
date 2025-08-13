import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './CarouselColecao.module.css';

const CollectionsCarousel = () => {
  const allCollections = [
    "Coleção 1", "Coleção 2", "Coleção 3", 
    "Coleção 4", "Coleção 5", "Coleção 6",
    "Coleção 7", "Coleção 8", "Coleção 9",
    "Coleção 10", "Coleção 11", "Coleção 12",   
    "Coleção 13", "Coleção 14", "Coleção 15",
    "Coleção 16", "Coleção 17"
  ];

  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);

  const handleSeeAllClick = () => {
    // Redirecionar para página de todas as coleções
    window.location.href = '/todas-colecoes';
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(5);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 480) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToNext = () => sliderRef.current.slickNext();
  const goToPrev = () => sliderRef.current.slickPrev();

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide + slidesToShow >= allCollections.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>COLEÇÕES</h2>
        <div className={styles.controls}>
          <div className={styles.arrows}>
            <button 
              onClick={goToPrev}
              className={`${styles.navButton} ${isFirstSlide ? styles.disabledButton : ''}`}
              disabled={isFirstSlide}
              aria-label="Slide anterior"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={goToNext}
              className={`${styles.navButton} ${isLastSlide ? styles.disabledButton : ''}`}
              disabled={isLastSlide}
              aria-label="Próximo slide"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
          <button 
            className={styles.seeAllButton}
            onClick={handleSeeAllClick}
          >
            <b>Ver tudo</b>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer}>
          <Slider ref={sliderRef} {...settings}>
            {allCollections.map((item, index) => (
              <div key={index} className={styles.collectionItem}>
                <div className={styles.ball}>
                  <span>{item}</span>
                </div>
              </div>
            ))}
            <div className={styles.collectionItem}>
              <button 
                className={styles.finalButton}
                onClick={handleSeeAllClick}
              >
                Ver tudo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CollectionsCarousel;