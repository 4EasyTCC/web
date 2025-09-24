import React from 'react';
import styles from './Terms.module.css';

const TermosUso = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <a href="/" className={styles.logo}>
            Nossa<span className={styles.logoHighlight}>Empresa</span>
          </a>
          <nav className={styles.navLinks}>
            <a href="/" className={styles.navLink}>Início</a>
            <a href="/sobre" className={styles.navLink}>Sobre</a>
            <a href="/servicos" className={styles.navLink}>Serviços</a>
            <a href="/contato" className={styles.navLink}>Contato</a>
          </nav>
        </div>
      </header>

      <main className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Termos de <span className={styles.highlight}>Uso</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Leia atentamente nossos termos e condições antes de utilizar nossos serviços.
          </p>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.lastUpdated}>
            Última atualização: 15 de Novembro de 2023
          </div>

          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>1. Aceitação dos Termos</h2>
            <p className={styles.paragraph}>
              Ao acessar e utilizar nossos serviços, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
              Se você não concordar com qualquer parte destes termos, não poderá utilizar nossos serviços.
            </p>
          </section>

          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>2. Modificações dos Termos</h2>
            <p className={styles.paragraph}>
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após a publicação. 
              O uso continuado de nossos serviços após tais modificações constitui sua aceitação dos novos termos.
            </p>
          </section>

          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>3. Uso dos Serviços</h2>
            
            <h3 className={styles.subsectionTitle}>3.1. Elegibilidade</h3>
            <p className={styles.paragraph}>
              Você deve ter pelo menos 18 anos de idade para utilizar nossos serviços. 
              Ao utilizar nossos serviços, você declara e garante que atende a este requisito.
            </p>

            <h3 className={styles.subsectionTitle}>3.2. Conta do Usuário</h3>
            <p className={styles.paragraph}>
              Ao criar uma conta, você concorda em:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Fornecer informações precisas e completas</li>
              <li className={styles.listItem}>Manter a segurança de sua senha</li>
              <li className={styles.listItem}>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
              <li className={styles.listItem}>Ser responsável por todas as atividades em sua conta</li>
            </ul>

            <h3 className={styles.subsectionTitle}>3.3. Conduta Proibida</h3>
            <p className={styles.paragraph}>
              Você concorda em não:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Violar qualquer lei ou regulamento aplicável</li>
              <li className={styles.listItem}>Infringir direitos de propriedade intelectual</li>
              <li className={styles.listItem}>Distribuir malware ou código malicioso</li>
              <li className={styles.listItem}>Realizar atividades fraudulentas</li>
              <li className={styles.listItem}>Interferir na segurança ou funcionamento dos serviços</li>
            </ul>
          </section>

          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>4. Propriedade Intelectual</h2>
            <p className={styles.paragraph}>
              Todo o conteúdo, recursos e funcionalidades disponíveis em nossos serviços são de nossa propriedade 
              ou de nossos licenciadores e estão protegidos por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.
            </p>
            
            <div className={styles.noteBox}>
              <p className={styles.noteText}>
                Você pode utilizar nosso conteúdo apenas para uso pessoal e não comercial, sujeito a estas restrições.
              </p>
            </div>
          </section>

          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>5. Limitação de Responsabilidade</h2>
            <p className={styles.paragraph}>
              Nossos serviços são fornecidos "no estado em que se encontram" e "conforme a disponibilidade". 
              Não garantimos que os serviços atenderão a todos os seus requisitos ou que serão ininterruptos, 
              seguros ou livres de erros.
            </p>
            <p className={styles.paragraph}>
              Em nenhuma circunstância seremos responsáveis por quaisquer danos indiretos, incidentais, 
              especiais, consequenciais ou punitivos resultantes do uso ou incapacidade de usar nossos serviços.
            </p>
          </section>

          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>6. Privacidade</h2>
            <p className={styles.paragraph}>
              Sua privacidade é importante para nós. Nossa Política de Privacidade explica como coletamos, 
              usamos e protegemos suas informações pessoais. Ao utilizar nossos serviços, você concorda com 
              nossas práticas de coleta e uso de informações conforme descrito em nossa Política de Privacidade.
            </p>
          </section>

          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>7. Rescisão</h2>
            <p className={styles.paragraph}>
              Podemos rescindir ou suspender seu acesso aos nossos serviços imediatamente, sem aviso prévio, 
              por qualquer motivo, incluindo, mas não se limitando a, violação destes Termos de Uso.
            </p>
          </section>

          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>8. Lei Aplicável</h2>
            <p className={styles.paragraph}>
              Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, 
              sem consideração a seus conflitos de disposições legais.
            </p>
          </section>

          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>9. Contato</h2>
            <p className={styles.paragraph}>
              Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através de:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>E-mail: legal@nossaempresa.com</li>
              <li className={styles.listItem}>Telefone: (11) 1234-5678</li>
              <li className={styles.listItem}>Endereço: Rua Exemplo, 123 - São Paulo, SP</li>
            </ul>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <a href="/privacidade" className={styles.footerLink}>Política de Privacidade</a>
            <a href="/termos" className={styles.footerLink}>Termos de Uso</a>
            <a href="/cookies" className={styles.footerLink}>Cookies</a>
          </div>
          <div className={styles.copyright}>
            © 2025 NossaEmpresa. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermosUso;