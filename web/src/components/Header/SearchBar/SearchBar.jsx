import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  onSubmit, 
  isScrolled,
  fullWidth = false 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isScrolled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isScrolled]);

  const handleClear = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <form 
      onSubmit={onSubmit} 
      className={`${styles.searchContainer} ${fullWidth ? styles.fullWidth : ''}`}
    >
      <div className={`${styles.searchBar} ${isFocused ? styles.focused : ''}`}>
        <button 
          type="submit" 
          className={styles.searchButton}
          aria-label="Pesquisar"
        >
          <svg className={styles.searchIcon} viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            isScrolled 
              ? "Pesquisar eventos..." 
              : "Pesquisar eventos, categorias, produtores..."
          }
          className={styles.searchInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Campo de pesquisa"
        />
        {searchQuery && (
          <button
            type="button"
            className={styles.clearSearchButton}
            onClick={handleClear}
            aria-label="Limpar pesquisa"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;