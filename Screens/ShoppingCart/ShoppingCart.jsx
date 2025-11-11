import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShoppingCart.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  const remover = (ingressoId) => {
    const next = cart.filter(c => c.ingressoId !== ingressoId);
    setCart(next);
    localStorage.setItem('cart', JSON.stringify(next));
    window.dispatchEvent(new Event('cartChanged'));
  };

  const atualizarQuantidade = (ingressoId, quantidade) => {
    const q = Math.max(1, parseInt(quantidade || 1, 10));
    const next = cart.map(c => c.ingressoId === ingressoId ? { ...c, quantidade: q } : c);
    setCart(next);
    localStorage.setItem('cart', JSON.stringify(next));
    window.dispatchEvent(new Event('cartChanged'));
  };

  const confirmarCompra = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Faça login para confirmar a compra');
      navigate('/paginaLogin');
      return;
    }

    if (cart.length === 0) {
      alert('Carrinho vazio');
      return;
    }

    setLoading(true);
    try {
      for (const item of cart) {
        const resp = await fetch(`http://localhost:3000/participar/evento/${item.ingressoId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantidade: item.quantidade || 1 }),
        });

        if (!resp.ok) {
          const b = await resp.json().catch(() => ({}));
          throw new Error(b.message || 'Erro ao processar compra');
        }

        const body = await resp.json().catch(() => ({}));

        // Se o backend retornou um registro de compra, usamos ele; senão, mantemos fallback mínimo
        const compraData = body.participacao?.compra || null;

        // Notificar que houve compra para atualizar ActivityTab via evento
        window.dispatchEvent(new CustomEvent('purchaseRecorded', {
          detail: {
            eventoId: item.ingresso?.eventoId || body.eventoId || null,
            ingressoId: item.ingressoId,
            nome: item.nome,
            quantidade: item.quantidade || 1,
            preco: item.preco,
            compradoEm: compraData ? compraData.createdAt : new Date().toISOString(),
          }
        }));

        try {
          const eventoId = body.eventoId || item.ingresso?.eventoId;
          if (eventoId) {
            await fetch('http://localhost:3000/grupos/aderir', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ eventoId }),
            });
          }
        } catch (err) {
          console.warn('Falha ao aderir ao grupo:', err);
        }
      }

  // Limpar carrinho local e notificar mudança
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('cartChanged'));

      alert('Compra confirmada com sucesso!');
      navigate('/profile');
    } catch (err) {
      console.error('Erro ao confirmar compra:', err);
      alert(err.message || 'Erro ao confirmar compra');
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((s, it) => s + (it.preco * (it.quantidade || 1)), 0);

  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.cartContainer}>
          <div className={styles.cartHeader}>
            <h1 className={styles.title}>Meu Carrinho</h1>
            {cart.length > 0 && (
              <span className={styles.itemsCount}>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</span>
            )}
          </div>

          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyIcon}>🛒</div>
              <h2>Seu carrinho está vazio</h2>
              <p>Adicione ingressos incríveis na página do evento</p>
              <button 
                className={styles.continueShopping}
                onClick={() => navigate('/PageColecoes')}
              >
                Explorar Eventos
              </button>
            </div>
          ) : (
            <div className={styles.cartContent}>
              <div className={styles.cartList}>
                {cart.map(item => (
                  <div key={item.ingressoId} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemName}>{item.nome}</h3>
                      <p className={styles.itemPrice}>{formatPrice(item.preco)} cada</p>
                    </div>
                    <div className={styles.itemControls}>
                      <div className={styles.quantityControl}>
                        <label htmlFor={`quantity-${item.ingressoId}`}>Quantidade:</label>
                        <input 
                          id={`quantity-${item.ingressoId}`}
                          type="number" 
                          min="1" 
                          value={item.quantidade} 
                          onChange={(e) => atualizarQuantidade(item.ingressoId, e.target.value)}
                          className={styles.quantityInput}
                        />
                      </div>
                      <button 
                        onClick={() => remover(item.ingressoId)}
                        className={styles.removeButton}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.cartSummary}>
                <div className={styles.summaryCard}>
                  <h3>Resumo do Pedido</h3>
                  <div className={styles.summaryRow}>
                    <span>Subtotal:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Taxas:</span>
                    <span>Grátis</span>
                  </div>
                  <div className={styles.summaryDivider}></div>
                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span>Total:</span>
                    <span className={styles.totalPrice}>{formatPrice(total)}</span>
                  </div>
                  <button 
                    onClick={confirmarCompra} 
                    disabled={loading}
                    className={styles.confirmButton}
                  >
                    {loading ? (
                      <>
                        <div className={styles.spinner}></div>
                        Processando...
                      </>
                    ) : (
                      'Finalizar Compra'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

function formatPrice(p) {
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p);
  } catch (e) {
    return p;
  }
}

export default ShoppingCart;