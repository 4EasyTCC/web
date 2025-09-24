import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './CarouselColecao.module.css';

const CollectionsCarousel = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  // Função para navegar para uma coleção específica
 const navigateToCollection = (collectionId) => {
  navigate(`/PageColecoes/${collectionId}`);
};

    const collectionId = collectionIds[collectionName];
    if (collectionId) {
      navigate(`/colecao/${collectionId}`);
    }
  };

  // Funções para renderizar os ícones SVG
  const renderIcon = (iconName) => {
    const iconSize = 24;
    const iconColor = "#000000";

    const icons = {
      "Arte, Cultura e Lazer": (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      "Congressos e Palestras": (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h20"></path>
          <path d="M21 3v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
          <rect x="1" y="13" width="22" height="8" rx="2"></rect>
        </svg>
      ),
      "Cursos e Workshops": (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          <line x1="12" y1="7" x2="12" y2="13"></line>
          <line x1="9" y1="10" x2="15" y2="10"></line>
        </svg>
      ),
      "Esporte": (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4" />
          <path d="M12 12a12.6 12.6 0 0 1-8.7 5" />
          <path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5" />
          <path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10" />
          <path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      "Festas e Shows": (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.8 11.3 2 22l10.7-3.79" />
          <path d="M4 3h.01" />
          <path d="M22 8h.01" />
          <path d="M15 2h.01" />
          <path d="M22 20h.01" />
          <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
          <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" />
          <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" />
          <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
        </svg>
      ),
      "Gastronomia": (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8a2 2 0 0 0-2-2V5a3 3 0 1 0-6 0v1a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8Z"></path>
          <path d="M9 5a3 3 0 0 1 6 0v1a3 3 0 0 1-6 0V5Z"></path>
          <path d="M9 8h6"></path>
          <path d="M9 12h6"></path>
        </svg>
      ),
      "Games e Geek": (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
          <circle cx="17" cy="10" r="1"></circle>
          <circle cx="7" cy="10" r="1"></circle>
        </svg>
      ),
      "Grátis": (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      ),
      "Infantil": (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <circle cx="17.5" cy="17.5" r="3.5" />
        </svg>
      ),
      "Moda e Beleza": (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
          <path d="M8 11V6a4 4 0 0 1 8 0v5" />
        </svg>
      ),
      "Passeios e Tours": (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 13v8" />
          <path d="M12 3v3" />
          <path d="M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z" />
        </svg>
      ),
      "Religião e Espiritualidade": (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 9h4" />
          <path d="M12 7v5" />
          <path d="M14 22v-4a2 2 0 0 0-4 0v4" />
          <path d="M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22" />
          <path d="m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7" />
        </svg>
      ),
      "Saúde e Bem-Estar": (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8"></path>
          <path d="M8 12h8"></path>
        </svg>
      ),
      "Teatros e Espetáculos": (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      )
    };

    return icons[iconName] || (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    );
  };

  // Coleções atualizadas com IDs correspondentes
  const allCollections = [
    { id: 1, name: "Arte, Cultura e Lazer" },
    { id: 2, name: "Congressos e Palestras" },
    { id: 3, name: "Cursos e Workshops" },
    { id: 4, name: "Esporte" },
    { id: 5, name: "Festas e Shows" },
    { id: 6, name: "Gastronomia" },
    { id: 7, name: "Games e Geek" },
    { id: 8, name: "Grátis" },
    { id: 9, name: "Infantil" },
    { id: 10, name: "Moda e Beleza" },
    { id: 11, name: "Passeios e Tours" },
    { id: 12, name: "Religião e Espiritualidade" },
    { id: 13, name: "Saúde e Bem-Estar" },
    { id: 14, name: "Teatros e Espetáculos" }
  ];

  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);

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
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className={`${styles.navButton} ${isLastSlide ? styles.disabledButton : ''}`}
              disabled={isLastSlide}
              aria-label="Próximo slide"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          <button
            className={styles.seeAllButton}
            onClick={() => navigateTo('/PageColecoes')}
          >
            <b>Ver tudo</b>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer}>
          <Slider ref={sliderRef} {...settings}>
            {allCollections.map((collection, index) => (
              <div key={collection.id} className={styles.collectionItem}>
                <button
                  className={styles.square}
                  onClick={() => navigateTo(`/PageColecoes/${collection.id}`)}
                >
                  <div className={styles.iconContainer}>
                    {renderIcon(collection.name)}
                  </div>
                  <span className={styles.collectionName}>{collection.name}</span>
                </button>
              </div>
            ))}
            <div className={styles.collectionItem}>
              <button
                className={styles.finalSquare}
                onClick={() => navigateTo('/PageColecoes')}
              >
                <div className={styles.iconContainer}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
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