// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Screens/Home/Home.jsx';
import PaginaLogin from '../Screens/PaginaLogin/PaginaLogin.jsx';
import AboutUs from '../Screens/AboutUs/AboutUs.jsx';
import PageCadastro from '../Screens/PageCadastro/PageCadastro.jsx';
import InfoPage from '../Screens/InfoPage/InfoPage.jsx';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';


function RootNavigator() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home/>} />          {/* Rota raiz */}
        <Route path="/home" element={<Home />} />      {/* Rota alternativa */}
        <Route  path='/paginaLogin' element={<PaginaLogin/>} />
        <Route  path='/aboutUs' element={<AboutUs/>} />
        <Route  path='/pageCadastro' element={<PageCadastro/>} />
        <Route  path='/InfoPage' element={<InfoPage/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigator;
