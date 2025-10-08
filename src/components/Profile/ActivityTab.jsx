// components/Profile/ActivityTab.jsx
import React from 'react';
import styles from './ActivityTab.module.css';

const ActivityTab = () => {
  // Dados mockados - você pode substituir por dados reais
  const atividades = [
    { tipo: 'evento', acao: 'participou do', nome: 'Festival de Verão 2024', data: '2024-02-15', icon: '🎪' },
    { tipo: 'avaliacao', acao: 'avaliou', nome: 'Show da Banda X', data: '2024-02-10', icon: '⭐' },
    { tipo: 'amizade', acao: 'adicionou', nome: 'Maria Silva', data: '2024-02-05', icon: '👥' },
    { tipo: 'evento', acao: 'confirmou presença em', nome: 'Workshop de Gastronomia', data: '2024-01-28', icon: '🎪' },
  ];

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.activityContainer}>
      <h2>Atividade Recente</h2>
      
      <div className={styles.activityList}>
        {atividades.map((atividade, index) => (
          <div key={index} className={styles.activityItem}>
            <div className={styles.activityIcon}>
              {atividade.icon}
            </div>
            <div className={styles.activityContent}>
              <div className={styles.activityText}>
                <strong>Você</strong> {atividade.acao} <strong>{atividade.nome}</strong>
              </div>
              <div className={styles.activityDate}>
                {formatarData(atividade.data)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.emptyState}>
        <p>🎯 Suas atividades aparecerão aqui</p>
        <small>Participe de eventos e interaja com outros usuários para ver sua atividade</small>
      </div>
    </div>
  );
};

export default ActivityTab;