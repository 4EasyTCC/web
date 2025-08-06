import React, { useRef, useState } from 'react';
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
      }
    ]
  };

  const goToNext = () => sliderRef.current.slickNext();
  const goToPrev = () => sliderRef.current.slickPrev();

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide + settings.slidesToShow >= allCollections.length + 1; // +1 para o botão "Ver tudo"

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
            >
              &lt;
            </button>
            <button 
              onClick={goToNext}
              className={`${styles.navButton} ${isLastSlide ? styles.disabledButton : ''}`}
              disabled={isLastSlide}
            >
              &gt;
            </button>
          </div>
          <button className={styles.seeAllButton}><b>Ver tudo</b></button>
        </div>
      </div>
      
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer}>
          <Slider ref={sliderRef} {...settings}>
            {allCollections.map((item, index) => (
              <div key={index} className={styles.collectionItem}>
                <div className={styles.ball}>{item}</div>
              </div>
            ))}
            <div className={styles.collectionItem}>
              <button className={styles.finalButton}>
                Ver tudo
              </button>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CollectionsCarousel;