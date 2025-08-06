import React, { useState } from 'react';
import styles from './LocationSelector.module.css';

const LocationSelector = ({ variant = 'default' }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const locations = [
    { value: '', label: 'Selecione o Local' },
    { value: 'sao-paulo', label: 'São Paulo' },
    { value: 'rio-de-janeiro', label: 'Rio de Janeiro' },
    { value: 'belo-horizonte', label: 'Belo Horizonte' },
    { value: 'brasilia', label: 'Brasília' },
    { value: 'curitiba', label: 'Curitiba' },
    { value: 'porto-alegre', label: 'Porto Alegre' },
  ];

  const handleChange = (e) => {
    setSelectedLocation(e.target.value);
    // Aqui você pode adicionar lógica para atualizar o contexto/estado global
    // com a localização selecionada
  };

  return (
    <div className={`${styles.locationSelector} ${styles[variant]}`}>
      <div className={styles.locationDropdown}>
        <svg className={styles.locationIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <select
          value={selectedLocation}
          onChange={handleChange}
          className={styles.locationSelect}
          aria-label="Selecionar localização"
        >
          {locations.map((location) => (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
        <svg className={styles.dropdownIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
    </div>
  );
};

export default LocationSelector;