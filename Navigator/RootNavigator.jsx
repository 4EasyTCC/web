// RootNavigator.jsx (atualizado)
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../Screens/Home/Home.jsx";
import PaginaLogin from "../Screens/PaginaLogin/PaginaLogin.jsx";
import AboutUs from "../Screens/AboutUs/AboutUs.jsx";
import PageCadastro from "../Screens/PageCadastro/PageCadastro.jsx";
import InfoPage from "../Screens/InfoPage/InfoPage.jsx";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Contact from "../Screens/Contact/Contact.jsx";
import Feedback from "../Screens/Feedback/Feedback.jsx";
import PageTransition from "@/components/PageTransition/PageTransition";
import MoreQuestions from "../Screens/MoreQuestions/MoreQuestions.jsx";
import Profile from "../Screens/Profile/Profile.jsx";
import PageSponsor from "../Screens/PageSponsor/PageSponsor.jsx";
import PageColecoes from "../Screens/PageColecoes/PageColecoes.jsx";
import Eventos from "../Screens/Eventos/Eventos.jsx";
import SearchEvents from "../Screens/SearchEvents/SearchEvents.jsx";
import PageWrapper from "@/components/PageWrapper/PageWrapper"; // Novo import

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          } />
          <Route path="/home" element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          } />
          <Route path="/paginaLogin" element={
            <PageWrapper>
              <PaginaLogin />
            </PageWrapper>
          } />
          <Route path="/aboutUs" element={
            <PageWrapper>
              <AboutUs />
            </PageWrapper>
          } />
          <Route path="/pageCadastro" element={
            <PageWrapper>
              <PageCadastro />
            </PageWrapper>
          } />
          <Route path="/InfoPage" element={
            <PageWrapper>
              <InfoPage />
            </PageWrapper>
          } />
          <Route path="/Contact" element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          } />
          <Route path="/Feedback" element={
            <PageWrapper>
              <Feedback />
            </PageWrapper>
          } />
          <Route path="/MoreQuestions" element={
            <PageWrapper>
              <MoreQuestions />
            </PageWrapper>
          } />
          <Route path="/profile" element={
            <PageWrapper>
              <Profile />
            </PageWrapper>
          } />
          <Route path="/PageSponsor" element={
            <PageWrapper>
              <PageSponsor />
            </PageWrapper>
          } />
          <Route path="/PageColecoes" element={
            <PageWrapper>
              <PageColecoes />
            </PageWrapper>
          } />
          <Route path="/colecao/:id" element={
            <PageWrapper>
              <PageColecoes />
            </PageWrapper>
          } />
          <Route path="/colecao/:id/:subId" element={
            <PageWrapper>
              <PageColecoes />
            </PageWrapper>
          } />
          <Route path="/Eventos" element={
            <PageWrapper>
              <Eventos />
            </PageWrapper>
          } />
          <Route path="/evento/:id" element={
            <PageWrapper>
              <Eventos />
            </PageWrapper>
          } />
          <Route path="/SearchEvents" element={
            <PageWrapper>
              <SearchEvents />
            </PageWrapper>
          } />
          {/* Adicione rotas com parâmetros para outras páginas conforme necessário */}
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

function RootNavigator() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default RootNavigator;