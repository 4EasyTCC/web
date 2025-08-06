import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import CarouselColecao from './CarouselColecao';
import CarouselElements from './CarouselElements';
import CarouselEvents from './CarouselEvents';
import Rafael from '@images/team/Rafael.png';
import Jorge from '@images/team/Jorge.png'
import Leandro from '@images/team/Lele.png';
import img1 from '@images/placeholders/img1.png';
import img2 from '@images/placeholders/img2.png';
import img3 from '@images/placeholders/img3.jpg';
import img4 from '@images/placeholders/img4.png';
import img5 from '@images/placeholders/img5.png';
import img6 from '@images/placeholders/img6.png';
import img7 from '@images/placeholders/img7.png';
import Yasmin from '@images/team/Yasmin.png';
import cellphone from '@images/placeholders/cellphone.png';
import cellphone4easy from '@images/placeholders/cellPhone4easy.png';
import money from '@images/placeholders/money.png';

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
    alt: "Evento 1",
    nome: "Nome do Evento 2",
    local: "São Paulo",
    data: "sexta-feira, 12 de Fev às 20:00"
  },
  {
    image: img3,
    alt: "Evento 1",
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

  const proxima = () => {

    navigate('/AboutUs');


  }

  const info = () => {

    navigate('InfoPage');


  };

  return (
    <>
      
      <Header />

      <section className={styles.eventsSection}>

        <CarouselEvents events={events} />
      </section>

      <div className={styles.secondPart}>
        <div className={styles.carouselWrapper}>
          <CarouselColecao />
        </div>

        <div className={styles.carouselWrapper}>
          <CarouselElements />
        </div>




        <div className={styles.featureSection}>
          <div className={styles.featureContent}>
            <h1 className={styles.mainTitle}>Seu evento, do jeito <br /> que você imagina.</h1>
            <h2 className={styles.subTitle}>Baixe o app e crie</h2>

            <div className={styles.featureBoxes}>
              <div className={styles.featureBox}>
                <img src={cellphone} alt="Celular" className={styles.featureIcon} />
                <p className={styles.featureText}>Com apenas <b>alguns cliques</b></p>
              </div>

              <div className={styles.featureBox}>
                <img src={money} alt="Dinheiro" className={styles.featureIcon} />
                <p className={styles.featureText}>Crie seu evento <b>gratuitamente!</b> </p>
              </div>
            </div>


          </div>

          <div className="featureContent2">
            <div className={styles.featureBox}>
              <img src={cellphone4easy} alt="Celular" className={styles.featureIcon2} />

            </div>

            <div className={styles.actionButtons}>
              <button onClick={proxima} className={styles.actionButton}>Sobre nós</button>
              <button onClick={info} className={styles.actionButton}>Veja como funciona</button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>

  );
}