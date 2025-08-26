import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Contact.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
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

export default function Contact() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    documento: "",
    proposta: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const navigateTo = (path) => {
    navigate(path);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Dados do formulário:", formData);
    alert("Proposta enviada com sucesso!");
    setIsSubmitting(false);
    
    // Reset do formulário após envio
    setFormData({
      nome: "",
      email: "",
      documento: "",
      proposta: "",
    });
  };

  return (
    <>
      <Header />
      <div className={styles.pageContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.leftContent}>
            <div className={styles.contentWrapper}>
              <h1>Vamos falar de <span className={styles.highlight}>negócios</span>?</h1>
              <h2>Conte-nos sobre sua proposta e descubra como podemos crescer juntos.</h2>
              
              <button 
                className={styles.ctaButton}
                onClick={() => navigateTo('/PageSponsor')}
              >
                Seja um parceiro
                <span className={styles.buttonArrow}>→</span>
              </button>

              <div className={styles.socialContainer}>
                <p>Conecte-se conosco</p>
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
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <h3>Entre em contato</h3>
              <p className={styles.formSubtitle}>Preencha os dados abaixo e retornaremos em breve</p>
              
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome completo*"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Endereço de e-mail*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="documento"
                  placeholder="CPF ou CNPJ*"
                  value={formData.documento}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="proposta"
                  placeholder="Descreva sua proposta com detalhes*"
                  value={formData.proposta}
                  onChange={handleChange}
                  required
                />
              </div>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={styles.spinner}></span>
                ) : (
                  'Enviar proposta'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}