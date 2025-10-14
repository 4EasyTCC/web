// components/Profile/AboutTab.jsx
import React, { useState, useEffect } from 'react';
import styles from './AboutTab.module.css';

const AboutTab = ({ perfil, onEdit, isEditing, onSave, onCancel }) => {
  const [convidado, setConvidado] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [dadosOriginais, setDadosOriginais] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  // FUNÇÃO PARA NORMALIZAR DADOS DA API
  const normalizarDadosDaAPI = (dados) => {
    if (!dados) return dados;
    
    return {
      ...dados,
      // Garante que telefone e CEP sempre cheguem formatados para o componente
      telefone: dados.telefone ? formatarTelefoneParaInput(dados.telefone) : '',
      cep: dados.cep ? formatarCEPParaInput(dados.cep) : '',
      nome: dados.nome || '',
      email: dados.email || '',
      genero: dados.genero || '',
      dataNascimento: dados.dataNascimento || '',
      endereco: dados.endereco || '',
      cidade: dados.cidade || '',
      sobreMim: dados.sobreMim || ''
    };
  };

  // CORREÇÃO: Funções de formatação para INPUT (mantém formato durante edição)
  const formatarTelefoneParaInput = (telefone) => {
    if (!telefone || telefone === 'null' || telefone === 'undefined') {
      return '';
    }
    
    // Se JÁ ESTÁ FORMATADO, mantém para o input
    if (telefone.includes('(') && telefone.includes(')')) {
      return telefone;
    }
    
    // Se veio SEM formatação (apenas números), formata
    const numeros = telefone.toString().replace(/\D/g, '');
    
    if (numeros.length === 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length > 0) {
      return telefone;
    }
    
    return '';
  };

  const formatarCEPParaInput = (cep) => {
    if (!cep || cep === 'null' || cep === 'undefined') {
      return '';
    }
    
    // Se JÁ ESTÁ FORMATADO, mantém para o input
    if (cep.includes('-')) {
      return cep;
    }
    
    // Se veio SEM formatação (apenas números), formata
    const numeros = cep.toString().replace(/\D/g, '');
    if (numeros.length === 8) {
      return numeros.replace(/(\d{5})(\d{3})/, '$1-$2');
    } else if (numeros.length > 0) {
      return cep;
    }
    
    return '';
  };

  // CORREÇÃO: Funções de formatação em tempo real para inputs
  const handleTelefoneChange = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    let telefoneFormatado = valor;
    
    if (numeros.length <= 11) {
      if (numeros.length <= 10) {
        telefoneFormatado = numeros.replace(/(\d{2})(\d{0,4})(\d{0,4})/, '($1) $2-$3');
      } else {
        telefoneFormatado = numeros.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }
    }
    
    return telefoneFormatado;
  };

  const handleCEPChange = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    let cepFormatado = valor;
    
    if (numeros.length <= 8) {
      cepFormatado = numeros.replace(/(\d{0,5})(\d{0,3})/, '$1-$2');
      // Remove o hífen se estiver no início
      if (cepFormatado.startsWith('-')) {
        cepFormatado = cepFormatado.substring(1);
      }
    }
    
    return cepFormatado;
  };

  // CORREÇÃO: Funções de formatação apenas para exibição
  const formatarTelefoneParaExibicao = (telefone) => {
    if (!telefone || telefone === 'null' || telefone === 'undefined') {
      return 'Não informado';
    }
    
    if (telefone.includes('(') && telefone.includes(')')) {
      return telefone;
    }
    
    const numeros = telefone.toString().replace(/\D/g, '');
    
    if (numeros.length === 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length > 0) {
      return telefone;
    }
    
    return 'Não informado';
  };

  const formatarCEPParaExibicao = (cep) => {
    if (!cep || cep === 'null' || cep === 'undefined') {
      return 'Não informado';
    }
    
    if (cep.includes('-')) {
      return cep;
    }
    
    const numeros = cep.toString().replace(/\D/g, '');
    if (numeros.length === 8) {
      return numeros.replace(/(\d{5})(\d{3})/, '$1-$2');
    } else if (numeros.length > 0) {
      return cep;
    }
    
    return 'Não informado';
  };

  // Inicializar dados - CORREÇÃO APLICADA
  useEffect(() => {
    try {
      const dadosIniciais = perfil?.convidado || perfil;
      const dadosNormalizados = normalizarDadosDaAPI(dadosIniciais);
      
      setConvidado(dadosNormalizados);
      setDadosOriginais(dadosNormalizados);
      
      if (dadosNormalizados) {
        setFormData(dadosNormalizados);
      }
      setError(null);
    } catch (err) {
      setError(new Error('Erro ao carregar dados do perfil'));
    }
  }, [perfil]);

  // Monitorar mudanças para habilitar/desabilitar botão salvar
  useEffect(() => {
    if (isEditing && dadosOriginais && formData) {
      const mudancasDetectadas = Object.keys(formData).some(key => {
        const valorOriginal = dadosOriginais[key] || '';
        const valorAtual = formData[key] || '';
        
        // Comparar valores normalizados (sem formatação)
        const normalizadoOriginal = valorOriginal.toString().replace(/\D/g, '');
        const normalizadoAtual = valorAtual.toString().replace(/\D/g, '');
        
        return normalizadoOriginal !== normalizadoAtual;
      });
      
      setHasChanges(mudancasDetectadas);
    }
  }, [formData, dadosOriginais, isEditing]);

  // Função para normalizar valores
  const normalizarValor = (valor) => {
    if (!valor) return '';
    return valor.toString().trim().replace(/\D/g, '');
  };

  // CORREÇÃO: Handler para mudanças nos inputs
  const handleInputChange = (campo, valor) => {
    let valorFormatado = valor;
    
    // Aplicar formatação em tempo real para telefone e CEP
    if (campo === 'telefone') {
      valorFormatado = handleTelefoneChange(valor);
    } else if (campo === 'cep') {
      valorFormatado = handleCEPChange(valor);
    }
    
    setFormData(prev => ({
      ...prev,
      [campo]: valorFormatado
    }));
  };

  // CORREÇÃO: Handler para salvar
  const handleSave = () => {
    if (hasChanges) {
      try {
        // Limpar formatação antes de salvar (apenas números)
        const dadosParaSalvar = {
          ...formData,
          telefone: formData.telefone?.replace(/\D/g, '') || '',
          cep: formData.cep?.replace(/\D/g, '') || ''
        };
        onSave(dadosParaSalvar);
      } catch (err) {
        setError(new Error('Erro ao salvar alterações'));
      }
    }
  };

  // Função auxiliar para verificar se um valor é válido
  const valorValido = (valor) => {
    return valor && 
           valor !== 'null' && 
           valor !== 'undefined' && 
           valor.toString().trim() !== '';
  };

  const formatarData = (data) => {
    if (!data) return 'Não informada';
    try {
      const dataObj = new Date(data);
      return !isNaN(dataObj.getTime()) 
        ? dataObj.toLocaleDateString('pt-BR') 
        : 'Não informada';
    } catch (error) {
      return 'Não informada';
    }
  };

  // Renderização condicional
  const renderizarValor = (valor, formatarFn = null) => {
    if (valorValido(valor)) {
      return formatarFn ? formatarFn(valor) : valor;
    }
    return 'Não informado';
  };

  // Tratamento de erro
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>Erro ao carregar perfil</h3>
        <p>{error.message}</p>
        <button 
          onClick={() => setError(null)}
          className={styles.retryButton}
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (!convidado) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando dados do perfil...</p>
      </div>
    );
  }

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutHeader}>
        <h2>Sobre Mim</h2>
        {!isEditing ? (
          <button 
            onClick={onEdit}
            className={styles.editButton}
            aria-label="Editar informações do perfil"
          >
            <span className={styles.editIcon}>✏️</span>
            Editar Perfil
          </button>
        ) : (
          <div className={styles.editActions}>
            <button 
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
              aria-label="Cancelar edição"
            >
              <span className={styles.cancelIcon}>❌</span>
              Cancelar
            </button>
            <button 
              type="button"
              onClick={handleSave}
              className={`${styles.saveButton} ${!hasChanges ? styles.saveButtonDisabled : ''}`}
              aria-label="Salvar alterações"
              disabled={!hasChanges}
            >
              <span className={styles.saveIcon}>💾</span>
              Salvar Alterações
            </button>
          </div>
        )}
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h3>
            <span className={styles.infoIcon} aria-hidden="true">👤</span>
            Informações Pessoais
          </h3>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Nome:</span>
              <span className={styles.infoValue}>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.nome || ''}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className={styles.editInput}
                    placeholder="Seu nome completo"
                  />
                ) : (
                  renderizarValor(convidado.nome)
                )}
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
                {isEditing ? (
                  <select
                    value={formData.genero || ''}
                    onChange={(e) => handleInputChange('genero', e.target.value)}
                    className={styles.editInput}
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                    <option value="Prefiro não informar">Prefiro não informar</option>
                  </select>
                ) : (
                  renderizarValor(convidado.genero)
                )}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Data de Nascimento:</span>
              <span className={styles.infoValue}>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.dataNascimento || ''}
                    onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                    className={styles.editInput}
                  />
                ) : (
                  renderizarValor(convidado.dataNascimento, formatarData)
                )}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Telefone:</span>
              <span className={styles.infoValue}>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.telefone || ''}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                    className={styles.editInput}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                  />
                ) : (
                  renderizarValor(convidado.telefone, formatarTelefoneParaExibicao)
                )}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3>
            <span className={styles.infoIcon} aria-hidden="true">📍</span>
            Endereço
          </h3>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Endereço:</span>
              <span className={styles.infoValue}>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.endereco || ''}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                    className={styles.editInput}
                    placeholder="Rua, número, bairro"
                  />
                ) : (
                  renderizarValor(convidado.endereco)
                )}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Cidade:</span>
              <span className={styles.infoValue}>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.cidade || ''}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                    className={styles.editInput}
                    placeholder="Sua cidade"
                  />
                ) : (
                  renderizarValor(convidado.cidade)
                )}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>CEP:</span>
              <span className={styles.infoValue}>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.cep || ''}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    className={styles.editInput}
                    placeholder="12345-678"
                    maxLength={9}
                  />
                ) : (
                  renderizarValor(convidado.cep, formatarCEPParaExibicao)
                )}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3>
            <span className={styles.infoIcon} aria-hidden="true">💭</span>
            Bio
          </h3>
          <div className={styles.bioContent}>
            {isEditing ? (
              <textarea
                value={formData.sobreMim || ''}
                onChange={(e) => handleInputChange('sobreMim', e.target.value)}
                className={styles.editTextarea}
                placeholder="Conte um pouco sobre você..."
                rows={4}
              />
            ) : valorValido(convidado.sobreMim) ? (
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