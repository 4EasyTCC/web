import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PaginaLogin.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import logoBranca from "@images/logos/Logo4eBranco.png";
import axios from "axios";

export default function PaginaLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !senha) {
      setError("Preencha e-mail e senha");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/login/convidado",
        {
          email,
          senha,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.convidado));
        navigate("/home");
      } else {
        setError(response.data.message || "Erro ao fazer login");
      }
    } catch (err) {
      console.error("Erro completo:", {
        error: err,
        response: err.response,
      });

      if (err.response) {
        setError(
          err.response.data?.message ||
            `Erro ${err.response.status}: ${err.response.statusText}`
        );
      } else if (err.request) {
        setError("Servidor não respondeu. Verifique sua conexão.");
      } else {
        setError("Erro ao configurar a requisição: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const irParaCadastro = () => {
    navigate("/pageCadastro");
  };

  return (
    <div className={styles.pageContainer}>
      <Header />

      <div className={styles.mainContent}>
        <div className={styles.loginWrapper}>
          <div className={styles.logoSide}>
            <img
              src={logoBranca}
              alt="Logo da Empresa"
              className={styles.logoImage}
            />
          </div>

          <div className={styles.loginContainer}>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail*</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Senha*</label>
                <input
                  type="password"
                  id="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              {error && <div className={styles.errorMessage}>{error}</div>}

              <button
                type="submit"
                className={styles.loginButton}
                disabled={loading}
              >
                {loading ? "Carregando..." : "Entrar"}
              </button>

              <div className={styles.registerContainer}>
                <span>Não tem conta? </span>
                <button
                  type="button"
                  onClick={irParaCadastro}
                  className={styles.registerLink}
                >
                  Cadastre-se
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
