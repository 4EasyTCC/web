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
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/paginaLogin" element={<PaginaLogin />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/pageCadastro" element={<PageCadastro />} />
          <Route path="/InfoPage" element={<InfoPage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/MoreQuestions" element={<MoreQuestions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/PageSponsor" element={<PageSponsor />} />
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
