// components/Profile/PreferencesTab.jsx
import React from 'react';
import styles from './PreferencesTab.module.css';

const PreferencesTab = ({ eventosFavoritos, profissoesFavoritas }) => {
  return (
    <div className={styles.preferencesContainer}>
      <h2>Preferências</h2>
      
      <div className={styles.preferencesGrid}>
        <div className={styles.preferenceSection}>
          <h3>⭐ Eventos Favoritos</h3>
          <div className={styles.itemsGrid}>
            {eventosFavoritos.map((evento, index) => (
              <div key={index} className={styles.itemCard}>
                <div className={styles.itemImage}>
                  {evento.imagem ? (
                    <img src={evento.imagem} alt={evento.nome} />
                  ) : (
                    <div className={styles.placeholderImage}>🎭</div>
                  )}
                </div>
                <div className={styles.itemName}>{evento.nome}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.preferenceSection}>
          <h3>👨‍💼 Profissionais Favoritos</h3>
          <div className={styles.itemsGrid}>
            {profissoesFavoritas.map((profissao, index) => (
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