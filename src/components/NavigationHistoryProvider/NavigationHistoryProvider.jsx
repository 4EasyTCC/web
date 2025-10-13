import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationHistoryContext = createContext();

export const useNavigationHistory = () => {
  const context = useContext(NavigationHistoryContext);
  if (!context) {
    throw new Error('useNavigationHistory must be used within a NavigationHistoryProvider');
  }
  return context;
};

export const NavigationHistoryProvider = ({ children }) => {
  const location = useLocation();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(prev => {
      // Evitar duplicatas consecutivas
      if (prev.length === 0 || prev[prev.length - 1].pathname !== location.pathname) {
        return [...prev, {
          pathname: location.pathname,
          search: location.search,
          hash: location.hash,
          timestamp: Date.now()
        }];
      }
      return prev;
    });
  }, [location]);

  const getPreviousValidPage = () => {
    if (history.length < 2) return null;
    
    // Pegar a página anterior à atual, ignorando a página atual
    const currentPage = history[history.length - 1];
    let previousPage = null;
    
    // Procurar de trás para frente por uma página diferente da atual
    for (let i = history.length - 2; i >= 0; i--) {
      if (history[i].pathname !== currentPage.pathname) {
        previousPage = history[i];
        break;
      }
    }
    
    return previousPage;
  };

  const getCurrentValidPage = () => {
    return history.length > 0 ? history[history.length - 1] : null;
  };

  const value = {
    history,
    getPreviousValidPage,
    getCurrentValidPage
  };

  return (
    <NavigationHistoryContext.Provider value={value}>
      {children}
    </NavigationHistoryContext.Provider>
  );
};