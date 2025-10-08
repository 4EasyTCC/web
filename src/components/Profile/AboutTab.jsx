// components/Profile/AboutTab.jsx
import React from 'react';
import styles from './AboutTab.module.css';

const AboutTab = ({ perfil, onEdit }) => {

  console.log('Dados do perfil recebidos:', perfil);
  const convidado = perfil?.convidado || perfil;
  if (!convidado) {
    return <div>Carregando dados do perfil...</div>;
  }

  const formatarData = (data) => {
    if (!data) return 'Não informada';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return 'Não informado';
    const numeros = telefone.replace(/\D/g, '');
    if (numeros.length === 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
  };

  const formatarCEP = (cep) => {
    if (!cep) return 'Não informado';
    const numeros = cep.replace(/\D/g, '');
    if (numeros.length === 8) {
      return numeros.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return cep;
  };

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutHeader}>
        <h2>Sobre Mim</h2>
        <button onClick={onEdit} className={styles.editButton}>
          ✏️ Editar Perfil
        </button>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h3>👤 Informações Pessoais</h3>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Nome:</span>
              <span className={styles.infoValue}>{convidado.nome}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>{convidado.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Gênero:</span>
              <span className={styles.infoValue}>
                {convidado.genero || 'Não informado'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Data de Nascimento:</span>
              <span className={styles.infoValue}>
                {formatarData(convidado.dataNascimento)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Telefone:</span>
              <span className={styles.infoValue}>
                {formatarTelefone(convidado.telefone)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3>📍 Endereço</h3>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Endereço:</span>
              <span className={styles.infoValue}>
                {convidado.endereco || 'Não informado'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Cidade:</span>
              <span className={styles.infoValue}>
                {convidado.cidade || 'Não informada'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>CEP:</span>
              <span className={styles.infoValue}>
                {formatarCEP(convidado.cep)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3>💭 Bio</h3>
          <div className={styles.bioContent}>
            {convidado.sobreMim ? (
              <p>{convidado.sobreMim}</p>
            ) : (
              <p className={styles.noBio}>Nenhuma bio adicionada ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;