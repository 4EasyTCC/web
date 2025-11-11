import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./SearchEvents.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FiltroEventos from "./FiltroEventos/FiltroEventos.jsx";

const SearchEvents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sugestoesLocalizacao, setSugestoesLocalizacao] = useState([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  const initialCategory = searchParams.get("categoria");
  const initialFilters = {
    categoria: initialCategory ? initialCategory.split("|") : [],
    preco: searchParams.get("preco") || "qualquer",
    tipo: searchParams.get("tipo") || "qualquer",
    localizacao: searchParams.get("localizacao") || "",
    pagina: Math.max(1, parseInt(searchParams.get("pagina")) || 1),
  };

  const [filtros, setFiltros] = useState(initialFilters);
  const [totalEventos, setTotalEventos] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // CORREÇÃO: Usar a rota correta com E maiúsculo
  const handleEventClick = (eventoId) => {
    navigate(`/Eventos/${eventoId}`);
  };

  // Lógica de busca de eventos
  useEffect(() => {
    const buscarEventos = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();

        if (filtros.categoria.length > 0) {
          // Use | as separator to avoid splitting on category names with commas
          queryParams.append("categoria", filtros.categoria.join("|"));
        }
        if (filtros.preco !== "qualquer")
          queryParams.append("preco", filtros.preco);
        if (filtros.tipo !== "qualquer")
          queryParams.append("tipo", filtros.tipo);
        if (filtros.localizacao)
          queryParams.append("localizacao", filtros.localizacao);
        queryParams.append("pagina", filtros.pagina);
        queryParams.append("limite", 24);

        const response = await fetch(
          `http://localhost:3000/api/eventos/filtrados?${queryParams.toString()}`
        );

        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error(
              "A API retornou um formato inválido. Verifique se o endpoint está correto."
            );
          }
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.eventos)) {
          throw new Error("Formato de dados inválido da API");
        }

        setEventos(data.eventos);
        setTotalEventos(data.total || 0);
        setTotalPaginas(data.totalPaginas || 1);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        setError(error.message);
        setEventos([]);
      } finally {
        setLoading(false);
      }
    };

    buscarEventos();
  }, [filtros]);

  // Lógica de busca de sugestões de localização com debounce
  useEffect(() => {
    const buscarSugestoesLocalizacao = async () => {
      if (filtros.localizacao && filtros.localizacao.length > 2) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/localizacoes?busca=${encodeURIComponent(
              filtros.localizacao
            )}`
          );
          if (!response.ok) return;

          const data = await response.json();
          if (Array.isArray(data)) {
            setSugestoesLocalizacao(data);
            setMostrarSugestoes(true);
          }
        } catch (error) {
          console.error("Erro ao buscar sugestões de localização:", error);
          setSugestoesLocalizacao([]);
        }
      } else {
        setSugestoesLocalizacao([]);
        setMostrarSugestoes(false);
      }
    };

    const timeoutId = setTimeout(buscarSugestoesLocalizacao, 300);
    return () => clearTimeout(timeoutId);
  }, [filtros.localizacao]);

  // Atualiza os parâmetros da URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (filtros.categoria.length > 0) {
      // Use | as separator to avoid splitting on category names with commas
      params.set("categoria", filtros.categoria.join("|"));
    }
    if (filtros.preco !== "qualquer") params.set("preco", filtros.preco);
    if (filtros.tipo !== "qualquer") params.set("tipo", filtros.tipo);
    if (filtros.localizacao) params.set("localizacao", filtros.localizacao);
    if (filtros.pagina > 1) params.set("pagina", filtros.pagina.toString());

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params);
    }
  }, [filtros, setSearchParams, searchParams]);

  const handleFiltroChange = (novosFiltros) => {
    setFiltros((prev) => ({ ...prev, ...novosFiltros, pagina: 1 }));
  };

  const handleLimparFiltros = () => {
    setFiltros({
      categoria: [],
      preco: "qualquer",
      tipo: "qualquer",
      localizacao: "",
      pagina: 1,
    });
  };

  const handlePaginaChange = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setFiltros((prev) => ({ ...prev, pagina: novaPagina }));
      window.scrollTo(0, 0);
    }
  };

  const handleSugestaoLocalizacaoClick = (sugestao) => {
    setFiltros((prev) => ({ ...prev, localizacao: sugestao, pagina: 1 }));
    setMostrarSugestoes(false);
  };

  const formatarData = (dataString) => {
    if (!dataString) return "Data não definida";
    try {
      const data = new Date(dataString);
      if (isNaN(data.getTime())) return "Data inválida";
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return data.toLocaleDateString("pt-BR", options);
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

const formatarHora = (horaString) => {
    if (!horaString) return "";
    try {
      // Cria um objeto Date a partir da string
      const data = new Date(horaString);

      // Se a data for inválida, tenta o split simples como fallback
      if (isNaN(data.getTime())) {
        const [hours, minutes] = horaString.split(":");
        if (hours && minutes) {
          return `${hours}:${minutes}h`;
        }
        return horaString; // Retorna a string original se tudo falhar
      }

      return (
        data.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }) + "h"
      );
    } catch (error) {
      console.error("Erro ao formatar hora:", error, horaString);
      return horaString; // Retorna a string original em caso de erro
    }
  };


  const getPrecoMinimo = (ingressos) => {
    if (!ingressos || !Array.isArray(ingressos) || ingressos.length === 0) {
      return null;
    }

    const precos = ingressos
      .map((ingresso) => parseFloat(ingresso.preco))
      .filter((preco) => !isNaN(preco));

    if (precos.length === 0) return null;

    return Math.min(...precos);
  };

  const renderPaginacao = () => {
    if (totalPaginas <= 1) return null;

    const botoes = [];
    const paginaAtual = filtros.pagina;
    const maxBotoes = 5;

    botoes.push(
      <button
        key="prev"
        disabled={paginaAtual === 1}
        onClick={() => handlePaginaChange(paginaAtual - 1)}
        aria-label="Página anterior"
      >
        Anterior
      </button>
    );

    let inicio = Math.max(1, paginaAtual - Math.floor(maxBotoes / 2));
    let fim = Math.min(totalPaginas, inicio + maxBotoes - 1);

    if (fim - inicio + 1 < maxBotoes) {
      inicio = Math.max(1, fim - maxBotoes + 1);
    }

    if (inicio > 1) {
      botoes.push(
        <button key={1} onClick={() => handlePaginaChange(1)}>
          1
        </button>
      );
      if (inicio > 2) {
        botoes.push(<span key="ellipsis1">...</span>);
      }
    }

    for (let i = inicio; i <= fim; i++) {
      botoes.push(
        <button
          key={i}
          className={paginaAtual === i ? styles.active : ""}
          onClick={() => handlePaginaChange(i)}
          aria-current={paginaAtual === i ? "page" : undefined}
        >
          {i}
        </button>
      );
    }

    if (fim < totalPaginas) {
      if (fim < totalPaginas - 1) {
        botoes.push(<span key="ellipsis2">...</span>);
      }
      botoes.push(
        <button
          key={totalPaginas}
          onClick={() => handlePaginaChange(totalPaginas)}
        >
          {totalPaginas}
        </button>
      );
    }

    botoes.push(
      <button
        key="next"
        disabled={paginaAtual === totalPaginas}
        onClick={() => handlePaginaChange(paginaAtual + 1)}
        aria-label="Próxima página"
      >
        Próxima
      </button>
    );

    return botoes;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Carregando eventos...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.pageContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Encontre eventos</h1>

          <div className={styles.resultsInfo}>
            <p>
              {totalEventos} EVENTOS{" "}
              {filtros.localizacao
                ? `EM ${filtros.localizacao.toUpperCase()}`
                : "ENCONTRADOS"}
            </p>
            <div className={styles.actions}>
              <button
                className={styles.mobileFilterButton}
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                aria-expanded={showMobileFilters}
                aria-controls="filters-sidebar"
              >
                Filtros
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <p>Erro ao carregar eventos: {error}</p>
              <button onClick={() => window.location.reload()}>
                Tentar novamente
              </button>
            </div>
          )}

          <div className={styles.contentLayout}>
            <aside
              id="filters-sidebar"
              className={`${styles.filtersSidebar} ${
                showMobileFilters ? styles.mobileVisible : ""
              }`}
            >
              <div className={styles.filterHeader}>
                <h3>Filtros</h3>
                <button
                  className={styles.closeFilters}
                  onClick={() => setShowMobileFilters(false)}
                  aria-label="Fechar filtros"
                >
                  ×
                </button>
              </div>

              <FiltroEventos
                filtros={filtros}
                onFiltroChange={handleFiltroChange}
                onLimparFiltros={handleLimparFiltros}
                sugestoesLocalizacao={sugestoesLocalizacao}
                mostrarSugestoes={mostrarSugestoes}
                onSugestaoLocalizacaoClick={handleSugestaoLocalizacaoClick}
              />
            </aside>

            {showMobileFilters && (
              <div
                className={styles.overlay}
                onClick={() => setShowMobileFilters(false)}
                aria-hidden="true"
              />
            )}

            <main className={styles.eventsGrid}>
              {eventos.length === 0 && !loading ? (
                <div className={styles.noEvents}>
                  <h2>Nenhum evento encontrado</h2>
                  <p>Tente ajustar os filtros ou volte mais tarde.</p>
                  <button
                    onClick={handleLimparFiltros}
                    className={styles.limparFiltrosBtn}
                  >
                    Limpar Filtros
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.gridContainer}>
                    {eventos.map((evento) => {
                      const precoMinimo = getPrecoMinimo(evento.Ingressos);
                      const temIngressoGratis =
                        evento.Ingressos &&
                        evento.Ingressos.some(
                          (ingresso) => parseFloat(ingresso.preco) === 0
                        );

                      return (
                        <div 
                          key={evento.eventoId} 
                          className={styles.eventCard}
                          onClick={() => handleEventClick(evento.eventoId)}
                          role="button"
                          tabIndex={0}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleEventClick(evento.eventoId);
                            }
                          }}
                        >
                          <div className={styles.eventImage}>
                            <img
                              src={
                                evento.Midia &&
                                evento.Midia.length > 0 &&
                                evento.Midia[0].url
                                  ? `http://localhost:3000${evento.Midia[0].url}`
                                  : "/placeholder-event.jpg"
                              }
                              alt={evento.nomeEvento || "Evento"}
                              onError={(e) => {
                                e.target.src = "/placeholder-event.jpg";
                              }}
                              loading="lazy"
                            />
                            {temIngressoGratis && (
                              <div className={styles.gratisBadge}>Grátis</div>
                            )}
                          </div>
                          <div className={styles.eventInfo}>
                            <h3 className={styles.eventName}>
                              {evento.nomeEvento || "Evento sem nome"}
                            </h3>
                            <p className={styles.eventLocation}>
                              {evento.localizacao
                                ? `${
                                    evento.localizacao.endereco ||
                                    "Local a definir"
                                  } - ${evento.localizacao.cidade || ""}${
                                    evento.localizacao.estado
                                      ? ", " + evento.localizacao.estado
                                      : ""
                                  }`
                                : "Local a definir"}
                            </p>
                            <p className={styles.eventDate}>
                              {formatarData(evento.dataInicio)}{" "}
                              {evento.horaInicio &&
                                ` às ${formatarHora(evento.horaInicio)}`}
                            </p>
                            {precoMinimo !== null && !temIngressoGratis && (
                              <p className={styles.eventPrice}>
                                A partir de R$ {precoMinimo.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {totalPaginas > 1 && (
                    <div className={styles.pagination}>
                      <span>
                        Página {filtros.pagina} de {totalPaginas}
                      </span>
                      <div className={styles.paginationControls}>
                        {renderPaginacao()}
                      </div>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchEvents;