import React from 'react';
import Footer from '@/components/Footer/Footer';
import styles from "./AboutUs.module.css";
import AlternativeHeader from '@/components/AlternativeHeader/AlternativeHeader';
import Rafael from '@images/team/Rafael.png';
import Jorge from '@images/team/Jorge.png'
import Leandro from '@images/team/Lele.png';
import Yasmin from '@images/team/Yasmin.png';
import Trajetoria from '@images/placeholders/Trajetoria.png';
import CarouselCriadores from './CarouselCriadores.jsx';

export default function AboutUs() {
  const criadores = [
    {
      image: Leandro,
      alt: 'Foto do Leandro',
      nome: 'Leandro Saito',
      cargo: 'Desenvolvedor Web',
      descricao: 'Especialista em web com mais de 10 anos de experiência no mercado de eventos.'
    },
    {
      image: Rafael,
      alt: 'Foto do Rafael',
      nome: 'Rafael Campagnucci',
      cargo: 'Diretor Web',
      descricao: 'Responsável pela concepção e design da aplicação'
    },
    {
      image: Jorge,
      alt: 'Foto do Jorge',
      nome: 'Jorge Junior',
      cargo: 'Gerente e Desenvolvedor Mobile',
      descricao: 'Garante que todos os aspectos logísticos dos eventos sejam executados perfeitamente.'
    },
    {
      image: Yasmin,
      alt: 'Foto da Yasmin',
      nome: 'Yasmin Carvalho',
      cargo: 'Diretora Backend',
      descricao: 'Foca na construção de lógicas estruradas da aplicação.'
    },
  ];

  return (
    <>
      <AlternativeHeader />

      <main className={styles.mainContainer}>
        {/* Banner Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Sobre a 4Easy</h1>
            <p className={styles.heroSubtitle}>Transformando ideias em experiências inesquecíveis</p>
          </div>
        </section>

        {/* Nossa História Section */}
        <section className={styles.historySection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSubtitle}>Nossa História</span>
              <h2 className={styles.sectionTitle}>Como tudo começou</h2>
              <div className={styles.titleDivider}></div>
            </div>
            
            <div className={styles.historyContent}>
              <div className={styles.historyText}>
                <p>
                  A nossa trajetória começou com uma paixão em comum: transformar momentos em experiências inesquecíveis. 
                  Antes mesmo da ideia de abrir uma empresa, já estávamos sempre envolvidos na organização de festas, 
                  casamentos, eventos corporativos e celebrações entre amigos.
                </p>
                <p>
                  Percebemos, então, que aquilo que fazíamos com tanto prazer poderia se tornar um negócio — e foi assim 
                  que nasceu a 4Easy. No início, foi tudo muito orgânico. Começamos com eventos pequenos, contando com 
                  parceiros de confiança, muita criatividade e um atendimento personalizado.
                </p>
                <p>
                  Cada cliente virava uma nova oportunidade de mostrar nosso potencial, e com o tempo, o boca a boca 
                  nos trouxe novos projetos e mais visibilidade. Hoje, somos referência na criação de eventos que 
                  encantam e superam expectativas.
                </p>
              </div>
              <div className={styles.historyStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Eventos Realizados</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>98%</span>
                  <span className={styles.statLabel}>Satisfação do Cliente</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>12</span>
                  <span className={styles.statLabel}>Prêmios Recebidos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Equipe Section */}
        <section className={styles.teamSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSubtitle}>Conheça nossa equipe</span>
              <h2 className={styles.sectionTitle}>Os criadores por trás do projeto</h2>
              <div className={styles.titleDivider}></div>
              <p className={styles.sectionDescription}>
                Profissionais apaixonados por criar experiências únicas e memoráveis
              </p>
            </div>
            <CarouselCriadores criadores={criadores} />
          </div>
        </section>

        {/* Nossa Trajetória Section */}
        <section className={styles.journeySection}>
          <div className={styles.sectionContainer}>
            <div className={styles.journeyContent}>
              <div className={styles.journeyText}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionSubtitle}>Nossa Evolução</span>
                  <h2 className={styles.sectionTitle}>Trajetória de Sucesso</h2>
                  <div className={styles.titleDivider}></div>
                </div>
                <p>
                  De pequenos eventos intimistas a grandes produções corporativas, nossa jornada foi marcada por 
                  aprendizado constante e dedicação à excelência. A cada projeto, refinamos nossos processos e 
                  expandimos nossa rede de parceiros.
                </p>
                <p>
                  Em 2020, enfrentamos o desafio de adaptar nossos eventos para o formato virtual, desenvolvendo 
                  expertise em experiências digitais imersivas. Esta adaptação nos permitiu alcançar clientes em 
                  todo o país e até internacionalmente.
                </p>
                <div className={styles.journeyHighlights}>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightIcon}>✓</span>
                        <span>Certificação em Gestão de Eventos Sustentáveis</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightIcon}>✓</span>
                        <span>Parceria com os melhores fornecedores do mercado</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightIcon}>✓</span>
                        <span>Expansão para 5 estados brasileiros</span>
                  </div>
                </div>
              </div>
              <div className={styles.journeyImage}>
                <img
                  src={Trajetoria}
                  alt='Linha do tempo da trajetória da 4Easy'
                  className={styles.timelineImage}
                />
                <div className={styles.imageOverlay}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores Section */}
        <section className={styles.valuesSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSubtitle}>Nossos Princípios</span>
              <h2 className={styles.sectionTitle}>Valores que nos guiam</h2>
              <div className={styles.titleDivider}></div>
            </div>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>✨</div>
                <h3>Excelência</h3>
                <p>Buscamos a perfeição em cada detalhe, superando expectativas e entregando qualidade superior.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🤝</div>
                <h3>Parceria</h3>
                <p>Construímos relações transparentes e duradouras com clientes, fornecedores e nossa equipe.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>💡</div>
                <h3>Inovação</h3>
                <p>Estamos sempre em busca de novas tendências e soluções criativas para surpreender.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}