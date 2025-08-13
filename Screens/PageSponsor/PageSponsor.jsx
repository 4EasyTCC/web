import React from "react";
import styles from "./PageSponsor.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function PageSponsor() {
  // Exemplo com 8 logos (3 na segunda linha)
  const sponsorLogos = [
    { id: 1, name: "Logo 1" },
    { id: 2, name: "Logo 2" },
    { id: 3, name: "Logo 3" },
    { id: 4, name: "Logo 4" },
    { id: 5, name: "Logo 5" },
    { id: 6, name: "Logo 6" },
    { id: 7, name: "Logo 7" },
    { id: 8, name: "Logo 8" },
    { id: 9, name: "Logo 9" },
    { id: 10, name: "Logo 10" }
  ];

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.backgroundPattern}></div>

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.mainTitle}>Quer se juntar a este grande evento?</h1>
          
          <div className={styles.sponsorSection}>
            <h2 className={styles.sectionTitle}>Torne-se um Patrocinador</h2>
            <div className={styles.divider}></div>
            
            <div className={styles.infoBox}>
              <p className={styles.infoText}>Entre em contato para explorar oportunidades exclusivas de parceria e visibilidade para sua marca.</p>
            </div>
          </div>
          
          <div className={styles.collaboratorsContainer}>
            <h3 className={styles.collaboratorsTitle}>Nossos Parceiros</h3>
            <div className={styles.collaboratorsBox}>
              {sponsorLogos.map((logo) => (
                <div key={logo.id} className={styles.logoContainer}>
                  <div className={styles.logoImageContainer}>
  <img src={logo.image} alt={logo.alt} />
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