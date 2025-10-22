// components/Profile/PreferencesTab.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PreferencesTab.module.css';

const API_BASE = 'http://localhost:3000';

const resolveImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `http://localhost:3000${url}`;
};

const PreferencesTab = ({ eventosFavoritos = [], profissoesFavoritas = [] }) => {
  const navigate = useNavigate();
  const [organizadoresFavoritos, setOrganizadoresFavoritos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${API_BASE}/favoritos/organizadores`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.organizadoresFavoritos) {
          setOrganizadoresFavoritos(data.organizadoresFavoritos);
        }
      })
      .catch(err => console.warn('Erro ao buscar organizadores favoritados', err));
  }, []);

  const handleEventClick = (eventoId) => {
    if (!eventoId) return;
    navigate(`/Eventos/${eventoId}`);
  };

  return (
    <div className={styles.preferencesContainer}>
      <h2>Preferências</h2>

      <div className={styles.preferencesGrid}>
        <div className={styles.preferenceSection}>
          <h3>⭐ Eventos Favoritos</h3>
          <div className={styles.itemsGrid}>
            {(eventosFavoritos || []).map((evento, index) => {
              const nome = evento.nomeEvento || evento.nome || 'Evento';
              const imagemUrl = evento.Midia && evento.Midia.length > 0 ? resolveImageUrl(evento.Midia[0].url) : null;
              return (
                <div
                  key={evento.eventoId || index}
                  className={styles.itemCard}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleEventClick(evento.eventoId)}
                  onKeyPress={(e) => { if (e.key === 'Enter') handleEventClick(evento.eventoId); }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.itemImage}>
                    {imagemUrl ? (
                      <img src={imagemUrl} alt={nome} />
                    ) : (
                      <div className={styles.placeholderImage}>🎭</div>
                    )}
                  </div>
                  <div className={styles.itemName}>{nome}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.preferenceSection}>
          <h3>👨‍💼 Profissionais Favoritos</h3>
          <div className={styles.itemsGrid}>
            {/* Render organizers favorited by the user */}
            {organizadoresFavoritos.length > 0 ? (
              organizadoresFavoritos.map((org) => (
                <div
                  key={org.organizadorId}
                  className={styles.itemCard}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/Organizador/${org.organizadorId}`)}
                  onKeyPress={(e) => { if (e.key === 'Enter') navigate(`/Organizador/${org.organizadorId}`); }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.itemImage}>
                    {org.avatarUrl ? (
                      <img src={org.avatarUrl.startsWith('http') ? org.avatarUrl : `http://localhost:3000${org.avatarUrl}`} alt={org.nome} />
                    ) : (
                      <div className={styles.placeholderImage}>👤</div>
                    )}
                  </div>
                  <div className={styles.itemName}>{org.nome}</div>
                </div>
              ))
            ) : (
              // fallback to profissoesFavoritas if no organizer favorites
              (profissoesFavoritas || []).map((profissao, index) => (
                <div key={index} className={styles.itemCard}>
                  <div className={styles.itemImage}>
                    {profissao.imagem ? (
                      <img src={profissao.imagem} alt={profissao.nome} />
                    ) : (
                      <div className={styles.placeholderImage}>👤</div>
                    )}
                  </div>
                  <div className={styles.itemName}>{profissao.nome}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesTab;