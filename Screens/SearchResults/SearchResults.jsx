import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import styles from './SearchResults.module.css';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:3000/api/eventos/busca-nome?query=${encodeURIComponent(query)}&limite=50`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.success) setResults(data.eventos || []);
        else setResults([]);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Erro ao buscar eventos:', err);
          setError('Erro ao buscar resultados.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
    return () => controller.abort();
  }, [query]);

  return (
    <>
      <Header />
      <div className={styles.pageContainer}>
        <PageWrapper>
          <div className={styles.mainContainer}>
            <div className={styles.leftContent}>
              <div className={styles.contentWrapper}>
                <h1>Resultados para <span className={styles.highlight}>"{query}"</span></h1>
                <h2>Aqui estão os eventos que combinam com sua busca.</h2>
                <p className={styles.description}>Use filtros na barra de busca para refinar os resultados.</p>
                <button
                  className={styles.ctaButton}
                  onClick={() => navigate('/Eventos')}
                >
                  Ver todos os eventos
                  <span className={styles.buttonArrow}>→</span>
                </button>
              </div>
            </div>

            <div className={styles.rightContent}>
              <div className={styles.resultsArea}>
                {loading && <p>Carregando resultados...</p>}
                {error && <p className={styles.error}>{error}</p>}

                {!loading && results.length === 0 && (
                  <div className={styles.noResults}>
                    <p>Não encontramos eventos para "{query}"</p>
                    <p className={styles.suggestion}>Tente outros termos ou remova filtros.</p>
                  </div>
                )}

                {!loading && results.length > 0 && (
                  <div className={styles.resultsGrid}>
                    {results.map(evento => (
                      <div key={evento.eventoId} className={styles.eventCard} onClick={() => window.location.href = `/eventos/${evento.eventoId}`}>
                        <img
                          src={evento.Midia?.[0]?.url ? `http://localhost:3000${evento.Midia[0].url}` : '/default-event.jpg'}
                          alt={evento.nomeEvento}
                          className={styles.eventImage}
                        />
                        <div className={styles.eventInfo}>
                          <h4>{evento.nomeEvento}</h4>
                          <p className={styles.desc}>{evento.descEvento}</p>
                          <div className={styles.meta}>
                            <span>{new Date(evento.dataInicio).toLocaleDateString()}</span>
                            <span>{evento.localizacao?.cidade || 'Local a definir'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </PageWrapper>
      </div>
      <Footer />
    </>
  );
}
