// Profile.jsx - PÁGINA PRINCIPAL ATUALIZADA
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import styles from "./Profile.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";
import EditProfileModal from "@/components/Profile/EditProfileModal/EditProfileModal";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import AboutTab from "@/components/Profile/AboutTab";
import StatisticsTab from "@/components/Profile/StatisticsTab";
import PreferencesTab from "@/components/Profile/PreferencesTab";
import ActivityTab from "@/components/Profile/ActivityTab";

export default function Profile() {
  const [perfil, setPerfil] = useState(null);
  const [activeTab, setActiveTab] = useState('sobre');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    carregarPerfil();
  }, []);

  const location = useLocation();

  useEffect(() => {
    // Preferir state de navegação quando disponível (e.g. navigate('/profile', { state: { tab: 'preferencias' } }))
    try {
      if (location && location.state && location.state.tab) {
        setActiveTab(location.state.tab);
        return;
      }

      // Fallback: se a URL for /profile/evento ou contiver esse segmento, abrir Preferências
      const pathnames = location.pathname.split('/').filter(Boolean);
      if (pathnames[0] === 'profile' && pathnames[1] === 'evento') {
        setActiveTab('preferencias');
      }
    } catch (e) {
      // ignore
    }
  }, [location]);
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const countEl = document.getElementById('cart-count');
        if (countEl) countEl.textContent = cart.reduce((s, it) => s + (it.quantidade || 0), 0);
      } catch (e) {
        // ignore
      }
    };

    updateCartCount();
    window.addEventListener('cartChanged', updateCartCount);
    return () => window.removeEventListener('cartChanged', updateCartCount);
  }, []);

  const garantirUrlCompleta = (avatarUrl) => {
    if (!avatarUrl) return null;
    if (avatarUrl.startsWith('http')) return avatarUrl;
    return `http://localhost:3000${avatarUrl}`;
  };

  const adicionarTimestamp = (url) => {
    if (!url) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}t=${new Date().getTime()}`;
  };

  const carregarPerfil = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/perfil/convidado", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const perfilComAvatarCorrigido = {
        ...res.data,
        convidado: {
          ...res.data.convidado,
          avatarUrl: res.data.convidado.avatarUrl 
            ? garantirUrlCompleta(res.data.convidado.avatarUrl)
            : null
        }
      };
      
      setPerfil(perfilComAvatarCorrigido);
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      setErro("Erro ao carregar perfil");
    }
  };

  const atualizarUsuarioLocalStorage = (novosDados) => {
    const usuarioAtual = JSON.parse(localStorage.getItem("user") || "{}");
    const usuarioAtualizado = { 
      ...usuarioAtual, 
      ...novosDados
    };
    
    localStorage.setItem("user", JSON.stringify(usuarioAtualizado));
    
    window.dispatchEvent(new CustomEvent("usuarioAtualizado", {
      detail: usuarioAtualizado
    }));

    if (novosDados.avatarUrl) {
      window.dispatchEvent(new CustomEvent("avatarAtualizado", {
        detail: { avatarUrl: novosDados.avatarUrl }
      }));
    }
  };

  const handleSalvarPerfil = async (formData) => {
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

      if (res.data.success) {
        const avatarUrlCompleta = res.data.convidado.avatarUrl 
          ? garantirUrlCompleta(res.data.convidado.avatarUrl)
          : null;

        setPerfil(prev => ({
          ...prev,
          convidado: {
            ...res.data.convidado,
            avatarUrl: avatarUrlCompleta
          }
        }));
        
        atualizarUsuarioLocalStorage({
          ...res.data.convidado,
          avatarUrl: res.data.convidado.avatarUrl
        });
        
        setEditModalOpen(false);
        setSucesso("Perfil atualizado com sucesso!");
        setTimeout(() => setSucesso(""), 3000);
      } else {
        setErro(res.data.message || "Erro ao atualizar perfil");
      }
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setErro(err.response?.data?.message || err.message || "Erro ao atualizar perfil");
    } finally {
      setCarregando(false);
    }
  };

  const handleUploadFoto = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErro("Por favor, selecione uma imagem válida");
      return;
    }

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

      if (res.data.success) {
        const avatarUrlCompleta = garantirUrlCompleta(res.data.avatarUrl);
        const avatarUrlComTimestamp = adicionarTimestamp(avatarUrlCompleta);

        setPerfil(prev => ({
          ...prev,
          convidado: {
            ...prev.convidado,
            avatarUrl: avatarUrlComTimestamp
          }
        }));
        
        atualizarUsuarioLocalStorage({
          ...res.data.convidado,
          avatarUrl: res.data.avatarUrl
        });
        
        setSucesso("Foto atualizada com sucesso!");
        setTimeout(() => setSucesso(""), 3000);
      } else {
        setErro(res.data.message || "Erro ao atualizar foto");
      }
    } catch (err) {
      console.error("Erro no upload:", err);
      setErro(err.response?.data?.message || err.message || "Erro ao fazer upload da foto");
    } finally {
      setCarregando(false);
      event.target.value = '';
    }
  };

  const renderTabContent = () => {
    if (!perfil) return null;

    switch (activeTab) {
      case 'sobre':
        return <AboutTab perfil={perfil} onEdit={() => setEditModalOpen(true)} />;
      case 'estatisticas':
        return <StatisticsTab estatisticas={perfil.estatisticas} />;
      case 'preferencias':
        return <PreferencesTab 
          eventosFavoritos={perfil.eventosFavoritos} 
          profissoesFavoritas={perfil.profissoesFavoritas} 
        />;
      case 'atividade':
        return <ActivityTab />;
      default:
        return <AboutTab perfil={perfil} onEdit={() => setEditModalOpen(true)} />;
    }
  };

  if (!perfil) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.pageContainer}>
      <Header />

      <div className={styles.profileContainer}>
        {/* Mini-carrinho removido daqui para manter apenas o carrinho no header */}
        {/* Mensagens de feedback */}
        {erro && (
          <div className={styles.erroMensagem}>
            {erro}
            <button onClick={() => setErro("")} className={styles.fecharErro}>×</button>
          </div>
        )}

        {sucesso && (
          <div className={styles.sucessoMensagem}>
            {sucesso}
            <button onClick={() => setSucesso("")} className={styles.fecharSucesso}>×</button>
          </div>
        )}

        {/* Cabeçalho do Perfil */}
        <ProfileHeader 
          perfil={perfil} 
          onUploadFoto={handleUploadFoto} 
          carregando={carregando} 
        />

        {/* Abas de Navegação */}
        <ProfileTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          stats={perfil.estatisticas} 
        />

        {/* Conteúdo das Abas */}
        <div className={styles.tabContent}>
          {renderTabContent()}
        </div>

        {/* Modal de Edição */}
        <EditProfileModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          userData={perfil.convidado}
          onSave={handleSalvarPerfil}
          carregando={carregando}
        />
      </div>

      <Footer />
    </div>
  );
}