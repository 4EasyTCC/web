// components/Profile/ProfileTabs.jsx
import React from 'react';
import styles from './ProfileTabs.module.css';

const ProfileTabs = ({ activeTab, onTabChange, stats }) => {
  const tabs = [
    { id: 'sobre', label: 'Sobre Mim', icon: '👤' },
    { id: 'estatisticas', label: 'Estatísticas', icon: '📊' },
    { id: 'preferencias', label: 'Preferências', icon: '⭐' },
    { id: 'atividade', label: 'Atividade', icon: '🕒' }
  ];

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;