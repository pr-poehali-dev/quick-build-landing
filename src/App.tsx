
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexDark from "./pages/IndexDark";
import NotFound from "./pages/NotFound";
import ProizvodstvennyeZdaniya from "./pages/ProizvodstvennyeZdaniya";
import ZdaniyaDlyaTransporta from "./pages/ZdaniyaDlyaTransporta";
import TorgovyeZdaniya from "./pages/TorgovyeZdaniya";
import ProizvodstvennyeZdaniyaDark from "./pages/ProizvodstvennyeZdaniyaDark";
import ZdaniyaDlyaTransportaDark from "./pages/ZdaniyaDlyaTransportaDark";
import TorgovyeZdaniyaDark from "./pages/TorgovyeZdaniyaDark";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/v2" element={<IndexDark />} />
          <Route path="/v2/proizvodstvennye-zdaniya" element={<ProizvodstvennyeZdaniyaDark />} />
          <Route path="/v2/zdaniya-dlya-transporta" element={<ZdaniyaDlyaTransportaDark />} />
          <Route path="/v2/torgovye-zdaniya" element={<TorgovyeZdaniyaDark />} />
          <Route path="/proizvodstvennye-zdaniya" element={<ProizvodstvennyeZdaniya />} />
          <Route path="/zdaniya-dlya-transporta" element={<ZdaniyaDlyaTransporta />} />
          <Route path="/torgovye-zdaniya" element={<TorgovyeZdaniya />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;