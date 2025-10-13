import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import styles from "./HeroCarousel.module.css";

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegação

  const API_BASE_URL = "http://localhost:3000";

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/eventos/home?limite=5`);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Dados recebidos da API:", data);

      if (data.success && data.eventos && data.eventos.length > 0) {
        const formattedEvents = data.eventos.map((evento) => ({
          id: evento.eventoId,
          image:
            evento.Midia && evento.Midia.length > 0
              ? `${API_BASE_URL}${evento.Midia[0].url}` // URL COMPLETA para a imagem
              : "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          alt: evento.nomeEvento || "Evento",
          nome: evento.nomeEvento || "Evento sem nome",
          local: evento.localizacao
            ? `${evento.localizacao.cidade || ""}${
                evento.localizacao.estado
                  ? ", " + evento.localizacao.estado
                  : ""
              }`
            : "Local a definir",
          data: formatEventDate(evento.dataInicio, evento.horaInicio),
        }));

        console.log("Eventos formatados:", formattedEvents);
        setEvents(formattedEvents);
      } else {
        setEvents([]);
        setError("Nenhum evento encontrado");
      }
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
      setError(
        "Erro ao carregar eventos. Verifique se o servidor está rodando."
      );
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const formatEventDate = (dateString, timeString) => {
    if (!dateString) return "Data não definida";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Data inválida";

      const formattedDate = date.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      });

      if (timeString) {
        const timeMatch = timeString.match(/T(\d{2}:\d{2})/);
        if (timeMatch) {
          return `${formattedDate} às ${timeMatch[1]}`;
        }
      }

      return formattedDate;
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

  // Função para navegar para a página do evento
  const handleEventClick = (eventoId) => {
    navigate(`/Eventos/${eventoId}`);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const getSlidePosition = (index) => {
    if (events.length === 0) return "hidden";

    const diff = (index - currentIndex + events.length) % events.length;

    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === 2) return "far-right";
    if (diff === events.length - 1) return "left";
    if (diff === events.length - 2) return "far-left";
    return "hidden";
  };

  const getSlideStyle = (position) => {
    const baseStyle = {
      transition: transitioning ? "all 0.5s ease" : "none",
      zIndex: 1,
      left: "50%",
      transformOrigin: "center center",
    };

    switch (position) {
      case "center":
        return {
          ...baseStyle,
          transform: "translateX(-50%) scale(1.1)",
          zIndex: 5,
          opacity: 1,
          cursor: "pointer",
          width: "clamp(400px, 40vw, 600px)",
          height: "clamp(300px, 30vw, 450px)",
        };
      case "right":
        return {
          ...baseStyle,
          transform: "translateX(calc(-50% + 60%)) scale(0.9)",
          zIndex: 4,
          opacity: 0.9,
          width: "clamp(300px, 30vw, 450px)",
          height: "clamp(225px, 22.5vw, 337px)",
        };
      case "far-right":
        return {
          ...baseStyle,
          transform: "translateX(calc(-50% + 120%)) scale(0.8)",
          zIndex: 3,
          opacity: 0.8,
          width: "clamp(250px, 25vw, 375px)",
          height: "clamp(187px, 18.7vw, 280px)",
        };
      case "left":
        return {
          ...baseStyle,
          transform: "translateX(calc(-50% - 60%)) scale(0.9)",
          zIndex: 4,
          opacity: 0.9,
          width: "clamp(300px, 30vw, 450px)",
          height: "clamp(225px, 22.5vw, 337px)",
        };
      case "far-left":
        return {
          ...baseStyle,
          transform: "translateX(calc(-50% - 120%)) scale(0.8)",
          zIndex: 3,
          opacity: 0.8,
          width: "clamp(250px, 25vw, 375px)",
          height: "clamp(187px, 18.7vw, 280px)",
        };
      default:
        return {
          ...baseStyle,
          transform: "translateX(-50%) scale(0.7)",
          zIndex: 0,
          opacity: 0,
        };
    }
  };

  const goToNext = () => {
    if (transitioning || events.length === 0) return;
    setTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % events.length);
    setTimeout(() => setTransitioning(false), 500);
  };

  const goToPrev = () => {
    if (transitioning || events.length === 0) return;
    setTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    setTimeout(() => setTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (transitioning || index === currentIndex || events.length === 0) return;
    setTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setTransitioning(false), 500);
  };

  if (loading) {
    return (
      <div className={styles.carouselWrapper}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Carregando eventos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.carouselWrapper}>
        <div className={styles.errorContainer}>
          <p>{error}</p>
          <button onClick={fetchEvents} className={styles.retryButton}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={styles.carouselWrapper}>
        <div className={styles.emptyContainer}>
          <p>Nenhum evento disponível no momento</p>
          <button onClick={fetchEvents} className={styles.retryButton}>
            Recarregar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselContainer}>
        {events.map((event, index) => {
          const position = getSlidePosition(index);
          const style = getSlideStyle(position);

          return (
            <div
              key={event.id || index}
              className={styles.slide}
              style={style}
              onClick={() => {
                if (position === "center") {
                  handleEventClick(event.id); // Navegar para a página do evento
                } else {
                  goToSlide(index); // Mudar para o slide clicado
                }
              }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (position === "center") {
                    handleEventClick(event.id);
                  } else {
                    goToSlide(index);
                  }
                }
              }}
            >
              <div className={styles.eventImage}>
                <img
                  src={event.image}
                  alt={event.alt}
                  onError={(e) => {
                    console.error(`Erro ao carregar imagem: ${event.image}`);
                    e.target.src =
                      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                  }}
                  onLoad={() => {
                    console.log(`Imagem carregada: ${event.image}`);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {events.length > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={goToPrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
            </svg>
          </button>
          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={goToNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>

          <div className={styles.dotsContainer}>
            {events.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.activeDot : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para o slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className={styles.currentEventInfo}>
        <h3>{events[currentIndex].nome}</h3>
        <div className={styles.eventDetails}>
          <span>📍 {events[currentIndex].local}</span>
          <span>🗓️ {events[currentIndex].data}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;