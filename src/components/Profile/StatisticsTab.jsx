// components/Profile/StatisticsTab.jsx
import React from 'react';
import styles from './StatisticsTab.module.css';

const StatisticsTab = ({ estatisticas }) => {
  const stats = [
    { label: 'Eventos Participados', value: estatisticas.eventos, icon: '🎟️', color: '#667eea' },
    { label: 'Amigos', value: estatisticas.amigos, icon: '👥', color: '#764ba2' },
    { label: 'Avaliações', value: estatisticas.avaliacoes, icon: '⭐', color: '#f093fb' },
    { label: 'Notificações', value: estatisticas.notificacoes, icon: '📩', color: '#4facfe' },
  ];

  return (
    <div className={styles.statsContainer}>
      <h2>Estatísticas</h2>
      
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div 
              className={styles.statIcon}
              style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.insights}>
        <h3>Insights</h3>
        <div className={styles.insightList}>
          <div className={styles.insightItem}>
            <span className={styles.insightLabel}>Categoria Mais Frequente:</span>
            <span className={styles.insightValue}>{estatisticas.categoriaMaisFrequente}</span>
          </div>
          <div className={styles.insightItem}>
            <span className={styles.insightLabel}>Local Mais Visitado:</span>
            <span className={styles.insightValue}>{estatisticas.localMaisVisitado}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;