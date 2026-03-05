import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "@/hooks/useLang";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaginaInstitucional from "@/pages/PaginaInstitucional";
import BibliotecaVirtual from "@/pages/BibliotecaVirtual";
import RinconCivico from "@/pages/RinconCivico";
import PortalPadres from "@/pages/PortalPadres";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LangProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<PaginaInstitucional />} />
            <Route path="/biblioteca" element={<BibliotecaVirtual />} />
            <Route path="/rincon-civico" element={<RinconCivico />} />
            <Route path="/portal-padres" element={<PortalPadres />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </LangProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
