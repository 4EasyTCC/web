// components/Profile/AboutTab.jsx
import React from 'react';
import styles from './AboutTab.module.css';

const AboutTab = ({ perfil, onEdit }) => {
  console.log('Dados completos do perfil recebidos:', perfil);
  
  // DEBUG: Log detalhado para verificar a estrutura
  console.log('Estrutura do perfil:', {
    hasPerfil: !!perfil,
    hasConvidado: !!(perfil?.convidado),
    perfilKeys: perfil ? Object.keys(perfil) : [],
    convidadoKeys: perfil?.convidado ? Object.keys(perfil.convidado) : []
  });

  // CORREÇÃO: Múltiplas formas de acessar os dados do convidado
  let convidado = perfil?.convidado || perfil;
  
  // Se perfil for null/undefined ou convidado for null/undefined
  if (!convidado) {
    console.warn('Dados do convidado não encontrados:', { perfil, convidado });
    return <div>Carregando dados do perfil...</div>;
  }

  // DEBUG: Log dos valores específicos que estão com problemas
  console.log('Valores específicos do convidado:', {
    genero: convidado.genero,
    dataNascimento: convidado.dataNascimento,
    telefone: convidado.telefone,
    endereco: convidado.endereco,
    cidade: convidado.cidade,
    cep: convidado.cep,
    sobreMim: convidado.sobreMim
  });

  // CORREÇÃO: Funções de formatação mais robustas
  const formatarData = (data) => {
    if (!data) return 'Não informada';
    try {
      // Tenta converter para Date e verifica se é válida
      const dataObj = new Date(data);
      return !isNaN(dataObj.getTime()) 
        ? dataObj.toLocaleDateString('pt-BR') 
        : 'Não informada';
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Não informada';
    }
  };

  const formatarTelefone = (telefone) => {
    if (!telefone || telefone === 'null' || telefone === 'undefined') {
      return 'Não informado';
    }
    
    const numeros = telefone.toString().replace(/\D/g, '');
    
    if (numeros.length === 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length > 0) {
      return telefone; // Retorna o original se não conseguir formatar
    }
    
    return 'Não informado';
  };

  const formatarCEP = (cep) => {
    if (!cep || cep === 'null' || cep === 'undefined') {
      return 'Não informado';
    }
    
    const numeros = cep.toString().replace(/\D/g, '');
    if (numeros.length === 8) {
      return numeros.replace(/(\d{5})(\d{3})/, '$1-$2');
    } else if (numeros.length > 0) {
      return cep; // Retorna o original se não conseguir formatar
    }
    
    return 'Não informado';
  };

  // CORREÇÃO: Função auxiliar para verificar se um valor é válido
  const valorValido = (valor) => {
    return valor && 
           valor !== 'null' && 
           valor !== 'undefined' && 
           valor.toString().trim() !== '';
  };

  // CORREÇÃO: Renderização condicional melhorada
  const renderizarValor = (valor, formatarFn = null) => {
    if (valorValido(valor)) {
      return formatarFn ? formatarFn(valor) : valor;
    }
    return 'Não informado';
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
              <span className={styles.infoValue}>
                {renderizarValor(convidado.nome)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>
                {renderizarValor(convidado.email)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Gênero:</span>
              <span className={styles.infoValue}>
                {renderizarValor(convidado.genero)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Data de Nascimento:</span>
              <span className={styles.infoValue}>
                {renderizarValor(convidado.dataNascimento, formatarData)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Telefone:</span>
              <span className={styles.infoValue}>
                {renderizarValor(convidado.telefone, formatarTelefone)}
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
                {renderizarValor(convidado.endereco)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Cidade:</span>
              <span className={styles.infoValue}>
                {renderizarValor(convidado.cidade)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>CEP:</span>
              <span className={styles.infoValue}>
                {renderizarValor(convidado.cep, formatarCEP)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3>💭 Bio</h3>
          <div className={styles.bioContent}>
            {valorValido(convidado.sobreMim) ? (
              <p>{convidado.sobreMim}</p>
            ) : (
              <p className={styles.noBio}>Nenhuma bio adicionada ainda.</p>
            )}
          </div>
        </div>
      </div>

      {/* DEBUG: Seção de diagnóstico (remover em produção) */}
      <details className={styles.debugSection}>
        <summary>🔧 Debug Info (Desenvolvedor)</summary>
        <pre>{JSON.stringify(convidado, null, 2)}</pre>
      </details>
    </div>
  );
};

export default AboutTab;