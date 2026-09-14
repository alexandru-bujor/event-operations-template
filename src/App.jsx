import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import { AppProvider } from '@/lib/AppContext';
import Layout from '@/components/Layout';

// Page imports
import PanouCentral from '@/pages/PanouCentral';
import Bilete from '@/pages/Bilete';
import ControlAcces from '@/pages/ControlAcces';
import DriftTaxi from '@/pages/DriftTaxi';
import Piloti from '@/pages/Piloti';
import PilotProfil from '@/pages/PilotProfil';
import Masini from '@/pages/Masini';
import MasinaProfil from '@/pages/MasinaProfil';
import Program from '@/pages/Program';
import ControlPista from '@/pages/ControlPista';
import Competitie from '@/pages/Competitie';
import VerificareTehnica from '@/pages/VerificareTehnica';
import Paddock from '@/pages/Paddock';
import Staff from '@/pages/Staff';
import Incidente from '@/pages/Incidente';
import Acreditari from '@/pages/Acreditari';
import Parking from '@/pages/Parking';
import CarExpo from '@/pages/CarExpo';
import ExpoProfilPublic from '@/pages/ExpoProfilPublic';
import VotarePista from '@/pages/VotarePista';
import Sponsori from '@/pages/Sponsori';
import Vanzatori from '@/pages/Vanzatori';
import Merchandise from '@/pages/Merchandise';
import Financiar from '@/pages/Financiar';
import Casa from '@/pages/Casa';
import Notificari from '@/pages/Notificari';
import Documente from '@/pages/Documente';
import AuditLog from '@/pages/AuditLog';
import Setari from '@/pages/Setari';
import PilotDashboard from '@/pages/PilotDashboard';

const MainApp = () => (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PanouCentral />} />
          <Route path="/bilete" element={<Bilete />} />
          <Route path="/control-acces" element={<ControlAcces />} />
          <Route path="/drift-taxi" element={<DriftTaxi />} />
          <Route path="/piloti" element={<Piloti />} />
          <Route path="/pilot/:id" element={<PilotProfil />} />
          <Route path="/pilot-dashboard" element={<PilotDashboard />} />
          <Route path="/masini" element={<Masini />} />
          <Route path="/masina/:id" element={<MasinaProfil />} />
          <Route path="/program" element={<Program />} />
          <Route path="/control-pista" element={<ControlPista />} />
          <Route path="/competitie" element={<Competitie />} />
          <Route path="/verificare-tehnica" element={<VerificareTehnica />} />
          <Route path="/paddock" element={<Paddock />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/incidente" element={<Incidente />} />
          <Route path="/acreditari" element={<Acreditari />} />
          <Route path="/parking" element={<Parking />} />
          <Route path="/car-expo" element={<CarExpo />} />
          <Route path="/expo-profil/:id" element={<ExpoProfilPublic />} />
          <Route path="/expo-vot" element={<CarExpo />} />
          <Route path="/votare-pista" element={<VotarePista />} />
          <Route path="/sponsori" element={<Sponsori />} />
          <Route path="/vanzatori" element={<Vanzatori />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route path="/financiar" element={<Financiar />} />
          <Route path="/casa" element={<Casa />} />
          <Route path="/notificari" element={<Notificari />} />
          <Route path="/documente" element={<Documente />} />
          <Route path="/audit" element={<AuditLog />} />
          <Route path="/setari" element={<Setari />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AppProvider>
);

function App() {
  return (
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/*" element={<MainApp />} />
          </Routes>
        </Router>
        <Toaster />
        <Sonner theme="dark" position="top-right" richColors closeButton />
      </QueryClientProvider>
  )
}

export default App