import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Perfil.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import axios from "axios";

export default function Perfil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Carrega os dados do usuário ao montar o componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/paginaLogin");
          return;
        }

        const response = await axios.get("http://localhost:3000/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUserData(response.data.user);
          setFormData(response.data.user);
        } else {
          setError(response.data.message || "Erro ao carregar perfil");
        }
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/paginaLogin");
        } else {
          setError("Erro ao carregar dados do usuário");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/perfil",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setUserData(response.data.user);
        setSuccessMessage("Perfil atualizado com sucesso!");
        setEditMode(false);
      } else {
        setError(response.data.message || "Erro ao atualizar perfil");
      }
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/paginaLogin");
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.loading}>Carregando...</div>
        <Footer />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.errorContainer}>
          <p>{error || "Usuário não encontrado"}</p>
          <button onClick={() => navigate("/paginaLogin")}>Fazer Login</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.mainContent}>
        <section className={styles.profileSection}>
          <div className={styles.profileHeader}>
            <h1>Meu Perfil</h1>
            <div className={styles.profileActions}>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className={styles.editButton}
                >
                  Editar Perfil
                </button>
              )}
              <button onClick={handleLogout} className={styles.logoutButton}>
                Sair
              </button>
            </div>
          </div>

          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}
          {error && <div className={styles.errorMessage}>{error}</div>}

          {editMode ? (
            <form onSubmit={handleSubmit} className={styles.profileForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome completo</label>
                  <input
                    type="text"
                    id="nome"
                    value={formData.nome || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="cpf">CPF</label>
                  <input
                    type="text"
                    id="cpf"
                    value={formData.cpf || ""}
                    onChange={handleChange}
                    disabled
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="tel"
                    id="telefone"
                    value={formData.telefone || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="dataNascimento">Data de Nascimento</label>
                  <input
                    type="date"
                    id="dataNascimento"
                    value={formData.dataNascimento || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="genero">Gênero</label>
                  <select
                    id="genero"
                    value={formData.genero || ""}
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
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="endereco">Endereço</label>
                <input
                  type="text"
                  id="endereco"
                  value={formData.endereco || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    value={formData.cidade || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cep">CEP</label>
                  <input
                    type="text"
                    id="cep"
                    value={formData.cep || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setFormData(userData);
                  }}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.profileInfo}>
              <div className={styles.infoRow}>
                <div className={styles.infoGroup}>
                  <h3>Nome</h3>
                  <p>{userData.nome}</p>
                </div>
                <div className={styles.infoGroup}>
                  <h3>E-mail</h3>
                  <p>{userData.email}</p>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoGroup}>
                  <h3>CPF</h3>
                  <p>{userData.cpf}</p>
                </div>
                <div className={styles.infoGroup}>
                  <h3>Telefone</h3>
                  <p>{userData.telefone}</p>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoGroup}>
                  <h3>Data de Nascimento</h3>
                  <p>
                    {new Date(userData.dataNascimento).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>
                <div className={styles.infoGroup}>
                  <h3>Gênero</h3>
                  <p>{userData.genero}</p>
                </div>
              </div>

              <div className={styles.infoGroup}>
                <h3>Endereço</h3>
                <p>{userData.endereco}</p>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoGroup}>
                  <h3>Cidade</h3>
                  <p>{userData.cidade}</p>
                </div>
                <div className={styles.infoGroup}>
                  <h3>CEP</h3>
                  <p>{userData.cep}</p>
                </div>
              </div>
            </div>
          )}

          <section className={styles.eventsSection}>
            <h2>Meus Eventos</h2>
            <div className={styles.eventsList}>
              {/* Aqui viria a lista de eventos do usuário */}
              <p className={styles.emptyMessage}>
                Você ainda não participou de nenhum evento.
              </p>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}