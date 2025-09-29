// ATUALIZAR Profile.jsx - Adicionar sincronização com localStorage
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function Profile() {
  const [perfil, setPerfil] = useState(null);
  const [aba, setAba] = useState("ultimoMes");
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ nome: "", sobreMim: "" });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/perfil/convidado", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPerfil(res.data);
      setFormData({
        nome: res.data.convidado.nome,
        sobreMim: res.data.convidado.sobreMim || ""
      });
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      setErro("Erro ao carregar perfil");
    }
  };

  // Função para atualizar o localStorage e notificar outros componentes
  const atualizarUsuarioLocalStorage = (novosDados) => {
    const usuarioAtual = JSON.parse(localStorage.getItem("user") || "{}");
    const usuarioAtualizado = { ...usuarioAtual, ...novosDados };
    localStorage.setItem("user", JSON.stringify(usuarioAtualizado));
    
    // Disparar evento personalizado para notificar outros componentes
    window.dispatchEvent(new CustomEvent("usuarioAtualizado", {
      detail: usuarioAtualizado
    }));
  };

  const handleSalvarPerfil = async () => {
    const token = localStorage.getItem("token");
    setCarregando(true);
    setErro("");
    
    try {
      const res = await axios.put(
        "http://localhost:3000/perfil/convidado",
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      console.log("Resposta da API:", res.data);

      if (res.data.success) {
        // Atualizar estado local
        setPerfil(prev => ({
          ...prev,
          convidado: res.data.convidado
        }));
        
        // Atualizar localStorage
        atualizarUsuarioLocalStorage({
          nome: res.data.convidado.nome,
          sobreMim: res.data.convidado.sobreMim,
          avatarUrl: res.data.convidado.avatarUrl
        });
        
        setEditando(false);
        setErro("");
      } else {
        setErro(res.data.message || "Erro ao atualizar perfil");
      }
    } catch (err) {
      console.error("Erro completo ao atualizar perfil:", err);
      if (err.response?.data?.message) {
        setErro(err.response.data.message);
      } else if (err.message) {
        setErro(err.message);
      } else {
        setErro("Erro ao atualizar perfil");
      }
    } finally {
      setCarregando(false);
    }
  };

  const handleUploadFoto = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setErro("Por favor, selecione uma imagem válida");
      return;
    }

    // Validar tamanho do arquivo (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErro("A imagem deve ter menos de 5MB");
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("avatar", file);

    const token = localStorage.getItem("token");
    setCarregando(true);
    setErro("");

    try {
      const res = await axios.put(
        "http://localhost:3000/perfil/convidado/foto",
        uploadFormData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Resposta do upload:", res.data);

      if (res.data.success) {
        // Atualizar estado local
        setPerfil(prev => ({
          ...prev,
          convidado: {
            ...prev.convidado,
            avatarUrl: res.data.avatarUrl
          }
        }));
        
        // Atualizar localStorage
        atualizarUsuarioLocalStorage({
          avatarUrl: res.data.avatarUrl
        });
        
        setErro("");
      } else {
        setErro(res.data.message || "Erro ao atualizar foto");
      }
    } catch (err) {
      console.error("Erro completo no upload:", err);
      if (err.response?.data?.message) {
        setErro(err.response.data.message);
      } else if (err.message) {
        setErro(err.message);
      } else {
        setErro("Erro ao fazer upload da foto");
      }
    } finally {
      setCarregando(false);
    }
  };

  if (!perfil) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.pageContainer}>
      <Header />

      <div className={styles.profileContainer}>
        {/* Mensagem de erro */}
        {erro && (
          <div className={styles.erroMensagem}>
            {erro}
            <button 
              onClick={() => setErro("")} 
              className={styles.fecharErro}
            >
              ×
            </button>
          </div>
        )}

        {/* Mensagem de sucesso */}
        {!erro && carregando && (
          <div className={styles.sucessoMensagem}>
            {editando ? "Salvando alterações..." : "Atualizando foto..."}
          </div>
        )}

        {/* Cabeçalho do Perfil */}
        <div className={styles.header}>
          <div className={styles.avatarContainer}>
            <img
              src={perfil.convidado.avatarUrl || "/default-avatar.png"}
              alt="Foto de perfil"
              className={styles.avatar}
              key={perfil.convidado.avatarUrl} // Forçar re-render quando a URL mudar
            />
            <input
              type="file"
              id="fotoPerfil"
              accept="image/*"
              onChange={handleUploadFoto}
              style={{ display: 'none' }}
              disabled={carregando}
            />
            <label 
              htmlFor="fotoPerfil" 
              className={`${styles.uploadLabel} ${carregando ? styles.disabled : ''}`}
            >
              {carregando ? "📸 Enviando..." : "📷 Alterar Foto"}
            </label>
          </div>
          
          <div className={styles.userInfo}>
            {editando ? (
              <>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  className={styles.editInput}
                  placeholder="Seu nome"
                  disabled={carregando}
                />
                <textarea
                  value={formData.sobreMim}
                  onChange={(e) => setFormData(prev => ({ ...prev, sobreMim: e.target.value }))}
                  className={styles.editTextarea}
                  placeholder="Fale um pouco sobre você..."
                  rows="3"
                  disabled={carregando}
                />
                <div className={styles.editButtons}>
                  <button 
                    onClick={handleSalvarPerfil} 
                    disabled={carregando || !formData.nome.trim()}
                    className={styles.saveButton}
                  >
                    {carregando ? "Salvando..." : "Salvar"}
                  </button>
                  <button 
                    onClick={() => {
                      setEditando(false);
                      setErro("");
                      // Restaurar valores originais
                      setFormData({
                        nome: perfil.convidado.nome,
                        sobreMim: perfil.convidado.sobreMim || ""
                      });
                    }}
                    disabled={carregando}
                    className={styles.cancelButton}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>{perfil.convidado.nome}</h2>
                <p>{perfil.convidado.sobreMim || "Sem descrição disponível"}</p>
                <button 
                  onClick={() => setEditando(true)}
                  className={styles.editButton}
                >
                  ✏️ Editar Perfil
                </button>
              </>
            )}
          </div>
        </div>

        {/* Restante do código permanece igual */}
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