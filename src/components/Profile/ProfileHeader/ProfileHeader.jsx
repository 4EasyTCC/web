// components/Profile/ProfileHeader.jsx
import React from 'react';
import styles from './ProfileHeader.module.css';

const ProfileHeader = ({ perfil, onUploadFoto, carregando }) => {
  const getAvatarUrl = () => {
    if (!perfil?.convidado?.avatarUrl) {
      return "/default-avatar.png";
    }
    
    let url = perfil.convidado.avatarUrl;
    if (!url.startsWith('http')) {
      url = `http://localhost:3000${url}`;
    }
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}t=${new Date().getTime()}`;
  };

  return (
    <div className={styles.header}>
      <div className={styles.avatarContainer}>
        <img
          src={getAvatarUrl()}
          alt="Foto de perfil"
          className={styles.avatar}
          onError={(e) => {
            e.target.src = "/default-avatar.png";
          }}
        />
        <input
          type="file"
          id="fotoPerfil"
          accept="image/*"
          onChange={onUploadFoto}
          style={{ display: 'none' }}
          disabled={carregando}
        />
        <label 
          htmlFor="fotoPerfil" 
          className={`${styles.uploadLabel} ${carregando ? styles.disabled : ''}`}
        >
          {carregando ? "📸 Enviando..." : "📷 Alterar Foto"}
        </label>
      </div>
      
      <div className={styles.userInfo}>
        <h1 className={styles.userName}>{perfil.convidado.nome}</h1>
        <p className={styles.userEmail}>{perfil.convidado.email}</p>
        <div className={styles.userStats}>
          <span className={styles.stat}>
            <strong>{perfil.estatisticas.eventos}</strong> Eventos
          </span>
          <span className={styles.stat}>
            <strong>{perfil.estatisticas.amigos}</strong> Amigos
          </span>
          <span className={styles.stat}>
            <strong>{perfil.estatisticas.avaliacoes}</strong> Avaliações
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;