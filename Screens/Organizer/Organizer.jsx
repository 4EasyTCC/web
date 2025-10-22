// Organizer.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Organizer.module.css';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FavoriteButton from '@/components/FavoriteButton/FavoriteButton';

const API_BASE = 'http://localhost:3000';

const resolveImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url}`;
};

const Organizer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organizer, setOrganizer] = useState(null);
  const [events, setEvents] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_BASE}/organizadores/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao buscar organizador');
        return res.json();
      })
      .then((data) => {
        if (!data.success) throw new Error(data.message || 'Erro');
        setOrganizer(data.organizador || null);
        setEvents(data.eventos || data.organizador?.eventos || []);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

    // fetch whether current user favorited this organizer
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token || !id) return;
            fetch(`${API_BASE}/favoritos/organizadores`, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data && data.organizadoresFavoritos) {
                        const found = data.organizadoresFavoritos.some(o => o.organizadorId == id);
                        setIsFavorited(!!found);
                    }
                })
                .catch(() => {});
        }, [id]);

  const formatarData = (dataString) => {
    if (!dataString) return '';
    try {
      const data = new Date(dataString);
      if (isNaN(data.getTime())) return 'Data inválida';
      return data.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch (error) {
      return 'Data inválida';
    }
  };

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Carregando organizador...</p>
    </div>
  );

  if (error) return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <h2>Erro ao carregar</h2>
      <p>{error}</p>
      <button onClick={() => navigate('/')} className={styles.primaryButton}>
        Voltar para início
      </button>
    </div>
  );

  if (!organizer) return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>👤</div>
      <h2>Organizador não encontrado</h2>
      <p>O organizador solicitado não existe ou não está disponível.</p>
      <button onClick={() => navigate('/')} className={styles.primaryButton}>
        Voltar para início
      </button>
    </div>
  );

  return (
    <><><Header /><div className={styles.container}>
          {/* Header Section */}
          <section className={styles.heroSection}>
              <div className={styles.heroBackground}></div>
              <div className={styles.heroContent}>
                  <div className={styles.organizerHeader}>
                      <div className={styles.avatarContainer}>
                          <div className={styles.avatar}>
                              {organizer.avatarUrl ? (
                                  <img
                                      src={resolveImageUrl(organizer.avatarUrl)}
                                      alt={organizer.nome}
                                      onError={(e) => {
                                          // se a imagem falhar, esconder a tag img e manter o placeholder
                                          e.target.style.display = 'none';
                                      }}
                                  />
                              ) : (
                                  <div className={styles.avatarPlaceholder}>
                                      <span className={styles.placeholderIcon}>3AD</span>
                                  </div>
                              )}
                          </div>
                          <div className={styles.verifiedBadge} title="Organizador verificado">
                              ✓
                          </div>
                      </div>

                      <div className={styles.organizerInfo}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                        <h1 className={styles.organizerName}>{organizer.nome}</h1>
                                                        <FavoriteButton targetType="organizador" targetId={organizer.organizadorId} initialFavorited={isFavorited} size={36} onToggle={(v) => setIsFavorited(!!v)} />
                                                    </div>
                          {organizer.email && (
                              <p className={styles.organizerEmail}>{organizer.email}</p>
                          )}
                          <div className={styles.stats}>
                              <div className={styles.stat}>
                                  <span className={styles.statNumber}>{events.length}</span>
                                  <span className={styles.statLabel}>Eventos</span>
                              </div>
                              <div className={styles.stat}>
                                  <span className={styles.statNumber}>—</span>
                                  <span className={styles.statLabel}>Avaliação</span>
                              </div>
                              <div className={styles.stat}>
                                  <span className={styles.statNumber}>—</span>
                                  <span className={styles.statLabel}>Seguidores</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* Events Section */}
          <section className={styles.eventsSection}>
              <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>
                      Eventos por {organizer.nome}
                      {events.length > 0 && (
                          <span className={styles.eventsCount}>({events.length})</span>
                      )}
                  </h2>
                  {events.length > 0 && (
                      <p className={styles.sectionSubtitle}>
                          Descubra todos os eventos incríveis organizados por {organizer.nome}
                      </p>
                  )}
              </div>

              {events.length === 0 ? (
                  <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>📅</div>
                      <h3>Nenhum evento publicado</h3>
                      <p>Este organizador ainda não publicou nenhum evento.</p>
                  </div>
              ) : (
                  <div className={styles.eventsGrid}>
                      {events.map((event) => (
                          <div
                              key={event.eventoId}
                              className={styles.eventCard}
                              onClick={() => navigate(`/Eventos/${event.eventoId}`)}
                          >
                              <div className={styles.cardImage}>
                                  {event.Midia && event.Midia[0] ? (
                                      <img
                                          src={resolveImageUrl(event.Midia[0].url)}
                                          alt={event.nomeEvento}
                                          onError={(e) => {
                                              // se falhar, esconder a imagem e renderizar placeholder alternativo
                                              e.target.style.display = 'none';
                                          }}
                                      />
                                  ) : (
                                      <div className={styles.imagePlaceholder}>
                                          <span className={styles.placeholderIcon}>3AB</span>
                                      </div>
                                  )}

                                  {/* Event Status Badge */}
                                  <div className={styles.eventBadge}>
                                      {event.statusEvento === 'ativo' ? 'Ativo' : 'Inativo'}
                                  </div>
                              </div>

                              <div className={styles.cardContent}>
                                  <h3 className={styles.eventTitle}>{event.nomeEvento}</h3>
                                  <p className={styles.eventDescription}>
                                      {event.descEvento?.substring(0, 100) || 'Descrição não disponível'}...
                                  </p>

                                  <div className={styles.eventMeta}>
                                      <div className={styles.metaItem}>
                                          <span className={styles.metaIcon}>📍</span>
                                          <span>{event.localizacao?.cidade || 'Local a definir'}</span>
                                      </div>
                                      <div className={styles.metaItem}>
                                          <span className={styles.metaIcon}>📅</span>
                                          <span>{formatarData(event.dataInicio)}</span>
                                      </div>
                                  </div>

                                  <div className={styles.eventFooter}>
                                      <span className={styles.eventType}>{event.tipoEvento || 'Evento'}</span>
                                      <div className={styles.cardAction}>
                                          <span className={styles.actionText}>Ver detalhes</span>
                                          <span className={styles.actionArrow}>→</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </section>
      </div></><Footer /></>
  );
};

export default Organizer;