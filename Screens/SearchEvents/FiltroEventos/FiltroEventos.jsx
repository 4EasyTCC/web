import React, { useRef } from "react";
import styles from "./FiltroEventos.module.css";

const FiltroEventos = ({
  filtros = { categoria: [], preco: 'qualquer', tipo: 'qualquer' },
  onFiltroChange = () => {},
  onLimparFiltros = () => {},
}) => {
  const categorias = [
    "Arte, Cultura e Lazer",
    "Congressos e Palestras",
    "Esporte",
    "Festas e Shows",
    "Gastronomia",
    "Games e Geek",
    "Grátis",
    "Infantil",
    "Moda e Beleza",
    "Teatros e Espetáculos",
  ];



  const handleCategoriaChange = (categoria) => {
    const atual = Array.isArray(filtros.categoria) ? filtros.categoria : [];
    const set = new Set(atual);
    if (set.has(categoria)) set.delete(categoria);
    else set.add(categoria);

    // If the user toggles the special "Grátis" category, keep the preco filter in sync
    const novoArray = Array.from(set);
    if (categoria === "Grátis") {
      if (set.has("Grátis")) {
        // foi marcado -> garantir que preco esteja em 'gratis'
        onFiltroChange({ categoria: novoArray, preco: "gratis" });
      } else {
        // foi desmarcado -> só resetar preco se o preco atual for 'gratis'
        if (String(filtros.preco) === "gratis") {
          onFiltroChange({ categoria: novoArray, preco: "qualquer" });
        } else {
          onFiltroChange({ categoria: novoArray });
        }
      }
    } else {
      onFiltroChange({ categoria: novoArray });
    }
  };

  const handlePrecoChange = (preco) => {
    onFiltroChange({ preco: String(preco) });
  };

  const handleTipoChange = (tipo) => {
    onFiltroChange({ tipo: String(tipo) });
  };


  return (
    <div className={styles.filtroContainer}>
      <h3>Filtrar Eventos</h3>

      {/* Filtro por Categoria */}
      <div className={styles.filtroGrupo}>
        <h4>Categoria</h4>
        <div className={styles.checkboxGroup}>
          {categorias.map((categoria) => (
            <label key={categoria} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={Array.isArray(filtros.categoria) && filtros.categoria.includes(categoria)}
                onChange={() => handleCategoriaChange(categoria)}
                aria-label={`Filtrar por ${categoria}`}
              />
              <span className={styles.checkboxCustom}></span>
              {categoria}
            </label>
          ))}
        </div>
      </div>

      {/* Filtro por Preço */}
      <div className={styles.filtroGrupo}>
        <h4>Preço</h4>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="preco"
              value="qualquer"
              checked={String(filtros.preco) === "qualquer"}
              onChange={(e) => handlePrecoChange(e.target.value)}
            />
            <span className={styles.radioCustom}></span>
            Qualquer preço
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="preco"
              value="gratis"
              checked={String(filtros.preco) === "gratis"}
              onChange={(e) => handlePrecoChange(e.target.value)}
            />
            <span className={styles.radioCustom}></span>
            Grátis
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="preco"
              value="pago"
              checked={String(filtros.preco) === "pago"}
              onChange={(e) => handlePrecoChange(e.target.value)}
            />
            <span className={styles.radioCustom}></span>
            Pago
          </label>
        </div>
      </div>

      {/* Filtro por Tipo de Evento */}
      <div className={styles.filtroGrupo}>
        <h4>Tipo de Evento</h4>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="tipo"
              value="qualquer"
              checked={String(filtros.tipo) === "qualquer"}
              onChange={(e) => handleTipoChange(e.target.value)}
            />
            <span className={styles.radioCustom}></span>
            Qualquer tipo
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="tipo"
              value="presencial"
              checked={String(filtros.tipo) === "presencial"}
              onChange={(e) => handleTipoChange(e.target.value)}
            />
            <span className={styles.radioCustom}></span>
            Presencial
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="tipo"
              value="online"
              checked={String(filtros.tipo) === "online"}
              onChange={(e) => handleTipoChange(e.target.value)}
            />
            <span className={styles.radioCustom}></span>
            Online
          </label>
        </div>
      </div>

      <button
        type="button"
        className={styles.limparBtn}
        onClick={onLimparFiltros}
        aria-label="Limpar todos os filtros"
      >
        Limpar Filtros
      </button>
    </div>
  );
};

export default FiltroEventos;
