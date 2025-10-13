import React, { useState } from 'react';
import SearchBar from './SearchBar';
import styles from './EventSearch.module.css';

const EventSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setShowResults(true);
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <div className={styles.eventSearchContainer}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchResults={handleSearchResults}
        fullWidth={true}
      />
      
      {showResults && (
        <div className={styles.searchResults}>
          <div className={styles.resultsHeader}>
            <h3>Resultados da busca: "{searchQuery}"</h3>
            <button 
              className={styles.closeButton}
              onClick={handleCloseResults}
            >
              ✕
            </button>
          </div>
          
          {searchResults.length > 0 ? (
            <div className={styles.resultsGrid}>
              {searchResults.map(evento => (
                <div key={evento.eventoId} className={styles.eventCard}>
                  <img 
                    src={evento.Midia?.[0]?.url || '/default-event.jpg'} 
                    alt={evento.nomeEvento}
                    className={styles.eventImage}
                  />
                  <div className={styles.eventInfo}>
                    <h4>{evento.nomeEvento}</h4>
                    <p>{evento.descEvento}</p>
                    <div className={styles.eventMeta}>
                      <span className={styles.date}>
                        {new Date(evento.dataInicio).toLocaleDateString()}
                      </span>
                      <span className={styles.location}>
                        {evento.localizacao?.cidade || 'Online'}
                      </span>
                    </div>
                    <div className={styles.eventCategory}>
                      {evento.categoria}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>Nenhum evento encontrado para "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventSearch;