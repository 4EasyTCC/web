// Breadcrumb.jsx (atualizado)
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useNavigationHistory } from '@/components/NavigationHistoryProvider/NavigationHistoryProvider';
import styles from './Breadcrumb.module.css';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ additionalPaths = [] }) => {
  const location = useLocation();
  const { getPreviousValidPage, getCurrentValidPage } = useNavigationHistory();
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
    'SearchEvents': 'Buscar Eventos',
    'Terms': 'Termos de Uso'
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

  // Verifica se estamos em uma página de evento individual
  const isEventPage = location.pathname.startsWith('/Eventos/') && pathnames.length === 2;
  // Verifica se estamos em uma página de organizador individual
  const isOrganizerPage = location.pathname.startsWith('/Organizador/') && pathnames.length === 2;
  
  // Verifica se estamos em uma subpágina de coleções
  const isColecaoSubPage = location.pathname.startsWith('/PageColecoes/') && pathnames.length >= 2;

  // Construir breadcrumb paths
  const breadcrumbPaths = [];

  // SEMPRE começar com Home (exceto na própria home)
  if (location.pathname !== '/' && location.pathname !== '/home') {
    breadcrumbPaths.push({
      to: '/',
      displayName: 'Home',
      isLast: false
    });
  }

  // Para páginas de evento individual - reconstruir o caminho real
  if (isEventPage) {
    const eventId = pathnames[1];
    const previousPage = getPreviousValidPage ? getPreviousValidPage() : null;
    
    // Se temos histórico anterior válido, usá-lo para reconstruir o caminho
    if (previousPage && previousPage.pathname) {
      const previousPath = previousPage.pathname;
      const previousPathnames = previousPath.split('/').filter((x) => x);
      
      // Se veio da página de busca
      if (previousPath === '/SearchEvents' || previousPath.startsWith('/SearchEvents?')) {
        breadcrumbPaths.push({
          to: previousPath,
          displayName: 'Buscar Eventos',
          isLast: false
        });
      }
      // Se veio do perfil (ex.: clicou no evento a partir de Preferências), garantir que ao voltar abra Preferências
      else if (previousPathnames[0] === 'profile') {
        breadcrumbPaths.push({
          to: { pathname: '/profile', state: { tab: 'preferencias' } },
          displayName: 'Perfil',
          isLast: false
        });
      }
      // Se veio de uma coleção específica
      else if (previousPath.startsWith('/PageColecoes/')) {
        const colecaoId = previousPathnames[1];
        const subId = previousPathnames[2];
        
        // Coleção principal
        breadcrumbPaths.push({
          to: '/PageColecoes',
          displayName: 'Coleções',
          isLast: false
        });
        
        // Categoria da coleção
        if (colecaoId && dynamicData.PageColecoes[colecaoId]) {
          breadcrumbPaths.push({
            to: `/PageColecoes/${colecaoId}`,
            displayName: dynamicData.PageColecoes[colecaoId],
            isLast: false
          });
        }
        
        // Subcategoria (se existir)
        if (subId) {
          breadcrumbPaths.push({
            to: `/PageColecoes/${colecaoId}/${subId}`,
            displayName: 'Eventos',
            isLast: false
          });
        }
      }
    
      else if (previousPath === '/Eventos') {
        breadcrumbPaths.push({
          to: '/Eventos',
          displayName: 'Eventos',
          isLast: false
        });
      }
      
      else if (previousPath === '/' || previousPath === '/home') {
        
      }
      // Se veio de outra página não mapeada
      else if (previousPathnames[0] && routeNames[previousPathnames[0]]) {
        breadcrumbPaths.push({
          to: previousPath,
          displayName: routeNames[previousPathnames[0]],
          isLast: false
        });
      }
    }
    
    
    breadcrumbPaths.push({
      to: location.pathname,
      displayName: 'Detalhes do Evento',
      isLast: true
    });
  }
  // Para páginas de organizador individual - comportamento similar ao evento
  else if (isOrganizerPage) {
    const organizerId = pathnames[1];
    const previousPage = getPreviousValidPage ? getPreviousValidPage() : null;

    if (previousPage && previousPage.pathname) {
      const previousPath = previousPage.pathname;
      const previousPathnames = previousPath.split('/').filter((x) => x);

      if (previousPath === '/SearchEvents' || previousPath.startsWith('/SearchEvents?')) {
        breadcrumbPaths.push({
          to: previousPath,
          displayName: 'Buscar Eventos',
          isLast: false
        });
      } else if (previousPathnames[0] === 'profile') {
        breadcrumbPaths.push({
          to: { pathname: '/profile', state: { tab: 'preferencias' } },
          displayName: 'Perfil',
          isLast: false
        });
      } else if (previousPath.startsWith('/PageColecoes/')) {
        const colecaoId = previousPathnames[1];
        const subId = previousPathnames[2];

        breadcrumbPaths.push({
          to: '/PageColecoes',
          displayName: 'Coleções',
          isLast: false
        });

        if (colecaoId && dynamicData.PageColecoes[colecaoId]) {
          breadcrumbPaths.push({
            to: `/PageColecoes/${colecaoId}`,
            displayName: dynamicData.PageColecoes[colecaoId],
            isLast: false
          });
        }

        if (subId) {
          breadcrumbPaths.push({
            to: `/PageColecoes/${colecaoId}/${subId}`,
            displayName: 'Eventos',
            isLast: false
          });
        }
      } else if (previousPath === '/Eventos') {
        breadcrumbPaths.push({
          to: '/Eventos',
          displayName: 'Eventos',
          isLast: false
        });
      } else if (previousPath === '/' || previousPath === '/home') {
        // nothing
      } else if (previousPathnames[0] && routeNames[previousPathnames[0]]) {
        breadcrumbPaths.push({
          to: previousPath,
          displayName: routeNames[previousPathnames[0]],
          isLast: false
        });
      }
    }

    breadcrumbPaths.push({
      to: location.pathname,
      displayName: 'Detalhes do Organizador',
      isLast: true
    });
  }
  // Para subpáginas de coleções
  else if (isColecaoSubPage) {
    breadcrumbPaths.push({
      to: '/PageColecoes',
      displayName: 'Coleções',
      isLast: false
    });

    // Primeiro nível (categoria)
    if (pathnames.length >= 2) {
      const colecaoId = pathnames[1];
      if (dynamicData.PageColecoes[colecaoId]) {
        breadcrumbPaths.push({
          to: `/PageColecoes/${colecaoId}`,
          displayName: dynamicData.PageColecoes[colecaoId],
          isLast: pathnames.length === 2
        });
      }
    }

    // Segundo nível (subcategoria)
    if (pathnames.length >= 3) {
      const subId = pathnames[2];
      breadcrumbPaths.push({
        to: location.pathname,
        displayName: 'Eventos',
        isLast: true
      });
    }
  }
  // PARA PÁGINAS NORMAIS - LÓGICA SIMPLIFICADA
  else {
    // Para páginas como PageSponsor e Contact, usar caminho direto
    if (location.pathname === '/PageSponsor' || location.pathname === '/Contact') {
      breadcrumbPaths.push({
        to: location.pathname,
        displayName: routeNames[pathnames[0]] || pathnames[0],
        isLast: true
      });
    } else {
      // Para outras páginas, manter a lógica original
      pathnames.forEach((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1 && additionalPaths.length === 0;
        
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
    }
  }

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