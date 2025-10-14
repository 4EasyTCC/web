// components/Profile/EditProfileModal.jsx
import React, { useState, useEffect } from 'react';
import styles from './EditProfileModal.module.css';

const EditProfileModal = ({ 
  isOpen, 
  onClose, 
  userData, 
  onSave, 
  carregando 
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    sobreMim: '',
    telefone: '',
    genero: '',
    dataNascimento: '',
    endereco: '',
    cidade: '',
    cep: '',
    senha: '',
    confirmarSenha: ''
  });

  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false); // NOVO: Estado para controlar mudanças
  const [initialData, setInitialData] = useState({}); // NOVO: Dados iniciais para comparação

  // CORREÇÃO: Inicializar formData quando userData mudar
  useEffect(() => {
    if (userData && isOpen) {
      const dadosIniciais = {
        nome: userData?.nome || '',
        sobreMim: userData?.sobreMim || '',
        telefone: formatPhone(userData?.telefone || ''),
        genero: userData?.genero || '',
        dataNascimento: userData?.dataNascimento || '',
        endereco: userData?.endereco || '',
        cidade: userData?.cidade || '',
        cep: formatCEP(userData?.cep || ''),
        senha: '',
        confirmarSenha: ''
      };

      setFormData(dadosIniciais);
      setInitialData(dadosIniciais); // NOVO: Guardar dados iniciais para comparação
      setErrors({});
      setHasChanges(false); // NOVO: Resetar mudanças ao abrir modal
    }
  }, [userData, isOpen]);

  // NOVO: Função para verificar se houve mudanças
  const checkForChanges = (currentData) => {
    if (!initialData || Object.keys(initialData).length === 0) return false;

    // Comparar cada campo (ignorando senhas vazias)
    const camposParaComparar = [
      'nome', 'sobreMim', 'telefone', 'genero', 
      'dataNascimento', 'endereco', 'cidade', 'cep'
    ];

    const mudancasDetectadas = camposParaComparar.some(campo => {
      const valorOriginal = initialData[campo] || '';
      const valorAtual = currentData[campo] || '';
      
      // Normalizar valores para comparação (remover formatação de telefone/CEP)
      if (campo === 'telefone' || campo === 'cep') {
        const normalizadoOriginal = valorOriginal.replace(/\D/g, '');
        const normalizadoAtual = valorAtual.replace(/\D/g, '');
        return normalizadoOriginal !== normalizadoAtual;
      }
      
      return valorOriginal.toString() !== valorAtual.toString();
    });

    // Verificar se há senha nova (considera mudança se senha não estiver vazia)
    const senhaPreenchida = currentData.senha && currentData.senha.trim() !== '';
    
    return mudancasDetectadas || senhaPreenchida;
  };

  // CORREÇÃO: Funções de formatação movidas para fora do return
  const formatPhone = (value) => {
    if (!value || value === 'null' || value === 'undefined') return '';
    
    // Se já está formatado, mantém
    if (value.includes('(') && value.includes(')')) {
      return value;
    }
    
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numbers.length === 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (numbers.length > 0) {
      return value;
    }
    
    return '';
  };

  const formatCEP = (value) => {
    if (!value || value === 'null' || value === 'undefined') return '';
    
    // Se já está formatado, mantém
    if (value.includes('-')) {
      return value;
    }
    
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 8) {
      return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    } else if (numbers.length > 0) {
      return value;
    }
    
    return '';
  };

  // CORREÇÃO: Funções de formatação em tempo real
  const handlePhoneChange = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{0,4})(\d{0,4})/, '($1) $2-$3');
      } else {
        return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }
    }
    return value;
  };

  const handleCEPChange = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      let formatted = numbers.replace(/(\d{0,5})(\d{0,3})/, '$1-$2');
      // Remove hífen do início se existir
      if (formatted.startsWith('-')) {
        formatted = formatted.substring(1);
      }
      return formatted;
    }
    return value;
  };

  const handleChange = (field, value) => {
    let valorFormatado = value;
    
    // CORREÇÃO: Aplicar formatação em tempo real
    if (field === 'telefone') {
      valorFormatado = handlePhoneChange(value);
    } else if (field === 'cep') {
      valorFormatado = handleCEPChange(value);
    }
    
    const novosDados = { ...formData, [field]: valorFormatado };
    setFormData(novosDados);
    
    // NOVO: Verificar mudanças após atualização
    setHasChanges(checkForChanges(novosDados));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validações obrigatórias
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    // CORREÇÃO: Validações de formato mais flexíveis
    if (formData.telefone && formData.telefone.trim() !== '') {
      const telefoneNumeros = formData.telefone.replace(/\D/g, '');
      if (telefoneNumeros.length !== 10 && telefoneNumeros.length !== 11) {
        newErrors.telefone = 'Telefone deve ter 10 ou 11 dígitos';
      }
    }

    if (formData.cep && formData.cep.trim() !== '') {
      const cepNumeros = formData.cep.replace(/\D/g, '');
      if (cepNumeros.length !== 8) {
        newErrors.cep = 'CEP deve ter 8 dígitos';
      }
    }

    if (formData.dataNascimento) {
      const birthDate = new Date(formData.dataNascimento);
      const today = new Date();
      
      // Resetar horas para comparar apenas datas
      today.setHours(0, 0, 0, 0);
      const birthDateCopy = new Date(birthDate);
      birthDateCopy.setHours(0, 0, 0, 0);
      
      if (birthDateCopy >= today) {
        newErrors.dataNascimento = 'Data de nascimento deve ser no passado';
      }
      
      // Validar idade mínima (13 anos)
      const minAgeDate = new Date();
      minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);
      minAgeDate.setHours(0, 0, 0, 0);
      
      if (birthDateCopy > minAgeDate) {
        newErrors.dataNascimento = 'Você deve ter pelo menos 13 anos';
      }
    }

    // Validações de senha
    if (formData.senha) {
      if (formData.senha.length < 6) {
        newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
      } else if (formData.senha !== formData.confirmarSenha) {
        newErrors.confirmarSenha = 'Senhas não coincidem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // NOVO: Não submeter se não houver mudanças
    if (!hasChanges) {
      return;
    }
    
    if (validateForm()) {
      // CORREÇÃO: Formatar dados antes de enviar (apenas números)
      const dataToSend = { 
        ...formData,
        telefone: formData.telefone?.replace(/\D/g, "") || null,
        cep: formData.cep?.replace(/\D/g, "") || null
      };
      
      // Remover senha se estiver vazia e confirmarSenha
      if (!dataToSend.senha) {
        delete dataToSend.senha;
      }
      delete dataToSend.confirmarSenha;
      
      onSave(dataToSend);
    }
  };

  // NOVO: Handler para cancelar - resetar para dados iniciais
  const handleCancel = () => {
    setFormData(initialData);
    setHasChanges(false);
    setErrors({});
    onClose();
  };

  const opcoesGenero = [
    { value: '', label: 'Selecione...' },
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Feminino', label: 'Feminino' },
    { value: 'Não-binário', label: 'Não-binário' },
    { value: 'Outro', label: 'Outro' },
    { value: 'Prefiro não informar', label: 'Prefiro não informar' }
  ];

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Editar Perfil</h2>
          <button className={styles.closeButton} onClick={handleCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            {/* Informações Básicas */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Informações Básicas</h3>
              
              <div className={styles.formGroup}>
                <label>Nome Completo *</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  className={errors.nome ? styles.inputError : ''}
                  placeholder="Seu nome completo"
                />
                {errors.nome && <span className={styles.errorText}>{errors.nome}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Bio</label>
                <textarea
                  value={formData.sobreMim}
                  onChange={(e) => handleChange('sobreMim', e.target.value)}
                  rows="3"
                  placeholder="Conte um pouco sobre você..."
                  maxLength="500"
                />
                <div className={styles.charCount}>
                  {formData.sobreMim.length}/500 caracteres
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Gênero</label>
                  <select
                    value={formData.genero}
                    onChange={(e) => handleChange('genero', e.target.value)}
                  >
                    {opcoesGenero.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Data de Nascimento</label>
                  <input
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => handleChange('dataNascimento', e.target.value)}
                    className={errors.dataNascimento ? styles.inputError : ''}
                  />
                  {errors.dataNascimento && <span className={styles.errorText}>{errors.dataNascimento}</span>}
                </div>
              </div>
            </div>

            {/* Contato */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Contato</h3>
              
              <div className={styles.formGroup}>
                <label>Telefone</label>
                <input
                  type="text"
                  value={formData.telefone}
                  onChange={(e) => handleChange('telefone', e.target.value)}
                  className={errors.telefone ? styles.inputError : ''}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
                {errors.telefone && <span className={styles.errorText}>{errors.telefone}</span>}
              </div>
            </div>

            {/* Endereço */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Endereço</h3>
              
              <div className={styles.formGroup}>
                <label>Endereço</label>
                <input
                  type="text"
                  value={formData.endereco}
                  onChange={(e) => handleChange('endereco', e.target.value)}
                  placeholder="Rua, número, bairro"
                  maxLength="200"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Cidade</label>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => handleChange('cidade', e.target.value)}
                    placeholder="Sua cidade"
                    maxLength="100"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>CEP</label>
                  <input
                    type="text"
                    value={formData.cep}
                    onChange={(e) => handleChange('cep', e.target.value)}
                    className={errors.cep ? styles.inputError : ''}
                    placeholder="12345-678"
                    maxLength={9}
                  />
                  {errors.cep && <span className={styles.errorText}>{errors.cep}</span>}
                </div>
              </div>
            </div>

            {/* Segurança */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Segurança</h3>
              
              <div className={styles.formGroup}>
                <label>Nova Senha</label>
                <input
                  type="password"
                  value={formData.senha}
                  onChange={(e) => handleChange('senha', e.target.value)}
                  className={errors.senha ? styles.inputError : ''}
                  placeholder="Deixe em branco para manter a atual"
                />
                {errors.senha && <span className={styles.errorText}>{errors.senha}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={(e) => handleChange('confirmarSenha', e.target.value)}
                  className={errors.confirmarSenha ? styles.inputError : ''}
                  placeholder="Confirme sua nova senha"
                />
                {errors.confirmarSenha && <span className={styles.errorText}>{errors.confirmarSenha}</span>}
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button 
              type="button" 
              onClick={handleCancel}
              className={styles.cancelButton}
              disabled={carregando}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={`${styles.saveButton} ${!hasChanges ? styles.saveButtonDisabled : ''}`}
              disabled={carregando || !hasChanges} // NOVO: Desabilitar se não houver mudanças
            >
              {carregando ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;