import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Verifica se há um estado de scroll position guardado
    const savedPosition = sessionStorage.getItem('scrollPosition');
    
    if (savedPosition && pathname === sessionStorage.getItem('lastPath')) {
      // Restaura a posição se for a mesma rota (caso do menu mobile)
      window.scrollTo(0, parseInt(savedPosition));
    } else {
      // Rolagem para o topo apenas em mudanças de rota normais
      window.scrollTo(0, 0);
    }

    // Limpa os valores armazenados após uso
    sessionStorage.removeItem('scrollPosition');
    sessionStorage.removeItem('lastPath');
  }, [pathname]);

  return null;
}