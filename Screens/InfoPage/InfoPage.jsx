import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./InfoPage.module.css";
import Header from '@/components/Header/Header';
import videoMP4 from '@/assets/videos/4eVideo.mp4';

const InfoPage = () => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/PageCadastro');
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Conheça a <span className={styles.heroTitleHighlight}>4Easy</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            A plataforma premium que revoluciona a criação e gestão de eventos
                        </p>
                        <div className={styles.heroVideoContainer}>
                            <video
                                className={styles.heroVideo}
                                poster="/caminho/para/sua-thumbnail.jpg" // Opcional
                                controls
                                muted
                              
                            >
                                <source src={videoMP4} type="video/mp4" />
                                {/* Se tiver versão WebM */}
                                {/* <source src={videoWEBM} type="video/webm" /> */}
                                Seu navegador não suporta vídeos HTML5.
                            </video>

                            {/* Botão de play personalizado */}
                            <div
                                className={styles.playButton}
                                onClick={(e) => {
                                    e.currentTarget.parentElement.querySelector('video').play();
                                    e.currentTarget.style.display = 'none';
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 8L16 12L10 16V8Z" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className={styles.howItWorks}>
                    <h2 className={styles.sectionTitle}>Como Funciona</h2>
                    <div className={styles.stepsContainer}>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>1</div>
                            <h3 className={styles.stepTitle}>Crie seu evento</h3>
                            <p className={styles.stepDescription}>
                                Preencha os detalhes básicos do seu evento em nosso formulário intuitivo.
                            </p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>2</div>
                            <h3 className={styles.stepTitle}>Personalize</h3>
                            <p className={styles.stepDescription}>
                                Adicione sua identidade visual, programação e informações relevantes.
                            </p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>3</div>
                            <h3 className={styles.stepTitle}>Compartilhe</h3>
                            <p className={styles.stepDescription}>
                                Divulgue seu evento através de links personalizados e redes sociais.
                            </p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>4</div>
                            <h3 className={styles.stepTitle}>Gerencie</h3>
                            <p className={styles.stepDescription}>
                                Acompanhe inscrições, envie comunicados e analise métricas em tempo real.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className={styles.features}>
                    <h2 className={styles.sectionTitle}>Recursos Exclusivos</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 8V12L15 15" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className={styles.featureTitle}>Painel de Controle Intuitivo</h3>
                            <p className={styles.featureText}>
                                Tenha todas as ferramentas necessárias em um único lugar, com interface limpa e fácil de usar.
                            </p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className={styles.featureTitle}>Inscrições Personalizadas</h3>
                            <p className={styles.featureText}>
                                Crie formulários de inscrição com campos customizados para coletar exatamente o que precisa.
                            </p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19.4 15C19.2669 15.3016 19.227 15.6362 19.2851 15.9606C19.3432 16.285 19.497 16.5843 19.726 16.8185C19.955 17.0528 20.2483 17.2105 20.5645 17.2702C20.8807 17.3299 21.2041 17.2888 21.494 17.153L21.6 17.1C21.9319 16.9444 22.2135 16.7031 22.4142 16.4026C22.6149 16.1021 22.7269 15.7539 22.7375 15.3959C22.7481 15.0379 22.6569 14.6841 22.4746 14.3719C22.2923 14.0598 22.0261 13.8014 21.706 13.625L19.8 12.6L21.706 11.575C22.0261 11.3986 22.2923 11.1402 22.4746 10.8281C22.6569 10.5159 22.7481 10.1621 22.7375 9.80414C22.7269 9.44615 22.6149 9.09789 22.4142 8.79739C22.2135 8.49688 21.9319 8.25561 21.6 8.1L21.494 8.047C21.2041 7.91124 20.8807 7.8701 20.5645 7.92979C20.2483 7.98948 19.955 8.14723 19.726 8.38147C19.497 8.61571 19.3432 8.91498 19.2851 9.23939C19.227 9.5638 19.2669 9.89836 19.4 10.2L19.5 10.4" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.60002 15C4.73314 15.3016 4.773 15.6362 4.71491 15.9606C4.65682 16.285 4.50303 16.5843 4.27401 16.8185C4.04499 17.0528 3.75171 17.2105 3.43552 17.2702C3.11933 17.3299 2.79594 17.2888 2.50602 17.153L2.40002 17.1C2.06812 16.9444 1.78652 16.7031 1.58581 16.4026C1.3851 16.1021 1.27312 15.7539 1.26252 15.3959C1.25192 15.0379 1.34314 14.6841 1.52544 14.3719C1.70774 14.0598 1.97394 13.8014 2.29402 13.625L4.20002 12.6L2.29402 11.575C1.97394 11.3986 1.70774 11.1402 1.52544 10.8281C1.34314 10.5159 1.25192 10.1621 1.26252 9.80414C1.27312 9.44615 1.3851 9.09789 1.58581 8.79739C1.78652 8.49688 2.06812 8.25561 2.40002 8.1L2.50602 8.047C2.79594 7.91124 3.11933 7.8701 3.43552 7.92979C3.75171 7.98948 4.04499 8.14723 4.27401 8.38147C4.50303 8.61571 4.65682 8.91498 4.71491 9.23939C4.773 9.5638 4.73314 9.89836 4.60002 10.2L4.50002 10.4" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className={styles.featureTitle}>Integrações Poderosas</h3>
                            <p className={styles.featureText}>
                                Conecte-se com ferramentas de pagamento, e-mail marketing e outras plataformas.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className={styles.testimonials}>
                    <h2 className={styles.sectionTitle}>Quem usa recomenda</h2>
                    <div className={styles.testimonialCards}>
                        <div className={styles.testimonialCard}>
                            <div className={styles.testimonialAvatar}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className={styles.testimonialText}>
                                "A 4Easy transformou completamente como organizamos nossos eventos corporativos. A plataforma é intuitiva e poderosa."
                            </p>
                            <p className={styles.testimonialAuthor}>- Ana Silva, RH Empresa X</p>
                            <div className={styles.testimonialRating}>
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#1400b4" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <div className={styles.testimonialCard}>
                            <div className={styles.testimonialAvatar}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className={styles.testimonialText}>
                                "A economia de tempo e a facilidade de uso são incomparáveis. Nossos eventos nunca foram tão profissionais."
                            </p>
                            <p className={styles.testimonialAuthor}>- Carlos Mendes, Eventos Y</p>
                            <div className={styles.testimonialRating}>
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#1400b4" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#1400b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={styles.cta}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Pronto para revolucionar seus eventos?</h2>
                        <p className={styles.ctaSubtitle}>
                            Comece agora mesmo e experimente a plataforma gratuitamente por 14 dias.
                        </p>
                        <button className={styles.ctaButton} onClick={handleSignUp}>Criar minha conta</button>
                        <div className={styles.ctaBadges}>
  <div className={styles.ctaBadge}>
    {/* Ícone da App Store (Apple) */}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
    <p>Disponível na App Store</p>
  </div>
  <div className={styles.ctaBadge}>
    {/* Ícone do Google Play */}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.063 3.627l1.683-1.68L20.31 12l-15.564 9.053-1.683-1.68 12.24-7.373L3.063 3.627zM5.17 2.4L20.313 12 5.17 21.6l-.001-4.367L13.54 12 5.168 6.767 5.17 2.4z" />
    </svg>
    <p>Disponível no Google Play</p>
  </div>
</div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default InfoPage;