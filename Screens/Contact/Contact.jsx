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
  })
  const navigate = useNavigate();
  
    const navigateTo = (path) => {
      navigate(path);
      onClose();

  } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    alert("Proposta enviada com sucesso!");
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.backgroundPattern}></div>

      <main>
        <div className={styles.leftContent}>
          <h1>Vamos falar de negócios?</h1>
          <h2>Diga-nos a sua proposta.</h2>
          <button onClick={() => navigateTo('/PageSponsor')}>Vamos crescer juntos!</button>

          <div className={styles.socialContainer}>
            <p>Nossas redes sociais:</p>
            <div className={styles.iconsGrid}>
              <FaFacebookF />
              <FaInstagram />
              <FaLinkedinIn />
              <FaTwitter />
              <FaYoutube />
              <FaWhatsapp />
              <FaTiktok />
              <FaPinterestP />
              <FaSnapchatGhost />
              <FaTelegramPlane />
            </div>
          </div>
        </div>

        <form className={styles.rightForm} onSubmit={handleSubmit}>
          <h3>Contate-nos</h3>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="nome"
              placeholder="Nome completo*"
              value={formData.nome}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Endereço de e-mail*"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="documento"
              placeholder="CPF ou CPNJ*"
              value={formData.documento}
              onChange={handleChange}
            />
            <textarea
              name="proposta"
              placeholder="Diga-nos sobre a sua proposta:"
              value={formData.proposta}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
