// components/CategoryCarousel/CategoryCarousel.jsx
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./CategoryCarousel.module.css";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = ({ title, filterType, filterValue }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:3000";

  // Buscar eventos com base no filtro
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const queryParams = new URLSearchParams();

        if (filterType && filterValue) {
          queryParams.append(filterType, filterValue);
        }

        queryParams.append("limite", 16);

        const response = await fetch(
          `${API_BASE_URL}/api/eventos/home?${queryParams}`
        );

        if (!response.ok) {
          throw new Error("Erro na resposta da API");
        }

        const data = await response.json();
        setEvents(data.eventos || []);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        setError("Não foi possível carregar os eventos");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filterType, filterValue]);

  // Configurações responsivas do slider
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setSlidesToShow(4);
      else if (window.innerWidth >= 1024) setSlidesToShow(3);
      else if (window.innerWidth >= 768) setSlidesToShow(2);
      else if (window.innerWidth >= 640) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const goToNext = () => sliderRef.current?.slickNext();
  const goToPrev = () => sliderRef.current?.slickPrev();
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide + slidesToShow >= events.length;

  const handleSeeAllClick = () => {
    const params = new URLSearchParams();
    if (filterType === "categoria") {
      params.set("categoria", filterValue);
    } else if (filterType === "periodo") {
      params.set("periodo", filterValue);
    }
    navigate(`/SearchEvents?${params.toString()}`);
  };

  const handleEventClick = (eventoId) => {
    navigate(`/evento/${eventoId}`);
  };

  const formatarData = (dataString) => {
    if (!dataString) return "Data não definida";
    try {
      const data = new Date(dataString);
      if (isNaN(data.getTime())) return "Data inválida";

      return data.toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        timeZone: "America/Sao_Paulo",
      });
    } catch (error) {
      return "Data inválida";
    }
  };

  const getPrecoMinimo = (ingressos) => {
    if (!ingressos || !Array.isArray(ingressos) || ingressos.length === 0) {
      return null;
    }

    const precos = ingressos
      .map((ingresso) => parseFloat(ingresso.preco))
      .filter((preco) => !isNaN(preco));

    if (precos.length === 0) return null;

    return Math.min(...precos);
  };

  // Componente de loading skeleton
  const renderSkeleton = () => (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.skeletonGrid}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText}></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Componente de erro
  const renderError = () => (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );

  if (loading) {
    return renderSkeleton();
  }

  if (error) {
    return renderError();
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.controls}>
          <div className={styles.arrows}>
            <button
              onClick={goToPrev}
              className={`${styles.navButton} ${
                isFirstSlide ? styles.disabledButton : ""
              }`}
              disabled={isFirstSlide}
              aria-label="Slide anterior"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className={`${styles.navButton} ${
                isLastSlide ? styles.disabledButton : ""
              }`}
              disabled={isLastSlide}
              aria-label="Próximo slide"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          <button className={styles.seeAllButton} onClick={handleSeeAllClick}>
            <span>Ver tudo</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer}>
          <Slider ref={sliderRef} {...settings}>
            {events.map((evento) => {
              const precoMinimo = getPrecoMinimo(evento.Ingressos);
              const temIngressoGratis =
                evento.Ingressos &&
                evento.Ingressos.some(
                  (ingresso) => parseFloat(ingresso.preco) === 0
                );

              return (
                <div key={evento.eventoId} className={styles.eventItem}>
                  <div
                    className={styles.eventCard}
                    onClick={() => handleEventClick(evento.eventoId)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleEventClick(evento.eventoId)
                    }
                  >
                    <div className={styles.eventImage}>
                      <img
                        src={
                          evento.Midia &&
                          evento.Midia.length > 0 &&
                          evento.Midia[0].url
                            ? `${API_BASE_URL}${evento.Midia[0].url}` // URL COMPLETA para a imagem
                            : "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        }
                        alt={evento.nomeEvento || "Evento"}
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                        }}
                        loading="lazy"
                        width={280}
                        height={200}
                      />
                      {temIngressoGratis && (
                        <div className={styles.freeBadge}>Grátis</div>
                      )}
                      <div className={styles.imageOverlay}></div>
                    </div>
                    <div className={styles.eventInfo}>
                      <h3 className={styles.eventName}>
                        {evento.nomeEvento || "Evento sem nome"}
                      </h3>
                      <p className={styles.eventDate}>
                        {formatarData(evento.dataInicio)}
                      </p>
                      <p className={styles.eventLocation}>
                        {evento.localizacao
                          ? `${evento.localizacao.cidade || ""}${
                              evento.localizacao.estado
                                ? ", " + evento.localizacao.estado
                                : ""
                            }`
                          : "Local a definir"}
                      </p>
                      {precoMinimo !== null && !temIngressoGratis && (
                        <p className={styles.eventPrice}>
                          A partir de R$ {precoMinimo.toFixed(2)}
                        </p>
                      )}
                      {temIngressoGratis && (
                        <p className={styles.eventPrice}>Gratuito</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className={styles.eventItem}>
              <button
                className={styles.finalButton}
                onClick={handleSeeAllClick}
              >
                <span>Ver todos</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
