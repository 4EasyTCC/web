import React, { useState, useEffect } from 'react';
import styles from './FavoriteButton.module.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3000';

const FavoriteButton = ({ eventoId, initialFavorited = false, size = 32, targetId, targetType = 'evento', onToggle }) => {
  // Backwards compatibility: if eventoId passed, use it as targetId and type 'evento'
  const resolvedTargetId = targetId || eventoId;
  const resolvedTargetType = targetType || (eventoId ? 'evento' : 'evento');
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorited(initialFavorited);
  }, [initialFavorited]);

  const toggleFavorite = async (e) => {
    e && e.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/PaginaLogin');
      return;
    }

    setLoading(true);
    try {
      if (!resolvedTargetId) throw new Error('Target ID não informado');

  if (!favorited) {
        // Create favorite depending on type
        if (resolvedTargetType === 'organizador') {
          const res = await fetch(`${API_BASE}/favoritos/organizadores`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ organizadorId: resolvedTargetId }),
          });
          if (!res.ok) throw new Error('Falha ao favoritar organizador');
        } else {
          const res = await fetch(`${API_BASE}/favoritos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ eventoId: resolvedTargetId }),
          });
          if (!res.ok) throw new Error('Falha ao favoritar evento');
        }
  setFavorited(true);
  if (typeof onToggle === 'function') onToggle(true);
      } else {
        if (resolvedTargetType === 'organizador') {
          const res = await fetch(`${API_BASE}/favoritos/organizadores/${resolvedTargetId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('Falha ao remover favorito organizador');
        } else {
          const res = await fetch(`${API_BASE}/favoritos/${resolvedTargetId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('Falha ao remover favorito');
        }
  setFavorited(false);
  if (typeof onToggle === 'function') onToggle(false);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Erro ao atualizar favorito');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`${styles.favButton} ${favorited ? styles.active : ''}`}
      onClick={toggleFavorite}
      aria-pressed={favorited}
      style={{ width: size, height: size }}
      title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <svg viewBox="0 0 24 24" width={size - 6} height={size - 6} fill={favorited ? 'red' : 'none'} stroke={favorited ? 'red' : 'currentColor'} strokeWidth="1.5">
        <path d="M12 21s-7-4.9-9-8.1C1.5 8.7 5 5 8.6 6.1 10 6.6 11 8 12 9c1-1 2-2.4 3.4-2.9C19 5 22.5 8.7 21 12.9 19 16.1 12 21 12 21z" />
      </svg>
    </button>
  );
};

export default FavoriteButton;
