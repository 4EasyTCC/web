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
      alt: 'Foto do Criador 1',
      nome: 'Leandro',

    },
    {
      image: Rafael,
      alt: 'Foto do Criador 2',
      nome: 'Rafael',

    },
    {
      image: Jorge,
      alt: 'Foto do Criador 3',
      nome: 'Jorge',

    },
    {
      image: Yasmin,
      alt: 'Foto do Criador 4',
      nome: 'Yasmin',

    },
  ];

  return (
    <>
      <AlternativeHeader />

      <main className={styles.mainContainer}>
        <div className={styles.bannerSection}>
          <h1></h1>
        </div>
        <div className={styles.boxContainer}>
          
          <div className={styles.txtContainer}>
            <h1>INÍCIO</h1>
            <p>
            Como tudo começou: a história por trás da nossa empresa de gestão de eventos
            A nossa trajetória começou com uma paixão em comum: transformar momentos em experiências inesquecíveis. Antes mesmo da ideia de abrir uma empresa, já estávamos sempre envolvidos na organização de festas, casamentos, eventos corporativos e celebrações entre amigos. Percebemos, então, que aquilo que fazíamos com tanto prazer poderia se tornar um negócio — e foi assim que nasceu a 4Easy.
            No início, foi tudo muito orgânico. Começamos com eventos pequenos, contando com parceiros de confiança, muita criatividade e um atendimento personalizado. Cada cliente virava uma nova oportunidade de mostrar nosso potencial, e com o tempo, o boca a boca nos trouxe novos projetos e mais visibilidade.
            </p>



          </div>
        </div>

        <section className={styles.teamSection}>
          <h2>Nossa Equipe</h2>
          <p>Conheça os criadores por trás do projeto</p>
          <CarouselCriadores criadores={criadores} />
        </section>

        <div className={styles.boxContainer2}>
          <div className={styles.txtContainer2}>
            <h1>NOSSA TRAJETÓRIA</h1>
            <p>
            Como tudo começou: a história por trás da nossa empresa de gestão de eventos
            A nossa trajetória começou com uma paixão em comum: transformar momentos em experiências inesquecíveis. Antes mesmo da ideia de abrir uma empresa, já estávamos sempre envolvidos na organização de festas, casamentos, eventos corporativos e celebrações entre amigos. Percebemos, então, que aquilo que fazíamos com tanto prazer poderia se tornar um negócio — e foi assim que nasceu a 4Easy.
            No início, foi tudo muito orgânico. Começamos com eventos pequenos, contando com parceiros de confiança, muita criatividade e um atendimento personalizado. Cada cliente virava uma nova oportunidade de mostrar nosso potencial, e com o tempo, o boca a boca nos trouxe novos projetos e mais visibilidade.
            </p>
          </div>
          <div className={styles.imgContainer2}>

            <img
              src= {Trajetoria}
              alt='Foto da Logo 4e'
              style={{ maxWidth: '300px', width: '50%' }}
            ></img>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}