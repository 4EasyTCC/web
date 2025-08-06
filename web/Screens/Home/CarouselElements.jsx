import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './CarouselElements.module.css';

const ElementsCarousel = () => {
  const allElements = [
    "Evento 1", "Evento 2", "Evento 3", 
    "Evento 4", "Evento 5", "Evento 6",
    "Evento 7", "Evento 8", "Coleção 9",
    "Evento 10", "Evento 11", "Evento 12",   
    "Evento 13", "Evento 14", "Evento 15",
    "Evento 16", "Evento 17"
  ];

  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
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

  const goToNext = () => {sliderRef.current.slickNext();}
  const goToPrev = () => sliderRef.current.slickPrev();

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide + settings.slidesToShow >= allElements.length + 1; // +1 para o botão "Ver tudo"

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>VEJA OS PRÓXIMOS EVENTOS</h2>
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
            {allElements.map((item, index) => (
              <div key={index} className={styles.collectionItem}>
                <div className={styles.events}>{item}</div>
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

export default ElementsCarousel;