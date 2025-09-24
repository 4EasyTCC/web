import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Breadcrumb.module.css';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ additionalPaths = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Mapeamento de rotas para nomes amigáveis
  const routeNames = {
    '': 'Home',
    'home': 'Home',
    'paginaLogin': 'Login',
    'aboutUs': 'Sobre Nós',
    'pageCadastro': 'Cadastro',
    'InfoPage': 'Como Funciona',
    'Contact': 'Contato',
    'Feedback': 'Feedback',
    'MoreQuestions': 'Perguntas Frequentes',
    'profile': 'Perfil',
    'PageSponsor': 'Seja um Patrocinador',
    'PageColecoes': 'Coleções',
    'Eventos': 'Eventos',
    'SearchEvents': 'Buscar Eventos'
  };

  // Dados dinâmicos para coleções
  const dynamicData = {
    'PageColecoes': {
      '1': 'Arte, Cultura e Lazer',
      '2': 'Congressos e Palestras',
      '3': 'Cursos e Workshops',
      '4': 'Esporte',
      '5': 'Festas e Shows',
      '6': 'Gastronomia',
      '7': 'Games e Geek',
      '8': 'Grátis',
      '9': 'Infantil',
      '10': 'Moda e Beleza',
      '11': 'Passeios e Tours',
      '12': 'Religião e Espiritualidade',
      '13': 'Saúde e Bem-Estar',
      '14': 'Teatros e Espetáculos'
    }
  };

  // Construir breadcrumb paths
  const breadcrumbPaths = [];
  
  // Sempre começar com Home
  breadcrumbPaths.push({
    to: '/',
    displayName: 'Home',
    isLast: pathnames.length === 0
  });

  // Processar cada parte do path
  pathnames.forEach((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    
    let displayName = routeNames[value] || value;
    
    // Se for um parâmetro numérico, tentar encontrar nome dinâmico
    if (!isNaN(value) && index > 0) {
      const parentRoute = pathnames[index - 1];
      if (dynamicData[parentRoute] && dynamicData[parentRoute][value]) {
        displayName = dynamicData[parentRoute][value];
      }
    }
    
    // Capitalizar a primeira letra
    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    
    breadcrumbPaths.push({
      to,
      displayName,
      isLast
    });
  });

  // Combinar com paths adicionais se fornecidos
  const allPaths = [...breadcrumbPaths, ...additionalPaths];

  // Se estamos na página inicial, não mostrar breadcrumb
  if (location.pathname === '/' || location.pathname === '/home') {
    return null;
  }

  return (
    <nav className={styles.breadcrumbContainer}>
      <div className={styles.breadcrumbContent}>
        {allPaths.map((path, index) => {
          const isLast = index === allPaths.length - 1;
          
          return (
            <React.Fragment key={path.to || index}>
              {index > 0 && (
                <div className={styles.breadcrumbSeparator}>
                  <ChevronRight size={14} />
                </div>
              )}
              
              {isLast ? (
                <span className={styles.breadcrumbItemActive}>
                  {path.displayName}
                </span>
              ) : (
                <Link to={path.to} className={styles.breadcrumbItem}>
                  {index === 0 ? <Home size={16} /> : null}
                  <span>{path.displayName}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;