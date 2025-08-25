import React, { useState, useEffect } from 'react';
import styles from './Eventos.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useParams } from "react-router-dom";

const Eventos = () => {
    const { eventoId } = useParams();
    const [evento, setEvento] = useState(null);
    const [localizacao, setLocalizacao] = useState(null);
    const [organizador, setOrganizador] = useState(null);
    const [midias, setMidias] = useState([]);
    const [ingressos, setIngressos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventoData = async () => {
            try {
                setLoading(true);
                // Buscar dados do evento
                const eventoResponse = await fetch(`/api/eventos/${eventoId}`);
                if (!eventoResponse.ok) throw new Error('Evento não encontrado');
                const eventoData = await eventoResponse.json();
                setEvento(eventoData);

                // Buscar localização
                if (eventoData.localizacaoId) {
                    const localizacaoResponse = await fetch(`/api/localizacoes/${eventoData.localizacaoId}`);
                    if (localizacaoResponse.ok) {
                        const localizacaoData = await localizacaoResponse.json();
                        setLocalizacao(localizacaoData);
                    }
                }

                // Buscar organizador
                if (eventoData.organizadorId) {
                    const organizadorResponse = await fetch(`/api/organizadores/${eventoData.organizadorId}`);
                    if (organizadorResponse.ok) {
                        const organizadorData = await organizadorResponse.json();
                        setOrganizador(organizadorData);
                    }
                }

                // Buscar mídias
                const midiasResponse = await fetch(`/api/eventos/${eventoId}/midias`);
                if (midiasResponse.ok) {
                    const midiasData = await midiasResponse.json();
                    setMidias(midiasData);
                }

                // Buscar ingressos
                const ingressosResponse = await fetch(`/api/eventos/${eventoId}/ingressos`);
                if (ingressosResponse.ok) {
                    const ingressosData = await ingressosResponse.json();
                    setIngressos(ingressosData);
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (eventoId) {
            fetchEventoData();
        }
    }, [eventoId]);

    if (loading) return <div className={styles.loading}>Carregando evento...</div>;
    if (error) return <div className={styles.error}>Erro: {error}</div>;
    if (!evento) return <div className={styles.error}>Evento não encontrado</div>;

    // Formatar datas
    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatarHora = (horaString) => {
        if (!horaString) return '';
        return horaString.substring(0, 5);
    };

    return (
        <>
            <Header />
            
            {/* Hero Section - Banner do Evento */}
            <section className={styles.hero}>
                <div className={styles.heroImage} 
                     style={{ backgroundImage: `url(${midias.length > 0 ? midias[0].url : '/default-banner.jpg'})` }}>
                    <div className={styles.heroOverlay}>
                        <div className={styles.heroContent}>
                            <h1 className={styles.eventTitle}>{evento.nomeEvento}</h1>
                            <h2 className={styles.eventCity}>
                                {localizacao ? `${localizacao.cidade}, ${localizacao.estado}` : 'Local a definir'}
                            </h2>
                            <div className={styles.eventDate}>
                                {evento.dataInicio && (
                                    <>
                                        {formatarData(evento.dataInicio)}
                                        {evento.horaInicio && ` às ${formatarHora(evento.horaInicio)}`}
                                    </>
                                )}
                                {evento.dataFim && (
                                    <>
                                        {' até '}
                                        {formatarData(evento.dataFim)}
                                        {evento.horaFim && ` às ${formatarHora(evento.horaFim)}`}
                                    </>
                                )}
                            </div>
                            <div className={styles.eventLocation}>
                                {localizacao && localizacao.endereco}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.mainContent}>
                    {/* Descrição do Evento */}
                    <section className={styles.descriptionSection}>
                        <h2 className={styles.sectionTitle}>Descrição do evento</h2>
                        <p className={styles.eventDescription}>
                            {evento.descEvento || 'Este evento ainda não possui uma descrição detalhada.'}
                        </p>
                        
                        {/* Galeria de Mídias */}
                        {midias.length > 0 && (
                            <div className={styles.mediaGallery}>
                                <h3 className={styles.galleryTitle}>Galeria</h3>
                                <div className={styles.galleryGrid}>
                                    {midias.map((midia, index) => (
                                        <div key={index} className={styles.galleryItem}>
                                            <img src={midia.url} alt={`Mídia ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Informações do Evento */}
                    <section className={styles.infoSection}>
                        <h2 className={styles.sectionTitle}>Informações</h2>
                        
                        <div className={styles.infoItem}>
                            <strong>Tipo de Evento:</strong> {evento.tipoEvento}
                        </div>
                        
                        <div className={styles.infoItem}>
                            <strong>Privacidade:</strong> {evento.privacidadeEvento}
                        </div>
                        
                        {ingressos.length > 0 && (
                            <div className={styles.infoItem}>
                                <strong>Ingressos disponíveis:</strong>
                                <ul className={styles.ticketList}>
                                    {ingressos.map((ingresso, index) => (
                                        <li key={index}>
                                            {ingresso.nome} - R$ {ingresso.preco}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>

                    {/* Política do Evento */}
                    <section className={styles.policySection}>
                        <h2 className={styles.sectionTitle}>Política do evento</h2>
                        <div className={styles.policyContent}>
                            <p>• Entrada permitida apenas para maiores de 18 anos</p>
                            <p>• É proibida a entrada com alimentos e bebidas</p>
                            <p>• Reservamo-nos o direito de entrada</p>
                            <p>• Em caso de cancelamento, os valores serão reembolsados</p>
                        </div>
                    </section>
                </div>

                <div className={styles.sidebar}>
                    {/* Organizador/Produtor */}
                    <div className={styles.organizerCard}>
                        <h3 className={styles.sidebarTitle}>Produtor</h3>
                        <div className={styles.organizerInfo}>
                            <div className={styles.organizerLogo}>
                                {organizador ? (
                                    <span className={styles.organizerInitial}>
                                        {organizador.nome.charAt(0)}
                                    </span>
                                ) : (
                                    <span className={styles.organizerInitial}>O</span>
                                )}
                            </div>
                            <div className={styles.organizerDetails}>
                                <h4>{organizador ? organizador.nome : 'Organizador'}</h4>
                                <p>Responsável pelo evento</p>
                            </div>
                        </div>
                    </div>

                    {/* Ingressos */}
                    {ingressos.length > 0 && (
                        <div className={styles.ticketCard}>
                            <h3 className={styles.sidebarTitle}>Ingressos</h3>
                            <div className={styles.ticketOptions}>
                                {ingressos.map((ingresso, index) => (
                                    <div key={index} className={styles.ticketOption}>
                                        <div className={styles.ticketName}>{ingresso.nome}</div>
                                        <div className={styles.ticketPrice}>R$ {ingresso.preco}</div>
                                        <button className={styles.buyButton}>Comprar</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Localização */}
                    {localizacao && (
                        <div className={styles.locationCard}>
                            <h3 className={styles.sidebarTitle}>Localização</h3>
                            <p>{localizacao.endereco}</p>
                            {localizacao.complemento && <p>{localizacao.complemento}</p>}
                            <p>
                                {localizacao.cidade && `${localizacao.cidade}, `}
                                {localizacao.estado && `${localizacao.estado} `}
                                {localizacao.cep && `- ${localizacao.cep}`}
                            </p>
                        </div>
                    )}

                    {/* Download App */}
                    <div className={styles.appCard}>
                        <h3 className={styles.sidebarTitle}>Baixe nosso aplicativo</h3>
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
        </>
    );
};

export default Eventos;