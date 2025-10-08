// components/Profile/EditProfileModal.jsx
import React, { useState } from 'react';
import styles from './EditProfileModal.module.css';

const EditProfileModal = ({ 
  isOpen, 
  onClose, 
  userData, 
  onSave, 
  carregando 
}) => {
  const [formData, setFormData] = useState({
    nome: userData?.nome || '',
    sobreMim: userData?.sobreMim || '',
    telefone: userData?.telefone || '',
    genero: userData?.genero || '',
    dataNascimento: userData?.dataNascimento || '',
    endereco: userData?.endereco || '',
    cidade: userData?.cidade || '',
    cep: userData?.cep || '',
    senha: '',
    confirmarSenha: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

    // Validações de formato
    if (formData.telefone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone deve estar no formato (11) 99999-9999';
    }

    if (formData.cep && !/^\d{5}-\d{3}$/.test(formData.cep)) {
      newErrors.cep = 'CEP deve estar no formato 12345-678';
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
    if (validateForm()) {
      // Formatar dados antes de enviar
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

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  };

  const formatCEP = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{0,3})/, '$1-$2');
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
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Editar Perfil</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
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
                  onChange={(e) => handleChange('telefone', formatPhone(e.target.value))}
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
                    onChange={(e) => handleChange('cep', formatCEP(e.target.value))}
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
              onClick={onClose}
              className={styles.cancelButton}
              disabled={carregando}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={carregando}
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