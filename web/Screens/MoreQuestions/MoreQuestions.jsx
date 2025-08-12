import React, { useState } from 'react';
import styles from './MoreQuestions.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FaChevronDown, FaArrowLeft } from 'react-icons/fa';
import { Link } from "react-router-dom";

const MoreQuest = () => {
    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    const faqItems = [
        {
            question: 'Como posso redefinir minha senha?',
            answer: 'Você pode redefinir sua senha clicando em "Esqueci minha senha" na página de login. Um e-mail com instruções será enviado para você.'
        },
        {
            question: 'Quais métodos de pagamento são aceitos?',
            answer: 'Aceitamos cartões de crédito (Visa, Mastercard, American Express), PayPal, PIX e transferência bancária.'
        },
        {
            question: 'Qual é a política de devolução?',
            answer: 'Aceitamos devoluções dentro de 30 dias após a compra. O produto deve estar na embalagem original e em condições não utilizadas.'
        },
        {
            question: 'Como entro em contato com o suporte?',
            answer: 'Você pode entrar em contato através do formulário de feedback, por e-mail (suporte@empresa.com) ou pelo telefone (00) 1234-5678.'
        },
        {
            question: 'Meu pedido foi enviado mas ainda não chegou, o que fazer?',
            answer: 'Verifique o código de rastreio em seu e-mail de confirmação. Caso o prazo de entrega tenha expirado, entre em contato conosco.'
        },
        {
            question: 'Vocês oferecem desconto para compras em grande quantidade?',
            answer: 'Sim, oferecemos descontos progressivos para compras acima de 10 unidades. Entre em contato com nosso time comercial.'
        },
        {
            question: 'Como funciona a garantia dos produtos?',
            answer: 'Todos os produtos possuem garantia de 12 meses contra defeitos de fabricação. Consulte os termos específicos para cada produto.'
        },
        {
            question: 'Posso alterar meu pedido após a compra?',
            answer: 'Alterações são possíveis apenas se o pedido ainda não tiver sido processado. Entre em contato imediatamente caso precise de alterações.'
        },
        {
            question: 'Como faço para cancelar minha conta?',
            answer: 'Você pode cancelar sua conta a qualquer momento nas configurações do seu perfil. Todos os seus dados serão permanentemente removidos em até 30 dias.'
        },
        {
            question: 'Vocês possuem aplicativo móvel?',
            answer: 'Sim, nosso aplicativo está disponível para download na App Store (iOS) e Google Play Store (Android).'
        },
        {
            question: 'Como atualizo minhas informações de pagamento?',
            answer: 'Acesse "Minha Conta" > "Formas de Pagamento" para adicionar, remover ou atualizar seus métodos de pagamento.'
        },
        {
            question: 'O que fazer se receber um produto danificado?',
            answer: 'Entre em contato imediatamente com nosso suporte ao cliente, enviando fotos do produto e da embalagem. Faremos a substituição sem custos adicionais.'
        },
        {
            question: 'Como funciona o programa de fidelidade?',
            answer: 'A cada compra você acumula pontos que podem ser trocados por descontos em compras futuras. Quanto mais você compra, mais benefícios recebe.'
        },
        {
            question: 'Posso pedir reembolso em vez de troca?',
            answer: 'Sim, em casos de devolução dentro do prazo, você pode optar por reembolso que será processado em até 10 dias úteis.'
        },
        {
            question: 'Vocês entregam para todo o Brasil?',
            answer: 'Sim, entregamos para todo o território nacional. Os prazos e valores de frete variam conforme a localidade.'
        },
        {
            question: 'Como saber se um produto está em estoque?',
            answer: 'Todos os produtos disponíveis em nosso site estão em estoque. Caso ocorra algum imprevisto, entraremos em contato imediatamente.'
        }
    ];

    return (
        <>
            <Header />
            <div className={styles.pageContainer}>
                <main className={styles.mainContent}>
                    <div className={styles.faqContainer}>
                        <div className={styles.faqHeader}>
                            <Link to="/Feedback" className={styles.backLink}>
                                <FaArrowLeft className={styles.backIcon} />
                                Voltar
                            </Link>
                            <h1 className={styles.faqTitle}>PERGUNTAS FREQUENTES</h1>
                            <p className={styles.faqSubtitle}>Encontre respostas para as dúvidas mais comuns</p>
                        </div>

                        <div className={styles.faqBody}>
                            <section className={styles.faqSection}>
                                {faqItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.faqItem} ${activeFAQ === index ? styles.active : ''}`}
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <div className={styles.faqQuestion}>
                                            <span>{item.question}</span>
                                            <FaChevronDown className={styles.faqIcon} />
                                        </div>
                                        {activeFAQ === index && (
                                            <div className={styles.faqAnswer}>
                                                <div className={styles.faqAnswerContent}>
                                                    <p>{item.answer}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </section>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default MoreQuest;