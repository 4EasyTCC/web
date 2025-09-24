import React from "react";
import styles from "./PageSponsor.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import logoPreta from "@images/logos/4ePreto.svg";

export default function PageSponsor() {
  const sponsorLogos = [
    { id: 1, name: "Microsoft", image: logoPreta, alt: "Microsoft Logo" },
    { id: 2, name: "Google", image: logoPreta, alt: "Google Logo" },
    { id: 3, name: "Apple", image: logoPreta, alt: "Apple Logo" },
    { id: 4, name: "Amazon", image: logoPreta, alt: "Amazon Logo" },
    { id: 5, name: "Facebook", image: logoPreta, alt: "Facebook Logo" },
    { id: 6, name: "Netflix", image: logoPreta, alt: "Netflix Logo" },
    { id: 7, name: "Spotify", image: logoPreta, alt: "Spotify Logo" },
    { id: 8, name: "Adobe", image: logoPreta, alt: "Adobe Logo" },
    { id: 9, name: "Intel", image: logoPreta, alt: "Intel Logo" },
    { id: 10, name: "Samsung", image: logoPreta, alt: "Samsung Logo" },
    { id: 11, name: "Dell", image: logoPreta, alt: "Samsung Logo" },
  ];

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.backgroundPattern}></div>

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.heroSection}>
            <h1 className={styles.mainTitle}>Quer se juntar a este grande evento?</h1>
            <p className={styles.subtitle}>Faça parte da nossa rede de patrocinadores e alcance um público qualificado</p>
          </div>
          
          <div className={styles.sponsorSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Torne-se um Patrocinador</h2>
              <div className={styles.divider}></div>
            </div>
            
            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                Entre em contato para explorar oportunidades exclusivas de parceria e visibilidade para sua marca. 
                Oferecemos diferentes níveis de patrocínio para atender às suas necessidades.
              </p>
              <button className={styles.ctaButton}>Entrar em Contato</button>
            </div>
          </div>
          
          <div className={styles.collaboratorsContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.collaboratorsTitle}>Nossos Parceiros</h3>
              <div className={styles.divider}></div>
            </div>
            <div className={styles.collaboratorsBox}>
              {sponsorLogos.map((logo) => (
                <div key={logo.id} className={styles.logoContainer}>
                  <div className={styles.logoImageContainer}>
                    <img src={logo.image} alt={logo.alt} className={styles.logoImage} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}