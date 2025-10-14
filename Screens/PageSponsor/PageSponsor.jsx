// PageSponsor.jsx
import React from "react";
import styles from "./PageSponsor.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import logoPreta from "@images/logos/4ePreto.svg";
import { useNavigate } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
  FaPinterestP,
  FaSnapchatGhost,
  FaTelegramPlane,
} from "react-icons/fa";

export default function PageSponsor() {
  const navigate = useNavigate();
  
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
    { id: 11, name: "Dell", image: logoPreta, alt: "Dell Logo" },
  ];

  const navigateToContact = () => {
    navigate('/contact');
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <div className={styles.mainContainer}>
        <div className={styles.leftContent}>
          <div className={styles.contentWrapper}>
            <h1>Quer se juntar a este <span className={styles.highlight}>grande evento</span>?</h1>
            <h2>Faça parte da nossa rede de patrocinadores e alcance um público qualificado</h2>
            
            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                Entre em contato para explorar oportunidades exclusivas de parceria e visibilidade para sua marca. 
                Oferecemos diferentes níveis de patrocínio para atender às suas necessidades.
              </p>
              <button className={styles.ctaButton} onClick={navigateToContact}>
                Entrar em Contato
                <span className={styles.buttonArrow}>→</span>
              </button>
            </div>

            <div className={styles.socialContainer}>
              <p>Siga-nos nas redes sociais</p>
              <div className={styles.iconsGrid}>
                <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="YouTube"><FaYoutube /></a>
                <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
                <a href="#" aria-label="TikTok"><FaTiktok /></a>
                <a href="#" aria-label="Pinterest"><FaPinterestP /></a>
                <a href="#" aria-label="Snapchat"><FaSnapchatGhost /></a>
                <a href="#" aria-label="Telegram"><FaTelegramPlane /></a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.partnersSection}>
            <div className={styles.sectionHeader}>
              <h3>Nossos Parceiros</h3>
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
      </div>

      <Footer />
    </div>
  );
}