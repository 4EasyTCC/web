import React, { useState, useEffect } from "react";
import styles from "./Eventos.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";

// Função auxiliar para resolver o caminho da imagem
const resolveImageUrl = (url) => {
  // Verifica se a URL já é absoluta (começa com http, https, etc.)
  if (url && (url.startsWith("http") || url.startsWith("https"))) {
    return url;
  }
  // Se for uma URL relativa, a transforma em absoluta usando a URL base do backend.
  // IMPORTANTE: Ajuste a URL base se o seu backend estiver em outro local.
  return `http://localhost:3000${url}`;
};

const Eventos = () => {
  const { id } = useParams();
  const eventoId = id;
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [participando, setParticipando] = useState(false);
  const [compraLoading, setCompraLoading] = useState(false);
  const [quantidades, setQuantidades] = useState({});
  const [modalAberto, setModalAberto] = useState(false);
  const [ingressoSelecionado, setIngressoSelecionado] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  // cart is persisted in localStorage and handled by the ShoppingCart page

  useEffect(() => {
    const fetchEventoData = async () => {
      if (!eventoId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `http://localhost:3000/api/eventos/${eventoId}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Evento não encontrado");
          }
          throw new Error("Erro ao carregar evento");
        }
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || "Erro ao carregar evento");
        }
        setEvento(data.evento);
        // verificar se usuário está logado e se já participa
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
        // Após setEvento, verificar participação (só se token existir)
        if (storedToken) {
          try {
            const respStatus = await fetch(
              `http://localhost:3000/participacao/evento/${data.evento.eventoId}`,
              {
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                },
              }
            );
            if (respStatus.ok) {
              const js = await respStatus.json();
              if (js.status && js.status === "Participa") {
                setParticipando(true);
              }
            }
          } catch (err) {
            console.warn("Erro ao checar participação:", err);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar evento:", err);
        setError(err.message);
        setLoading(false);

        // Dados mockados
        if (import.meta.env.DEV) {
          const eventoMockado = {
            eventoId: parseInt(eventoId),
            nomeEvento: `Evento de Exemplo ${eventoId}`,
            descEvento:
              "Este é um evento de exemplo com descrição detalhada para demonstração das funcionalidades do sistema.",
            tipoEvento: "Festas e Shows",
            privacidadeEvento: "Público",
            dataInicio: "2025-10-15",
            horaInicio: "19:00",
            dataFim: "2025-10-16",
            horaFim: "02:00",
            statusEvento: "ativo",
            localizacao: {
              endereco: "Avenida Paulista, 1000",
              cidade: "São Paulo",
              estado: "SP",
              cep: "01310-100",
              complemento: "Próximo ao metrô Trianon-MASP",
            },
            organizador: {
              organizadorId: 1,
              nome: "Produtor Exemplo",
              email: "produtor@exemplo.com",
              avatarUrl: null,
            },
            Ingressos: [
              {
                ingressoId: 1,
                nome: "Pista",
                descricao: "Acesso à área principal do evento",
                preco: 50.0,
                quantidade: 100,
                dataLimite: "2025-10-14",
              },
              {
                ingressoId: 2,
                nome: "VIP",
                descricao: "Área exclusiva com open bar",
                preco: 120.0,
                quantidade: 50,
                dataLimite: "2025-10-14",
              },
            ],
            Midia: [
              {
                midiaId: 1,
                // Usando caminho relativo para o mock
                url: "/placeholder-event.jpg",
                tipo: "imagem",
              },
              {
                midiaId: 2,
                url: "/placeholder-event-2.jpg",
                tipo: "imagem",
              },
            ],
          };
          setEvento(eventoMockado);
          setError("Usando dados de demonstração - API não disponível");
        }
      }
    };
    fetchEventoData();
  }, [eventoId]);

  const handleComprarIngresso = (ingresso) => {
    // Abre modal de confirmação, guarda ingresso selecionado e quantidade atual
    if (!token) {
      alert("Você precisa estar logado como convidado para comprar ingressos.");
      navigate("/paginaLogin");
      return;
    }

    const disponivel = typeof ingresso.quantidade === "number" ? ingresso.quantidade : null;
    const selecionada = quantidades[ingresso.ingressoId] || 1;

    if (disponivel !== null && disponivel <= 0) {
      alert("Este ingresso está esgotado.");
      return;
    }

    setIngressoSelecionado(ingresso);
    setQuantidadeSelecionada(Math.min(selecionada, disponivel || selecionada));
    setModalAberto(true);
  };

  const confirmarCompra = async () => {
    if (!ingressoSelecionado) return;
    setCompraLoading(true);
    try {
      const resp = await fetch(
        `http://localhost:3000/participar/evento/${ingressoSelecionado.ingressoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // backend atual não consome quantidade, mas incluímos para evolução
          body: JSON.stringify({ quantidade: quantidadeSelecionada }),
        }
      );

      const body = await resp.json();
      if (!resp.ok) throw new Error(body.message || "Erro ao processar compra");

      setParticipando(true);
      alert(body.message || "Participação confirmada com sucesso!");

      // tentar aderir ao grupo
      if (body.eventoId) {
        try {
          await fetch("http://localhost:3000/grupos/aderir", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ eventoId: body.eventoId }),
          });
        } catch (err) {
          console.warn("Falha ao aderir ao grupo:", err);
        }
      }
      setModalAberto(false);
    } catch (err) {
      console.error("Erro confirmar compra:", err);
      alert(err.message || "Erro ao confirmar compra");
    } finally {
      setCompraLoading(false);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setIngressoSelecionado(null);
  };

  const handleQuantidadeChange = (ingressoId, value) => {
    const q = Math.max(1, parseInt(value || 1, 10));
    setQuantidades((prev) => ({ ...prev, [ingressoId]: q }));
  };

  // Carrinho: adicionar item
  const adicionarAoCarrinho = (ingresso) => {
    // Only persist to localStorage and notify the app; the ShoppingCart page owns the cart UI
    const qtd = quantidades[ingresso.ingressoId] || 1;
    try {
      const current = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = current.find((c) => c.ingressoId === ingresso.ingressoId);
      let next;
      if (existing) {
        next = current.map((c) =>
          c.ingressoId === ingresso.ingressoId
            ? { ...c, quantidade: Math.min((c.quantidade || 0) + qtd, ingresso.quantidade || 9999) }
            : c
        );
      } else {
        next = [
          ...current,
          { ingressoId: ingresso.ingressoId, nome: ingresso.nome, preco: ingresso.preco, quantidade: Math.min(qtd, ingresso.quantidade || qtd), ingresso },
        ];
      }
      localStorage.setItem('cart', JSON.stringify(next));
      window.dispatchEvent(new Event('cartChanged'));
      alert(`${qtd} x ${ingresso.nome} adicionados ao carrinho`);
    } catch (err) {
      console.error('Erro ao adicionar ao carrinho:', err);
      alert('Não foi possível adicionar ao carrinho.');
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return "Data não definida";
    try {
      const data = new Date(dataString);
      if (isNaN(data.getTime())) return "Data inválida";
      return data.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

  const formatarHora = (horaString) => {
    if (!horaString) return "";
    try {
      const [hours, minutes] = horaString.split(":");
      return `${hours}:${minutes}h`;
    } catch (error) {
      console.error("Erro ao formatar hora:", error);
      return "";
    }
  };

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(preco);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Carregando evento...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error && !evento) {
    return (
      <>
        <Header />
        <div className={styles.errorContainer}>
          <h2>Erro ao carregar evento</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")} className={styles.backButton}>
            Ir para a página inicial
          </button>
        </div>
        <Footer />
      </>
    );
  }

  if (!evento) {
    return (
      <>
        <Header />
        <div className={styles.errorContainer}>
          <h2>Evento não encontrado</h2>
          <p>O evento solicitado não existe ou não está disponível.</p>
          <button onClick={() => navigate("/")} className={styles.backButton}>
            Ir para a página inicial
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className={styles.hero}>
        <div
          className={styles.heroImage}
          style={{
            backgroundImage: `url(${
              evento.Midia && evento.Midia.length > 0
                ? resolveImageUrl(evento.Midia[0].url)
                : "/default-banner.jpg"
            })`,
          }}
        >
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>
              <button onClick={() => navigate(-1)} className={styles.backButton}>
                ← Voltar
              </button>
              <h1 className={styles.eventTitle}>{evento.nomeEvento}</h1>
              <h2 className={styles.eventCity}>
                {evento.localizacao
                  ? `${evento.localizacao.cidade}, ${evento.localizacao.estado}`
                  : "Local a definir"}
              </h2>
              <div className={styles.eventDate}>
                {evento.dataInicio && (
                  <>
                    {formatarData(evento.dataInicio)}
                    {evento.horaInicio &&
                      ` às ${formatarHora(evento.horaInicio)}`}
                  </>
                )}
                {evento.dataFim && evento.dataFim !== evento.dataInicio && (
                  <>
                    {" até "}
                    {formatarData(evento.dataFim)}
                    {evento.horaFim && ` às ${formatarHora(evento.horaFim)}`}
                  </>
                )}
              </div>
              <div className={styles.eventLocation}>
                {evento.localizacao?.endereco}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.mainContent}>
          <section className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>Sobre o evento</h2>
            <p className={styles.eventDescription}>
              {evento.descEvento ||
                "Este evento ainda não possui uma descrição detalhada."}
            </p>
            {evento.Midia && evento.Midia.length > 0 && (
              <div className={styles.mediaGallery}>
                <h3 className={styles.galleryTitle}>Galeria</h3>
                <div className={styles.galleryGrid}>
                  {evento.Midia.map((midia, index) => (
                    <div
                      key={midia.midiaId || index}
                      className={styles.galleryItem}
                    >
                      <img
                        src={resolveImageUrl(midia.url)}
                        alt={`${evento.nomeEvento} - Imagem ${index + 1}`}
                        onError={(e) => {
                          e.target.src = "/placeholder-event.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className={styles.infoSection}>
            <h2 className={styles.sectionTitle}>Informações</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <strong>🎭 Tipo de Evento:</strong>
                <span>{evento.tipoEvento || "Não especificado"}</span>
              </div>
              <div className={styles.infoItem}>
                <strong>🔒 Privacidade:</strong>
                <span>{evento.privacidadeEvento || "Público"}</span>
              </div>
              <div className={styles.infoItem}>
                <strong>📅 Data de Início:</strong>
                <span>
                  {evento.dataInicio
                    ? formatarData(evento.dataInicio)
                    : "Não definida"}
                  {evento.horaInicio &&
                    ` às ${formatarHora(evento.horaInicio)}`}
                </span>
              </div>
              {evento.dataFim && (
                <div className={styles.infoItem}>
                  <strong>📅 Data de Término:</strong>
                  <span>
                    {formatarData(evento.dataFim)}
                    {evento.horaFim && ` às ${formatarHora(evento.horaFim)}`}
                  </span>
                </div>
              )}
              <div className={styles.infoItem}>
                <strong>📊 Status:</strong>
                <span
                  className={
                    evento.statusEvento === "ativo"
                      ? styles.statusAtivo
                      : styles.statusInativo
                  }
                >
                  {evento.statusEvento === "ativo" ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>Políticas do evento</h2>
            <div className={styles.policyContent}>
              <div className={styles.policyItem}>
                <strong>🎫 Entrada:</strong>
                <span>Permitida apenas para maiores de 18 anos</span>
              </div>
              <div className={styles.policyItem}>
                <strong>🚫 Restrições:</strong>
                <span>
                  É proibida a entrada com alimentos e bebidas externas
                </span>
              </div>
              <div className={styles.policyItem}>
                <strong>⚖️ Direito de Admissão:</strong>
                <span>Reservamo-nos o direito de entrada</span>
              </div>
              <div className={styles.policyItem}>
                <strong>💵 Reembolso:</strong>
                <span>
                  Em caso de cancelamento, os valores serão reembolsados em até
                  30 dias
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.organizerCard}>
            <h3 className={styles.sidebarTitle}>🎤 Produtor</h3>
            <div className={styles.organizerInfo}>
              <div className={styles.organizerLogo}>
                {evento.organizador?.avatarUrl ? (
                  <img
                    src={resolveImageUrl(evento.organizador.avatarUrl)}
                    alt={evento.organizador.nome}
                    onError={(e) => {
                        e.target.src = "/placeholder-avatar.jpg";
                      }}
                      />
                    ) : (
                      <span className={styles.organizerInitial}>
                      {evento.organizador?.nome?.charAt(0).toUpperCase() || "O"}
                      </span>
                    )}
                    </div>
                    <div className={styles.organizerDetails}>
                    <h4>{evento.organizador?.nome || "Organizador"}</h4>
                    <p>Responsável pelo evento</p>
                    {evento.organizador?.email && (
                      <p className={styles.organizerEmail}>
                      {evento.organizador.email}
                      </p>
                    )}
                    </div>
                  </div>
                  </div>
                  {evento.Ingressos?.length > 0 && (
                  <div className={styles.ticketCard}>
                    <h3 className={styles.sidebarTitle}>🎫 Ingressos</h3>
                    <div className={styles.ticketOptions}>
                    {evento.Ingressos.map((ingresso, index) => (
                      <div
                      key={ingresso.ingressoId || index}
                      className={styles.ticketOption}
                      >
                      <div className={styles.ticketHeader}>
                        <div className={styles.ticketName}>{ingresso.nome}</div>
                        <div className={styles.ticketPrice}>
                        {formatarPreco(ingresso.preco)}
                        </div>
                      </div>
                      {ingresso.descricao && (
                        <div className={styles.ticketDescription}>
                        {ingresso.descricao}
                        </div>
                      )}
                      {ingresso.dataLimite && (
                        <div className={styles.ticketDeadline}>
                        Venda até: {formatarData(ingresso.dataLimite)}
                        </div>
                      )}
                      <div className={styles.qtyRow}>
                        <label className="textQ">Quantidade:</label>
                        <input
                        type="number"
                        min={1}
                        max={ingresso.quantidade || 9999}
                        value={quantidades[ingresso.ingressoId] || 1}
                        onChange={(e) =>
                          handleQuantidadeChange(ingresso.ingressoId, e.target.value)
                        }
                        className={styles.qtyInput}
                        style={{ marginLeft: 8 }}
                        />
                      </div>

                      <div className={styles.ticketActionsRow}>
                        <button
                        className={styles.addToCartButton}
                        onClick={() => adicionarAoCarrinho(ingresso)}
                        >
                        Adicionar ao carrinho
                        </button>
                        
                      </div>
                      </div>
                    ))}
                    </div>
                  </div>
                  )}
          
          {evento.localizacao && (
            <div className={styles.locationCard}>
              <h3 className={styles.sidebarTitle}>📍 Localização</h3>
              <div className={styles.locationInfo}>
                <p className={styles.locationAddress}>
                  <strong>Endereço:</strong>
                  <br />
                  {evento.localizacao.endereco}
                </p>
                {evento.localizacao.complemento && (
                  <p className={styles.locationComplement}>
                    {evento.localizacao.complemento}
                  </p>
                )}
                <p className={styles.locationCity}>
                  {evento.localizacao.cidade &&
                    `${evento.localizacao.cidade}, `}
                  {evento.localizacao.estado && `${evento.localizacao.estado} `}
                  {evento.localizacao.cep && `- ${evento.localizacao.cep}`}
                </p>
              </div>
            </div>
          )}
          <div className={styles.appCard}>
            <h3 className={styles.sidebarTitle}>📱 Baixe nosso app</h3>
            <p className={styles.appDescription}>
              Tenha acesso a todos os eventos e compre ingressos com facilidade
            </p>
            <div className={styles.appButtons}>
              <button className={styles.appButton}>
                <span>Google Play</span>
              </button>
              <button className={styles.appButton}>
                <span>App Store</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Modal de confirmação de compra (simples) */}
      {modalAberto && ingressoSelecionado && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Confirmar compra</h3>
            <p>
              Você está prestes a comprar <strong>{quantidadeSelecionada}</strong> x{' '}
              <strong>{ingressoSelecionado.nome}</strong> por{' '}
              <strong>{formatarPreco(ingressoSelecionado.preco)}</strong> cada.
            </p>
            <div className={styles.modalActions}>
              <button onClick={fecharModal} className={styles.cancelButton}>
                Cancelar
              </button>
              <button onClick={confirmarCompra} className={styles.confirmButton} disabled={compraLoading}>
                {compraLoading ? 'Aguarde...' : 'Confirmar compra'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Eventos;