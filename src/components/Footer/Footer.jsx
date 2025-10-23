import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import whiteLogo from '@images/logos/Logo4eBranco.png';
import apple from '@images/apps/appStore.png';
import googlePlay from '@images/apps/googlePlay.png';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const categoryToIdMap = {
    'Arte, Cultura e Lazer': 1,
    'Congressos e Palestras': 2,
    'Esporte': 4,
    'Festas e Shows': 5,
    'Gastronomia': 6,
    'Games e Geek': 7,
    'Grátis': 8,
    'Infantil': 9,
    'Moda e Beleza': 10,
    'Teatros e Espetáculos': 14
  };

  return (
    <footer className={styles.footer}>
      {/* Botão de voltar ao topo aprimorado */}
      <button
        onClick={scrollToTop}
        className={`${styles.backToTop} ${visible ? styles.show : ''}`}
        aria-label="Voltar ao topo"
      >
        <div className={styles.arrowContainer}>
          <div className={styles.arrowIcon}></div>
        </div>
      </button>

      {/* Restante do código do footer */}
      <div className={styles.footerContent}>
        {/* Seção de download */}
        <div className={styles.downloadSection}>
          <div className={styles.logoSection}>
            <img
              src={whiteLogo}
              alt="4e"
              className={styles.logo}
              loading="lazy"
            />
            <p className={styles.tagline}>Conectando você aos melhores eventos</p>
          </div>

          <div className={styles.appDownload}>
            <h3>Baixe nosso aplicativo</h3>
            <div className={styles.appButtons}>
              <a href="#" className={styles.storeLink}>
                <img
                  src={googlePlay}
                  alt="Disponível no Google Play"
                  className={styles.badge}
                  loading="lazy"
                />
              </a>
              <a href="#" className={styles.storeLink}>
                <img
                  src={apple}
                  alt="Disponível na App Store"
                  className={styles.badge}
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Seção de links */}
        <div className={styles.linksGrid}>
          <div className={styles.linksColumn}>
            <h4>Cidades</h4>
            <ul>
              {['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Curitiba'].map((city, index) => (
                <li key={index}>
                  <a href="#" className={styles.link}>{city}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4>Categorias</h4>
            <ul>
              {[
                'Arte, Cultura e Lazer',
                'Congressos e Palestras',
                'Esporte',
                'Festas e Shows',
                'Gastronomia',
                'Games e Geek',
                'Grátis',
                'Infantil',
                'Moda e Beleza',
                'Teatros e Espetáculos'
              ].map((category, index) => {
                const categoryId = categoryToIdMap[category];
                return (
                  <li key={index}>
                    {categoryId ? (
                      <Link 
                        to={`/PageColecoes/${categoryId}`} 
                        className={styles.link}
                      >
                        {category}
                      </Link>
                    ) : (
                      <span className={styles.link}>{category}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4>Ajuda</h4>
            <ul>
              <li>
                <Link to="/Terms" className={styles.link}>Termos de Uso</Link>
              </li>
              <li>
                <Link to="/Contact" className={styles.link}>Contato</Link>
              </li>
              <li>
                <Link to="/Feedback" className={styles.link}>SAC</Link>
              </li>
            </ul>
          </div>

          <div className={styles.newsletter}>
            <h4>Receba nossas novidades</h4>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className={styles.emailInput}
                required
              />
              <button type="submit" className={styles.subscribeButton}>
                Assinar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className={styles.footerBottom}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} 4Easy. Todos os direitos reservados.
        </span>

        <div className={styles.socialLinks}>
          <a href="#" aria-label="Facebook" className={styles.socialLink}>
            <FaFacebook className={styles.socialIcon} />
          </a>
          <a href="#" aria-label="Instagram" className={styles.socialLink}>
            <FaInstagram className={styles.socialIcon} />
          </a>
          <a href="#" aria-label="Twitter" className={styles.socialLink}>
            <FaTwitter className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
}