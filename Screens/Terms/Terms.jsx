import React from 'react';
import styles from './Terms.module.css';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const TermosUso = () => {
  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Termos de <span className={styles.highlight}>Uso</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Este documento contém as regras e condições que regem a utilização da plataforma e dos serviços da 4Easy. Leia atentamente.
          </p>
        </div>

        <div className={styles.contentContainer}>


          {/* 1. GLOSSÁRIO - SIMILAR À ESTRUTURA SYMPLA */}
          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>1. Glossário</h2>
            <p className={styles.paragraph}>
              Para fins destes Termos de Uso, os termos listados abaixo, quando escritos em letra maiúscula, terão os seguintes significados:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Plataforma:</strong> Refere-se à plataforma digital (website, aplicativo e quaisquer outras interfaces) de propriedade da NossaEmpresa.
              </li>
              <li className={styles.listItem}>
                <strong>Usuário:</strong> Qualquer pessoa física ou jurídica que acesse ou utilize os serviços da Plataforma, seja como Comprador ou Prestador de Serviço.
              </li>
              <li className={styles.listItem}>
                <strong>Serviços:</strong> As funcionalidades e recursos oferecidos pela NossaEmpresa através da Plataforma.
              </li>
              <li className={styles.listItem}>
                <strong>Conteúdo:</strong> Inclui textos, dados, gráficos, imagens, músicas, software e quaisquer outros materiais disponibilizados na Plataforma.
              </li>
            </ul>
          </section>

          <hr/> {/* Separador visual para seções principais */}

          {/* 2. ACEITAÇÃO E INFORMAÇÕES GERAIS */}
          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>2. Aceitação e Informações Gerais</h2>
            
            <h3 className={styles.subsectionTitle}>2.1. Aceitação Integral</h3>
            <p className={styles.paragraph}>
              Ao acessar e utilizar a Plataforma, o Usuário manifesta sua ciência e concordância integral e irrestrita com todas as cláusulas e condições destes Termos de Uso. 
              Se houver discordância com qualquer ponto, o Usuário não deverá utilizar os Serviços.
            </p>
            
            <h3 className={styles.subsectionTitle}>2.2. Modificações dos Termos</h3>
            <p className={styles.paragraph}>
              A NossaEmpresa reserva-se o direito de modificar estes Termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após a publicação na Plataforma. 
              O uso continuado dos Serviços após a publicação das modificações constitui aceitação tácita dos novos termos.
            </p>

             <h3 className={styles.subsectionTitle}>2.3. Capacidade Legal</h3>
            <p className={styles.paragraph}>
              Os Serviços são destinados a pessoas físicas maiores de 18 (dezoito) anos ou pessoas jurídicas devidamente representadas.
              Usuários menores de idade devem obter consentimento expresso de seus pais ou representantes legais para a utilização, sendo estes os responsáveis por todas as ações do menor na Plataforma.
            </p>
          </section>

          <hr/>

          {/* 3. CADASTRO E CONTA DO USUÁRIO - SIMILAR À ESTRUTURA SYMPLA */}
          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>3. Cadastro e Conta do Usuário</h2>
            
            <h3 className={styles.subsectionTitle}>3.1. Requisitos de Cadastro</h3>
            <p className={styles.paragraph}>
              O Usuário compromete-se a fornecer informações precisas, completas e verdadeiras no momento do cadastro e a mantê-las sempre atualizadas.
            </p>
            
            <h3 className={styles.subsectionTitle}>3.2. Segurança e Responsabilidade</h3>
            <p className={styles.paragraph}>
              O Usuário é o único e exclusivo responsável pela segurança de sua senha e por todas as atividades que ocorram em sua conta. 
              Qualquer uso não autorizado deve ser imediatamente notificado à NossaEmpresa.
            </p>
            
            <div className={styles.noteBox}>
              <p className={styles.noteText}>
                <strong>Atenção:</strong> A NossaEmpresa não se responsabiliza por quaisquer danos resultantes do uso indevido da conta por terceiros, com ou sem o conhecimento do Usuário.
              </p>
            </div>
          </section>
          
          <hr/>

          {/* 4. CONDUTA E OBRIGAÇÕES DO USUÁRIO - SIMILAR À ESTRUTURA SYMPLA */}
          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>4. Conduta e Obrigações do Usuário</h2>
            <p className={styles.paragraph}>
              O Usuário se compromete a utilizar a Plataforma de forma ética e legal, abstendo-se de praticar as seguintes condutas:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Violar leis, regulamentos ou direitos de terceiros (incluindo propriedade intelectual).</li>
              <li className={styles.listItem}>Realizar atividades fraudulentas, enganosas ou que se enquadrem como crime cibernético.</li>
              <li className={styles.listItem}>Distribuir, transmitir ou carregar vírus, malware ou qualquer código malicioso.</li>
              <li className={styles.listItem}>Interferir ou interromper a segurança ou a funcionalidade dos Serviços.</li>
              <li className={styles.listItem}>Promover discurso de ódio, discriminação ou violência.</li>
            </ul>
          </section>
          
          <hr/>

          {/* 5. PROPRIEDADE INTELECTUAL - SIMILAR À ESTRUTURA SYMPLA */}
          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>5. Direitos Autorais e Propriedade Intelectual</h2>
            <p className={styles.paragraph}>
              Todo o Conteúdo, incluindo, mas não se limitando a, software, marcas, design, textos e identidade visual da Plataforma, são de propriedade exclusiva da NossaEmpresa ou de seus licenciadores e são protegidos por leis de propriedade intelectual.
            </p>
            
            <h3 className={styles.subsectionTitle}>5.1. Uso do Conteúdo</h3>
            <p className={styles.paragraph}>
              É expressamente proibido reproduzir, copiar, adaptar, utilizar marcas ou logotipos da NossaEmpresa sem autorização prévia e expressa. 
              O Usuário pode utilizar o Conteúdo apenas para uso pessoal e não comercial, respeitando as restrições deste Termo.
            </p>
          </section>

          <hr/>

          {/* 6. LIMITAÇÃO DE RESPONSABILIDADE - SIMILAR À ESTRUTURA SYMPLA */}
          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>6. Limitação de Responsabilidade</h2>
            <p className={styles.paragraph}>
              Os Serviços da Plataforma são fornecidos "no estado em que se encontram" e "conforme a disponibilidade", sem garantias de que atenderão a todos os requisitos do Usuário ou que serão ininterruptos, seguros ou livres de erros.
            </p>
            <p className={styles.paragraph}>
              A NossaEmpresa não será responsável por quaisquer danos indiretos, incidentais, consequenciais ou punitivos resultantes do uso ou da incapacidade de usar os Serviços.
              A NossaEmpresa não se responsabiliza por falhas na prestação de serviços de terceiros (como Produtores de Conteúdo ou Parceiros) cujos serviços sejam apenas intermediados pela Plataforma.
            </p>
          </section>
          
          <hr/>

          {/* 7. PRIVACIDADE E DADOS PESSOAIS - SIMILAR À ESTRUTURA SYMPLA */}
          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>7. Privacidade e Proteção de Dados</h2>
            <p className={styles.paragraph}>
              A coleta, uso, armazenamento e proteção dos dados pessoais dos Usuários são regidos pela nossa **Política de Privacidade**. Ao utilizar a Plataforma, o Usuário concorda com as práticas descritas em tal política.
            </p>
          </section>

          <hr/>

          {/* 8. DISPOSIÇÕES GERAIS - SIMILAR À ESTRUTURA SYMPLA */}
          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>8. Disposições Gerais</h2>
            
            <h3 className={styles.subsectionTitle}>8.1. Rescisão</h3>
            <p className={styles.paragraph}>
              Podemos rescindir ou suspender o acesso do Usuário aos Serviços imediatamente, sem aviso prévio, em caso de violação destes Termos de Uso.
            </p>
            
            <h3 className={styles.subsectionTitle}>8.2. Lei Aplicável e Foro</h3>
            <p className={styles.paragraph}>
              Estes Termos de Uso são regidos e interpretados pelas leis da República Federativa do Brasil. 
              Fica eleito o foro da Comarca de São Paulo, no Estado de São Paulo, para dirimir quaisquer controvérsias oriundas destes Termos.
            </p>
          </section>
          
          <hr/>

          <section className={styles.termsSection}>
            <h2 className={styles.sectionTitle}>9. Contato</h2>
            <p className={styles.paragraph}>
              Para qualquer dúvida, reclamação ou solicitação relacionada a estes Termos de Uso ou aos nossos Serviços, o Usuário pode entrar em contato através dos canais abaixo:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>E-mail: legal@nossaempresa.com</li>
              <li className={styles.listItem}>Telefone: (11) 1234-5678</li>
              <li className={styles.listItem}>Endereço: Rua Exemplo, 123 - São Paulo, SP</li>
            </ul>
          </section>
        </div>
      </main>

    <Footer />
    </div>
  );
};

export default TermosUso;