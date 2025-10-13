import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  onSubmit, 
  isScrolled,
  fullWidth = false,
  onSearchResults = null
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Busca em tempo real
  useEffect(() => {
    const searchEvents = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setIsSearching(true);
      try {
        console.log('Buscando eventos por:', searchQuery);
        const response = await fetch(
          `http://localhost:3000/api/eventos/busca-nome?query=${encodeURIComponent(searchQuery)}&limite=5`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Resultados da busca:', data);
        
        if (data.success) {
          setSearchResults(data.eventos || []);
          setShowDropdown(true);
        }
      } catch (error) {
        console.error('Erro na busca:', error);
        setSearchResults([]);
        setShowDropdown(false);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchEvents, 400);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowDropdown(false);
    inputRef.current?.focus();
    
    if (onSearchResults) {
      onSearchResults([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/eventos/busca-nome?query=${encodeURIComponent(searchQuery)}&limite=50`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        // Se existe callback para resultados, chama
        if (onSearchResults && data.success) {
          onSearchResults(data.eventos || []);
        }
        
        // Executa submit original se existir
        if (onSubmit) {
          onSubmit(e);
        }
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      if (onSearchResults) {
        onSearchResults([]);
      }
    } finally {
      setIsSearching(false);
      setShowDropdown(false);
    }
  };

  const handleEventClick = (evento) => {
    // Navegar para a página do evento
    window.location.href = `/evento/${evento.eventoId}`;
  };

  const formatarData = (dataString) => {
    if (!dataString) return "Data não definida";
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR');
    } catch (error) {
      return "Data inválida";
    }
  };

  const formatarHora = (horaString) => {
    if (!horaString) return "";
    try {
      return horaString.substring(0, 5) + 'h';
    } catch (error) {
      return "";
    }
  };

  const getPrecoMinimo = (ingressos) => {
    if (!ingressos || ingressos.length === 0) return null;
    const precos = ingressos
      .map(ingresso => parseFloat(ingresso.preco))
      .filter(preco => !isNaN(preco) && preco > 0);
    return precos.length > 0 ? Math.min(...precos) : null;
  };

  return (
    <div className={styles.searchWrapper} ref={dropdownRef}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={`${styles.searchBar} ${isFocused ? styles.focused : ''}`}>
          <button 
            type="submit" 
            className={styles.searchButton}
            disabled={isSearching}
          >
            {isSearching ? (
              <div className={styles.spinner}></div>
            ) : (
              <svg className={styles.searchIcon} viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            )}
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar eventos..."
            className={styles.searchInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          {searchQuery && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Dropdown de resultados */}
      {showDropdown && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span>
              {searchResults.length > 0 
                ? `${searchResults.length} evento(s) encontrado(s)`
                : 'Nenhum evento encontrado'
              }
            </span>
          </div>
          
          {searchResults.length > 0 ? (
            <>
              <div className={styles.resultsList}>
                {searchResults.map((evento) => {
                  const precoMinimo = getPrecoMinimo(evento.Ingressos);
                  const temIngressoGratis = evento.Ingressos?.some(ing => parseFloat(ing.preco) === 0);
                  const imagemUrl = evento.Midia?.[0]?.url 
                    ? `http://localhost:3000${evento.Midia[0].url}`
                    : '/placeholder-event.jpg';

                  return (
                    <div 
                      key={evento.eventoId} 
                      className={styles.resultItem}
                      onClick={() => handleEventClick(evento)}
                    >
                      <div className={styles.eventImage}>
                        <img 
                          src={imagemUrl} 
                          alt={evento.nomeEvento}
                          onError={(e) => {
                            e.target.src = '/placeholder-event.jpg';
                          }}
                        />
                        {temIngressoGratis && (
                          <div className={styles.gratisBadge}>Grátis</div>
                        )}
                      </div>
                      
                      <div className={styles.eventInfo}>
                        <h4 className={styles.eventTitle}>{evento.nomeEvento}</h4>
                        <p className={styles.eventLocation}>
                          {evento.localizacao?.cidade || 'Local a definir'}
                          {evento.localizacao?.estado && `, ${evento.localizacao.estado}`}
                        </p>
                        <p className={styles.eventDate}>
                          {formatarData(evento.dataInicio)}
                          {evento.horaInicio && ` • ${formatarHora(evento.horaInicio)}`}
                        </p>
                        {precoMinimo !== null && !temIngressoGratis && (
                          <p className={styles.eventPrice}>
                            A partir de R$ {precoMinimo.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className={styles.dropdownFooter}>
                <button 
                  className={styles.seeAllButton}
                  onClick={handleSubmit}
                >
                  Ver todos os resultados
                </button>
              </div>
            </>
          ) : (
            <div className={styles.noResults}>
              <p>Nenhum evento encontrado para "{searchQuery}"</p>
              <p className={styles.suggestion}>
                Tente outros termos de busca
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;