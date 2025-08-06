import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageCadastro.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import logoBranca from "@images/logos/Logo4eBranco.png";
import axios from "axios";

export default function PageCadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    telefone: "",
    genero: "",
    dataNascimento: "",
    endereco: "",
    cidade: "",
    cep: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const voltar = () => {
    navigate("/paginaLogin");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    let formattedValue = value;

    if (id === "cpf") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .substring(0, 14);
    } else if (id === "telefone") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 15);
    } else if (id === "cep") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{5})(\d)/, "$1-$2")
        .substring(0, 9);
    } else {
      formattedValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [id]: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.cpf || !formData.email || !formData.senha) {
      setError("Preencha todos os campos obrigatórios");
      setLoading(false);
      return;
    }

    try {
      const dadosParaEnviar = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ""),
        telefone: formData.telefone.replace(/\D/g, ""),
        cep: formData.cep.replace(/\D/g, ""),
      };

      console.log("Dados sendo enviados:", dadosParaEnviar);

      const response = await axios.post(
        "http://localhost:3000/cadastro/convidado",
        dadosParaEnviar,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        navigate("/paginaLogin");
      } else {
        setError(response.data.message || "Erro no cadastro");
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);

      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.message || "Dados inválidos");
        } else if (err.response.status === 500) {
          setError("Erro no servidor. Tente novamente mais tarde.");
        } else {
          setError(err.response.data.message || "Erro ao cadastrar");
        }
      } else if (err.request) {
        setError("Sem resposta do servidor. Verifique sua conexão.");
      } else {
        setError("Erro ao configurar a requisição");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.pageContainer}>
      <Header />

      <div className={styles.mainContent}>
        <div className={styles.cadastroWrapper}>
          <div className={styles.logoSide}>
            <img
              src={logoBranca}
              alt="Logo da Empresa"
              className={styles.logoImage}
            />
          </div>

          <div className={styles.cadastroContainer}>
            <h1>Cadastro</h1>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome completo*</label>
                <input
                  type="text"
                  id="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="cpf">CPF*</label>
                  <input
                    type="text"
                    id="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                    maxLength="14"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">E-mail*</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="senha">Senha*</label>
                  <input
                    type="password"
                    id="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    minLength="6"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="telefone">Telefone*</label>
                  <input
                    type="tel"
                    id="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    maxLength="15"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="genero">Gênero*</label>
                  <select
                    id="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                    <option value="Prefiro não informar">
                      Prefiro não informar
                    </option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="dataNascimento">Data de Nascimento*</label>
                  <input
                    type="date"
                    id="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="endereco">Endereço*</label>
                <input
                  type="text"
                  id="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="cidade">Cidade*</label>
                  <input
                    type="text"
                    id="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cep">CEP*</label>
                  <input
                    type="text"
                    id="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    placeholder="00000-000"
                    maxLength="9"
                    required
                  />
                </div>
              </div>

              {error && <div className={styles.errorMessage}>{error}</div>}

              <button
                type="submit"
                className={styles.cadastroButton}
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>

              <div className={styles.loginContainer}>
                <span>Já tem conta? </span>
                <button
                  type="button"
                  onClick={voltar}
                  className={styles.loginLink}
                >
                  Faça login
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
