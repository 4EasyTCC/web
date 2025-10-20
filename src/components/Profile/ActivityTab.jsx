// components/Profile/ActivityTab.jsx
import React, { useEffect, useState } from 'react';
import styles from './ActivityTab.module.css';

const ActivityTab = () => {
  const [atividades, setAtividades] = useState([]);

  const carregarAtividades = () => {
    const storedPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    // Cada purchase pode ter quantidade; agregamos por evento para mostrar quantidade total por evento
    const aggregated = storedPurchases.reduce((acc, p) => {
      const key = p.eventoId ? `${p.eventoId}` : `ingresso-${p.ingressoId}`;
      if (!acc[key]) {
        acc[key] = {
          tipo: 'evento',
          acao: 'comprou',
          nome: p.nome,
          data: p.compradoEm,
          quantidade: p.quantidade || 1,
          icon: '🎫',
        };
      } else {
        acc[key].quantidade += p.quantidade || 1;
        // manter a data mais recente como referência
        if (new Date(p.compradoEm) > new Date(acc[key].data)) {
          acc[key].data = p.compradoEm;
        }
      }
      return acc;
    }, {});

    const a = Object.values(aggregated);
    // ordenar por data (mais recente primeiro)
    a.sort((x, y) => new Date(y.data) - new Date(x.data));
    setAtividades(a);
  };

  useEffect(() => {
    carregarAtividades();
    window.addEventListener('purchasesChanged', carregarAtividades);
    return () => window.removeEventListener('purchasesChanged', carregarAtividades);
  }, []);

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
                {atividade.quantidade && atividade.quantidade > 1 && (
                  <span> — {atividade.quantidade} unidades</span>
                )}
              </div>
              <div className={styles.activityDate}>
                {formatarData(atividade.data)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {atividades.length === 0 && (
        <div className={styles.emptyState}>
          <p>🎯 Suas atividades aparecerão aqui</p>
          <small>Participe de eventos e interaja com outros usuários para ver sua atividade</small>
        </div>
      )}
    </div>
  );
};

export default ActivityTab;