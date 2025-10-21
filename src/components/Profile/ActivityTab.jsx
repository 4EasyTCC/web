import React, { useEffect, useState } from 'react';
import styles from './ActivityTab.module.css';
import { useNavigate } from 'react-router-dom';

const ActivityTab = () => {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const carregarAtividadesBackend = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setAtividades([]);
        setLoading(false);
        return;
      }

      const res = await fetch('http://localhost:3000/perfil/convidado', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Erro ao carregar atividades do servidor');
      }

      const body = await res.json();
      const compras = body.comprasHistorico || [];

      const mapped = compras.map(c => ({
        key: `compra-${c.compraId}`,
        tipo: 'compra',
        acao: 'comprou',
        nome: c.ingresso?.nome || c.ingressoId || 'Ingresso',
        eventoNome: c.ingresso?.eventoNome,
        quantidade: c.quantidade || 1,
        data: c.compradoEm || c.compradoEm || c.compradoEm,
        preco: c.valorTotal,
        ingressoId: c.ingressoId,
        eventoId: c.ingresso?.eventoId || c.eventoId,
      }));

      mapped.sort((a, b) => new Date(b.data) - new Date(a.data));
      setAtividades(mapped);
    } catch (err) {
      console.error('Erro ao carregar atividades do backend:', err);
      setError(err.message || 'Erro desconhecido');
      setAtividades([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAtividadesBackend();

    const handler = (e) => {
      carregarAtividadesBackend();
    };

    window.addEventListener('purchaseRecorded', handler);
    return () => window.removeEventListener('purchaseRecorded', handler);
  }, []);

  const formatarData = (data) => {
    try {
      return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (e) {
      return '';
    }
  };

  if (loading) return <div className={styles.loading}>Carregando atividades...</div>;

  return (
    <div className={styles.activityContainer}>
      <h2>Atividade Recente</h2>

      {error && (
        <div className={styles.errorBox}>
          <strong>Erro:</strong> {error}
        </div>
      )}

      <div className={styles.activityList}>
        {atividades.map((atividade) => (
          <div key={atividade.key} className={styles.activityItem} onClick={() => atividade.eventoId && navigate(`/Eventos/${atividade.eventoId}`)} role="button" tabIndex={0}>
            <div className={styles.activityIcon}>🎫</div>
            <div className={styles.activityContent}>
              <div className={styles.activityText}>
                <strong>Você</strong> {atividade.acao} <strong>{atividade.eventoNome || atividade.nome}</strong>
                {atividade.quantidade && atividade.quantidade > 1 && (
                  <span> — {atividade.quantidade} unidades</span>
                )}
              </div>
              <div className={styles.activityMeta}>
                <span className={styles.activityDate}>{formatarData(atividade.data)}</span>
                {atividade.preco !== undefined && (
                  <span className={styles.activityPrice}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(atividade.preco)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {atividades.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎯</div>
          <h3>Você ainda não realizou compras</h3>
          <p>Compre ingressos nos eventos para ver sua atividade aqui.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityTab;