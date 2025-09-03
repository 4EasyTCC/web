// Home.jsx
import React, { useState } from "react";
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
import CategoryCarousel from "@/components/CategoryCarousel/CategoryCarousel";
import HeroCarousel from "@/components/HeroCarousel/HeroCarousel";
import cellphone from "@images/placeholders/cellphone.png";
import cellphone4easy from "@images/placeholders/cellPhone4easy.png";
import money from "@images/placeholders/money.png";

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

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.mainContent}>
        {/* Hero Carousel */}
        <section className={styles.eventsSection}>
          <HeroCarousel />
        </section>

        <div className={styles.contentWithBackground}>
          {/* Carousel O que fazer hoje/esta semana */}
          <div className={styles.carouselSection}>
            <div className={styles.carouselHeader}>
              <h2>O que fazer</h2>
              <Select.Root
                value={periodoSelecionado}
                onValueChange={setPeriodoSelecionado}
              >
                <Select.Trigger
                  className={styles.periodoDropdown}
                  aria-label="Selecionar período"
                >
                  <Select.Value>
                    {
                      opcoesPeriodo.find(
                        (op) => op.valor === periodoSelecionado
                      )?.label
                    }
                  </Select.Value>
                  <Select.Icon>
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className={styles.periodoOptions}>
                    <Select.ScrollUpButton className={styles.periodoOption}>
                      <ChevronUpIcon />
                    </Select.ScrollUpButton>

                    <Select.Viewport>
                      {opcoesPeriodo.map((opcao) => (
                        <Select.Item
                          key={opcao.valor}
                          value={opcao.valor}
                          className={styles.periodoOption}
                        >
                          <Select.ItemText>{opcao.label}</Select.ItemText>
                          <Select.ItemIndicator>
                            <CheckIcon />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>

                    <Select.ScrollDownButton className={styles.periodoOption}>
                      <ChevronDownIcon />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>

          <CategoryCarousel
            title=""
            filterType="periodo"
            filterValue={periodoSelecionado}
          />

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
