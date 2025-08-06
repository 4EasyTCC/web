// App.jsx
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Screens/Home/Home.jsx";
import PaginaLogin from "../Screens/PaginaLogin/PaginaLogin.jsx";
import AboutUs from "../Screens/AboutUs/AboutUs.jsx";
import PageCadastro from "../Screens/PageCadastro/PageCadastro.jsx";
import InfoPage from "../Screens/InfoPage/InfoPage.jsx";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Contact from "../Screens/Contact/Contact.jsx";
=======
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../Screens/Home/Home.jsx';
import PaginaLogin from '../Screens/PaginaLogin/PaginaLogin.jsx';
import AboutUs from '../Screens/AboutUs/AboutUs.jsx';
import PageCadastro from '../Screens/PageCadastro/PageCadastro.jsx';
import InfoPage from '../Screens/InfoPage/InfoPage.jsx';
import Feedback from '../Screens/Feedback/Feedback.jsx';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';

>>>>>>> 1d98b57eb0f241fba369314333cc4b0313f5e4fb


function RootNavigator() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home />} /> {/* Rota raiz */}
        <Route path="/home" element={<Home />} /> {/* Rota alternativa */}
        <Route path="/paginaLogin" element={<PaginaLogin />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/pageCadastro" element={<PageCadastro />} />
        <Route path="/InfoPage" element={<InfoPage />} />
        <Route path="/contact" element={<Contact />} />
=======
        <Route path="/" element={<Home/>} />          {/* Rota raiz */}
        <Route path="/home" element={<Home />} />      {/* Rota alternativa */}
        <Route  path='/paginaLogin' element={<PaginaLogin/>} />
        <Route  path='/aboutUs' element={<AboutUs/>} />
        <Route  path='/pageCadastro' element={<PageCadastro/>} />
        <Route  path='/InfoPage' element={<InfoPage/>} />
        <Route  path='/Feedback' element={<Feedback/>} />
        
>>>>>>> 1d98b57eb0f241fba369314333cc4b0313f5e4fb
      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigator;
