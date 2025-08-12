import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import CarouselColecao from './CarouselColecao';
import CarouselElements from './CarouselElements';
import CarouselEvents from './CarouselEvents';
import img1 from '@images/placeholders/img1.png';
import img2 from '@images/placeholders/img2.png';
import img3 from '@images/placeholders/img3.jpg';
import img4 from '@images/placeholders/img4.png';
import img5 from '@images/placeholders/img5.png';
import img6 from '@images/placeholders/img6.png';
import img7 from '@images/placeholders/img7.png';
import cellphone from '@images/placeholders/cellphone.png';
import cellphone4easy from '@images/placeholders/cellPhone4easy.png';
import money from '@images/placeholders/money.png';
import pattern from '@images/placeholders/pattern.png';

const events = [
  {
    image: img1,
    alt: "Evento 1",
    nome: "Nome do Evento 1",
    local: "São Paulo",
    data: "sexta-feira, 12 de Fev às 20:00"
  },
  {
    image: img2,
    alt: "Evento 2",
    nome: "Nome do Evento 2",
    local: "São Paulo",
    data: "sexta-feira, 12 de Fev às 20:00"
  },
  {
    image: img3,
    alt: "Evento 3",
    nome: "Nome do Evento 3",
    local: "São Paulo",
    data: "sexta-feira, 12 de Fev às 20:00"
  },
  {
    image: img4,
    alt: "Evento 4",
    nome: "Nome do Evento 4",
    local: "São Paulo",
    data: "sexta-feira, 12 de Fev às 20:00"
  },
  {
    image: img5,
    alt: "Evento 5",
    nome: "Nome do Evento 5",
    local: "São Paulo",
    data: "sexta-feira, 12 de Fev às 20:00"
  },
  {
    image: img6,
    alt: "Evento 6",
    nome: "Nome do Evento 6",
    local: "São Paulo",
    data: "sexta-feira, 12 de Fev às 20:00"
  },
  {
    image: img7,
    alt: "Evento 7",
    nome: "Nome do Evento 7",
    local: "São Paulo",
    data: "sexta-feira, 12 de Fev às 20:00"
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.mainContent}>
        <section className={styles.eventsSection}>
          <CarouselEvents events={events} />
        </section>

        <div className={styles.contentWithBackground}>
          <div className={styles.carouselWrapper}>
            <CarouselColecao />
          </div>

          <div className={styles.carouselWrapper}>
            <CarouselElements />
          </div>

          <section className={styles.featureSection}>
            <div className={styles.featureContent}>
              <h1 className={styles.mainTitle}>Seu evento, do jeito que você imagina</h1>
              <h2 className={styles.subTitle}>Baixe o app e crie</h2>

              <div className={styles.featureBoxes}>
                <div className={styles.featureBox}>
                  <div className={styles.iconWrapper}>
                    <img src={cellphone} alt="Ícone de celular" className={styles.featureIcon} />
                  </div>
                  <p className={styles.featureText}>Com apenas <span className={styles.highlight}>alguns cliques</span></p>
                </div>

                <div className={styles.featureBox}>
                  <div className={styles.iconWrapper}>
                    <img src={money} alt="Ícone de dinheiro" className={styles.featureIcon} />
                  </div>
                  <p className={styles.featureText}>Crie seu evento <span className={styles.highlight}>gratuitamente!</span></p>
                </div>
              </div>
            </div>

            <div className={styles.featureImageContainer}>
              <img src={cellphone4easy} alt="App no celular" className={styles.featurePhone} />
              
              <div className={styles.actionButtons}>
                <button 
                  onClick={() => navigate('/AboutUs')} 
                  className={styles.primaryButton}
                >
                  Sobre nós
                </button>
                <button 
                  onClick={() => navigate('/InfoPage')} 
                  className={styles.secondaryButton}
                >
                  Veja como funciona
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}