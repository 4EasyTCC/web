import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function Profile() {
  const [perfil, setPerfil] = useState(null);
  const [aba, setAba] = useState("ultimoMes");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/perfil/convidado", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPerfil(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!perfil) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.pageContainer}>
      <Header />

      <div className={styles.profileContainer}>
        {/* Cabeçalho do Perfil */}
        <div className={styles.header}>
          <img
            src={perfil.convidado.avatarUrl || "/default-avatar.png"}
            alt="Foto de perfil"
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <h2>{perfil.convidado.nome}</h2>
            <p>{perfil.convidado.sobreMim || "Sem descrição disponível"}</p>
          </div>
        </div>

        {/* Área pessoal */}
        <div className={styles.card}>
          <h3>Área Pessoal</h3>

          <div className={styles.favSection}>
            <p className={styles.sectionTitle}>Eventos Favoritos</p>
            <div className={styles.grid}>
              {perfil.eventosFavoritos.map((e, i) => (
                <div key={i} className={styles.circle}></div>
              ))}
            </div>
          </div>

          <div className={styles.favSection}>
            <p className={styles.sectionTitle}>Profissionais Favoritos</p>
            <div className={styles.grid}>
              {perfil.profissoesFavoritas.map((p, i) => (
                <div key={i} className={styles.circle}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            onClick={() => setAba("ultimoMes")}
            className={aba === "ultimoMes" ? styles.active : ""}
          >
            Último Mês
          </button>
          <button
            onClick={() => setAba("geral")}
            className={aba === "geral" ? styles.active : ""}
          >
            Geral
          </button>
        </div>

        {/* Estatísticas */}
        <div className={styles.card}>
          <h3>Estatísticas</h3>
          <div className={styles.stats}>
            <div>👥 Amigos: <span>{perfil.estatisticas.amigos}</span></div>
            <div>🎟️ Eventos: <span>{perfil.estatisticas.eventos}</span></div>
            <div>📩 Notificações: <span>{perfil.estatisticas.notificacoes}</span></div>
            <div>⭐ Avaliações: <span>{perfil.estatisticas.avaliacoes}</span></div>
            <div>🏆 Categoria mais frequente: <span>{perfil.estatisticas.categoriaMaisFrequente}</span></div>
            <div>📍 Local mais visitado: <span>{perfil.estatisticas.localMaisVisitado}</span></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
