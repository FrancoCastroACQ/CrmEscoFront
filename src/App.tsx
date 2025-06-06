import React from 'react';
import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Clients/Clients";
import ClientView from "./pages/Clients/ClientView";
import ProspectList from "./pages/Prospects/ProspectList";
import ProspectoView from './pages/Prospects/ProspectoView';
import RiskConfigPage from './pages/Config/InstrumentRiskConfig'
import '@mui/material/styles';

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";
    let favicon = "/default-favicon.png"; // Ruta por defecto del favicon

    switch (pathname) {
      case "/":
        title = "clientes";
        metaDescription = "Descripción del clientes";
        favicon = "/menu-act.svg";
        break;
      case "/crm/clients":
        title = "clientes";
        metaDescription = "Descripción del clientes";
        favicon = "/menu-act.svg";
        break;
      case "/crm/prospectos":
        title = "Lista de Prospectos";
        metaDescription = "Lista de prospectos disponibles";
        favicon = "/menu-act.svg";
        break;
      case "/crm/prospectos/detalle/:id":
        title = "Detalles de Prospectos";
        metaDescription = "prospectos";
        favicon = "/menu-act.svg";
        break;
      case "/crm/clients/details/:numcomitente":
        title = "Detalles de Cliente";
        metaDescription = "Cliente";
        favicon = "/menu-act.svg";
        break;
      case "/crm/instrument":
        title = "Intrumentos";
        metaDescription = "Intrumentos";
        favicon = "/menu-act.svg";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }

    const link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = favicon;
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = favicon;
      document.head.appendChild(newLink);
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/crm/clients" element={<Dashboard />} />
      <Route path="/crm/prospectos" element={<ProspectList />} />
      <Route path="/crm/prospectos/detalle/:id" element={<ProspectoView />} />
      <Route path="/crm/clients/details/:numcomitente" element={<ClientView />} />
      <Route path="/crm/instrument" element={<RiskConfigPage />} />
    </Routes>
  );
}

export default App;
