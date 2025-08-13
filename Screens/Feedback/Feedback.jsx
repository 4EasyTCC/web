import React, { useState } from 'react';
import styles from './Feedback.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FaPaperPlane, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Obrigado pelo seu feedback!');
        setFeedback('');
    };

    const faqItems = [
        {
            question: 'Como posso acompanhar o status do meu feedback?',
            answer: 'Todos os feedbacks são analisados por nossa equipe. Você receberá um e-mail de confirmação quando seu feedback for recebido e outro quando for analisado.'
        },
        {
            question: 'Quanto tempo leva para receber uma resposta?',
            answer: 'Nosso tempo médio de resposta é de 2-3 dias úteis para questões simples. Casos mais complexos podem levar até 5 dias úteis.'
        },
        {
            question: 'Posso enviar feedback anônimo?',
            answer: 'Sim, aceitamos feedback anônimo. No entanto, sem informações de contato, não poderemos responder diretamente ou fornecer atualizações.'
        }
    ];

    return (
        <>
            <Header />
            <div className={styles.pageContainer}>
                <main className={styles.mainContent}>
                    <div className={styles.feedbackContainer}>
                        <div className={styles.feedbackHeader}>
                            <h1 className={styles.feedbackTitle}>AJUDE-NOS A MELHORAR</h1>
                            <p className={styles.feedbackSubtitle}>Sua opinião é valiosa para nós</p>
                        </div>

                        <div className={styles.feedbackBody}>
                            <form onSubmit={handleSubmit} className={styles.feedbackForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="feedback" className={styles.formLabel}>Reclamação ou Feedback</label>
                                    <textarea
                                        id="feedback"
                                        className={styles.formTextarea}
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Descreva sua experiência, reclamação ou sugestão de melhoria..."
                                        rows={5} />
                                </div>
                                <button type="submit" className={styles.submitButton}>
                                    <FaPaperPlane className={styles.buttonIcon} />
                                    Enviar Feedback
                                </button>
                            </form>

                            <section className={styles.faqSection}>
                                <h2 className={styles.sectionTitle}>Perguntas Frequentes</h2>


                                

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

<Link to="/MoreQuestions" className={styles.moreLink}>
    Ver mais perguntas frequentes
    <FaArrowRight className={styles.arrowIcon} />
</Link>
                            </section>
                        </div>
                        
                    </div>
                    
                </main>

                
                <Footer />
            </div>
        </>
    );
};

export default Feedback;