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
    'colecao': 'Coleção',
    'Eventos': 'Eventos',
    'evento': 'Evento',
    'SearchEvents': 'Buscar Eventos'
  };

  // Dados dinâmicos (poderia vir de uma API)
  const dynamicData = {
    'colecao': {
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
    },
    'evento': {
      // Exemplo de eventos (em um caso real, viria da API)
      '123': 'Show Nacional',
      '456': 'Feira de Tecnologia'
    }
  };

  // Combinar paths adicionais com os paths da URL
  const allPaths = [...additionalPaths];
  
  pathnames.forEach((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isParam = !isNaN(value) || value.length > 10; // IDs ou valores longos são parâmetros
    
    let displayName = routeNames[value] || value;
    
    // Se for um parâmetro e tivermos dados dinâmicos, use-os
    if (isParam && index > 0) {
      const parentRoute = pathnames[index - 1];
      if (dynamicData[parentRoute] && dynamicData[parentRoute][value]) {
        displayName = dynamicData[parentRoute][value];
      } else {
        // Se não encontrar dados dinâmicos, formate o texto
        displayName = displayName
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    }
    
    // Capitalizar a primeira letra
    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    
    allPaths.push({
      to,
      displayName,
      isLast: index === pathnames.length - 1
    });
  });

  // Se estamos na página inicial, não mostrar breadcrumb
  if (location.pathname === '/' || location.pathname === '/home') {
    return null;
  }

  return (
    <nav className={styles.breadcrumbContainer}>
      <div className={styles.breadcrumbContent}>
        <Link to="/" className={styles.breadcrumbHome}>
          <Home size={16} />
          <span>Home</span>
        </Link>
        
        {allPaths.map((path, index) => {
          const isLast = index === allPaths.length - 1;
          
          return (
            <React.Fragment key={path.to || index}>
              <div className={styles.breadcrumbSeparator}>
                <ChevronRight size={14} />
              </div>
              
              {isLast ? (
                <span className={styles.breadcrumbItemActive}>
                  {path.displayName}
                </span>
              ) : (
                <Link to={path.to} className={styles.breadcrumbItem}>
                  {path.displayName}
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