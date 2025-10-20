// components/Profile/PreferencesTab.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PreferencesTab.module.css';

const resolveImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `http://localhost:3000${url}`;
};

const PreferencesTab = ({ eventosFavoritos = [], profissoesFavoritas = [] }) => {
  const navigate = useNavigate();

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
            {(profissoesFavoritas || []).map((profissao, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesTab;