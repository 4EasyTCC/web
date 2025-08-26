import React, { useState, useRef, useEffect } from 'react';
import styles from './FiltroEventos.module.css';

const FiltroEventos = ({ 
  filtros, 
  onFiltroChange, 
  onLimparFiltros,
  sugestoesLocalizacao = [],
  mostrarSugestoes = false,
  onSugestaoLocalizacaoClick
}) => {
  const categorias = [
    'Arte, Cultura e Lazer', 'Congressos e Palestras', 'Cursos e Workshops',
    'Esporte', 'Festas e Shows', 'Gastronomia', 'Games e Geek', 'Grátis',
    'Infantil', 'Moda e Beleza', 'Passeios e Tours', 'Religião e Espiritualidade',
    'Saúde e Bem-Estar', 'Teatros e Espetáculos'
  ];

  const localizacaoRef = useRef(null);

  const handleCategoriaChange = (categoria) => {
    const novasCategorias = filtros.categoria.includes(categoria)
      ? filtros.categoria.filter(c => c !== categoria)
      : [...filtros.categoria, categoria];
    
    onFiltroChange({ categoria: novasCategorias });
  };

  const handlePrecoChange = (preco) => {
    onFiltroChange({ preco });
  };

  const handleTipoChange = (tipo) => {
    onFiltroChange({ tipo });
  };

  const handleLocalizacaoChange = (e) => {
    onFiltroChange({ localizacao: e.target.value });
  };

  const handleLocalizacaoKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (localizacaoRef.current && !localizacaoRef.current.contains(event.target)) {
        onSugestaoLocalizacaoClick && onSugestaoLocalizacaoClick(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onSugestaoLocalizacaoClick]);

  return (
    <div className={styles.filtroContainer}>
      <h3>Filtrar Eventos</h3>
      
      {/* Filtro por Categoria */}
      <div className={styles.filtroGrupo}>
        <h4>Categoria</h4>
        <div className={styles.checkboxGroup}>
          {categorias.map(categoria => (
            <label key={categoria} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filtros.categoria.includes(categoria)}
                onChange={() => handleCategoriaChange(categoria)}
                aria-label={`Filtrar por ${categoria}`}
              />
              <span className={styles.checkboxCustom}></span>
              {categoria}
            </label>
          ))}
        </div>
      </div>

      {/* Filtro por Preço */}
      <div className={styles.filtroGrupo}>
        <h4>Preço</h4>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="preco"
              value="qualquer"
              checked={filtros.preco === 'qualquer'}
              onChange={() => handlePrecoChange('qualquer')}
            />
            <span className={styles.radioCustom}></span>
            Qualquer preço
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="preco"
              value="gratis"
              checked={filtros.preco === 'gratis'}
              onChange={() => handlePrecoChange('gratis')}
            />
            <span className={styles.radioCustom}></span>
            Grátis
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="preco"
              value="pago"
              checked={filtros.preco === 'pago'}
              onChange={() => handlePrecoChange('pago')}
            />
            <span className={styles.radioCustom}></span>
            Pago
          </label>
        </div>
      </div>

      {/* Filtro por Tipo de Evento */}
      <div className={styles.filtroGrupo}>
        <h4>Tipo de Evento</h4>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="tipo"
              value="qualquer"
              checked={filtros.tipo === 'qualquer'}
              onChange={() => handleTipoChange('qualquer')}
            />
            <span className={styles.radioCustom}></span>
            Qualquer tipo
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="tipo"
              value="presencial"
              checked={filtros.tipo === 'presencial'}
              onChange={() => handleTipoChange('presencial')}
            />
            <span className={styles.radioCustom}></span>
            Presencial
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="tipo"
              value="online"
              checked={filtros.tipo === 'online'}
              onChange={() => handleTipoChange('online')}
            />
            <span className={styles.radioCustom}></span>
            Online
          </label>
        </div>
      </div>

      {/* Filtro por Localização */}
      <div className={styles.filtroGrupo} ref={localizacaoRef}>
        <h4>Localização</h4>
        <div className={styles.locationInputContainer}>
          <input
            type="text"
            placeholder="Digite uma cidade"
            value={filtros.localizacao || ''}
            onChange={handleLocalizacaoChange}
            onKeyPress={handleLocalizacaoKeyPress}
            className={styles.locationInput}
            aria-label="Filtrar por localização"
          />
          {mostrarSugestoes && Array.isArray(sugestoesLocalizacao) && sugestoesLocalizacao.length > 0 && (
            <div className={styles.sugestoesLocalizacao}>
              {sugestoesLocalizacao.map((sugestao, index) => (
                <div
                  key={index}
                  className={styles.sugestaoItem}
                  onClick={() => onSugestaoLocalizacaoClick && onSugestaoLocalizacaoClick(sugestao)}
                >
                  {sugestao}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button 
        className={styles.limparBtn} 
        onClick={onLimparFiltros}
        aria-label="Limpar todos os filtros"
      >
        Limpar Filtros
      </button>
    </div>
  );
};

export default FiltroEventos;