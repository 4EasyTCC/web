// RootNavigator.jsx (atualizado)
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { NavigationHistoryProvider } from "@/components/NavigationHistoryProvider/NavigationHistoryProvider.jsx";
import Home from "../Screens/Home/Home.jsx";
import PaginaLogin from "../Screens/PaginaLogin/PaginaLogin.jsx";
import AboutUs from "../Screens/AboutUs/AboutUs.jsx";
import PageCadastro from "../Screens/PageCadastro/PageCadastro.jsx";
import InfoPage from "../Screens/InfoPage/InfoPage.jsx";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Contact from "../Screens/Contact/Contact.jsx";
import Feedback from "../Screens/Feedback/Feedback.jsx";
import MoreQuestions from "../Screens/MoreQuestions/MoreQuestions.jsx";
import Profile from "../Screens/Profile/Profile.jsx";
import PageSponsor from "../Screens/PageSponsor/PageSponsor.jsx";
import PageColecoes from "../Screens/PageColecoes/PageColecoes.jsx";
import Eventos from "../Screens/Eventos/Eventos.jsx";
import SearchEvents from "../Screens/SearchEvents/SearchEvents.jsx";
import SearchResults from "../Screens/SearchResults/SearchResults.jsx";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Terms from "../Screens/Terms/Terms.jsx";
import PageTransition from "@/components/PageTransition/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/home"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/paginaLogin"
            element={
              <PageWrapper>
                <PaginaLogin />
              </PageWrapper>
            }
          />
          <Route
            path="/aboutUs"
            element={
              <PageWrapper>
                <AboutUs />
              </PageWrapper>
            }
          />
          <Route
            path="/pageCadastro"
            element={
              <PageWrapper>
                <PageCadastro />
              </PageWrapper>
            }
          />
          <Route
            path="/InfoPage"
            element={
              <PageWrapper>
                <InfoPage />
              </PageWrapper>
            }
          />
          <Route
            path="/Contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />
          <Route
            path="/Feedback"
            element={
              <PageWrapper>
                <Feedback />
              </PageWrapper>
            }
          />
          <Route
            path="/MoreQuestions"
            element={
              <PageWrapper>
                <MoreQuestions />
              </PageWrapper>
            }
          />
          <Route
            path="/profile"
            element={
              <PageWrapper>
                <Profile />
              </PageWrapper>
            }
          />
          <Route
            path="/PageSponsor"
            element={
              <PageWrapper>
                <PageSponsor />
              </PageWrapper>
            }
          />
          
          {/* Rota principal das coleções */}
          <Route
            path="/PageColecoes"
            element={
              <PageWrapper>
                <PageColecoes />
              </PageWrapper>
            }
          />
          
          {/* Rota dinâmica para detalhes da coleção */}
          <Route
            path="/PageColecoes/:id"
            element={
              <PageWrapper>
                <PageColecoes />
              </PageWrapper>
            }
          />
          
          {/* Rota dinâmica para subcategoria da coleção */}
          <Route
            path="/PageColecoes/:id/:subId"
            element={
              <PageWrapper>
                <PageColecoes />
              </PageWrapper>
            }
          />
          
          {/* Rota principal de eventos */}
         
          
          {/* Rota dinâmica para detalhes do evento */}
          <Route
            path="/Eventos/:id"
            element={
              <PageWrapper>
                <Eventos />
              </PageWrapper>
            }
          />

          <Route
            path="/Terms"
            element={
              <PageWrapper>
                <Terms />
              </PageWrapper>
            }
          />
          
          <Route
            path="/SearchEvents"
            element={
              <PageWrapper>
                <SearchEvents />
              </PageWrapper>
            }
          />
          <Route
            path="/search"
            element={
              <PageWrapper>
                <SearchResults />
              </PageWrapper>
            }
          />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

function RootNavigator() {
  return (
    <BrowserRouter>
      <NavigationHistoryProvider>
        <ScrollToTop />
        <AnimatedRoutes />
      </NavigationHistoryProvider>
    </BrowserRouter>
  );
}

export default RootNavigator;