import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Select from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import styles from "./Home.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CarouselColecao from "./CarouselColecao.jsx"
import CategoryCarousel from "@/components/CategoryCarousel/CategoryCarousel";
import HeroCarousel from "@/components/HeroCarousel/HeroCarousel";
import cellphone from "@images/placeholders/cellphone.png";
import cellphone4easy from "@images/placeholders/cellPhone4easy.png";
import money from "@images/placeholders/money.png";

// Função para buscar eventos da home
const fetchHomeEvents = async (periodo, categoria) => {
  const queryParams = new URLSearchParams();
  queryParams.append("limite", 16);
  if (periodo) queryParams.append("periodo", periodo);
  if (categoria) queryParams.append("categoria", categoria);

  try {
    const response = await fetch(
      `http://localhost:3000/api/eventos/home?${queryParams}`
    );
    if (!response.ok) {
      throw new Error("Falha ao carregar eventos da home.");
    }
    const data = await response.json();
    return data.eventos;
  } catch (error) {
    console.error("Erro ao buscar eventos para a home:", error);
    return [];
  }
};

export default function Home() {
  const navigate = useNavigate();
  const [periodoSelecionado, setPeriodoSelecionado] = useState("hoje");

  const opcoesPeriodo = [
    { valor: "hoje", label: "Hoje" },
    { valor: "amanha", label: "Amanhã" },
    { valor: "esta-semana", label: "Esta semana" },
    { valor: "proxima-semana", label: "Próxima semana" },
    { valor: "este-mes", label: "Este mês" },
  ];

  const [eventosDoPeriodo, setEventosDoPeriodo] = useState([]);

  useEffect(() => {
    const carregarEventos = async () => {
      const eventos = await fetchHomeEvents(periodoSelecionado, null);
      setEventosDoPeriodo(eventos);
    };
    carregarEventos();
  }, [periodoSelecionado]);

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.mainContent}>
        {/* Hero Carousel */}
        <section className={styles.eventsSection}>
          <HeroCarousel />
        </section>

        <div className={styles.contentWithBackground}>
        
            <CarouselColecao/>
          {/* Carousels por categoria */}
          {[
            { nome: "Esporte", valor: "Esporte" },
            { nome: "Festas e Shows", valor: "Festas e Shows" },
            { nome: "Gastronomia", valor: "Gastronomia" },
            { nome: "Games e Geek", valor: "Games e Geek" },
            { nome: "Infantil", valor: "Infantil" },
            { nome: "Moda e Beleza", valor: "Moda e Beleza" },
            { nome: "Passeios e Tours", valor: "Passeios e Tours" },
            {
              nome: "Religião e Espiritualidade",
              valor: "Religião e Espiritualidade",
            },
            { nome: "Teatros e Espetáculos", valor: "Teatros e Espetáculos" },
          ].map((categoria) => (
            <div key={categoria.valor} className={styles.carouselWrapper}>
              <CategoryCarousel
                title={categoria.nome}
                filterType="categoria"
                filterValue={categoria.valor}
              />
            </div>
          ))}

          <section className={styles.featureSection}>
            <div className={styles.featureContent}>
              <h1 className={styles.mainTitle}>
                Seu evento, do jeito que você imagina
              </h1>
              <h2 className={styles.subTitle}>Baixe o app e crie</h2>

              <div className={styles.featureBoxes}>
                <div className={styles.featureBox}>
                  <div className={styles.iconWrapper}>
                    <img
                      src={cellphone}
                      alt="Ícone de celular"
                      className={styles.featureIcon}
                    />
                  </div>
                  <p className={styles.featureText}>
                    Com apenas{" "}
                    <span className={styles.highlight}>alguns cliques</span>
                  </p>
                </div>

                <div className={styles.featureBox}>
                  <div className={styles.iconWrapper}>
                    <img
                      src={money}
                      alt="Ícone de dinheiro"
                      className={styles.featureIcon}
                    />
                  </div>
                  <p className={styles.featureText}>
                    Crie seu evento{" "}
                    <span className={styles.highlight}>gratuitamente!</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.featureImageContainer}>
              <img
                src={cellphone4easy}
                alt="App no celular"
                className={styles.featurePhone}
              />

              <div className={styles.actionButtons}>
                <button
                  onClick={() => navigate("/AboutUs")}
                  className={styles.primaryButton}
                >
                  Sobre nós
                </button>
                <button
                  onClick={() => navigate("/InfoPage")}
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