import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedContentLayout from "./components/layout/ProtectedContentLayout";
import AuthContextProvider from "./context/AuthContext";
import Analytics from "./pages/AnalyticsPage";
import Index from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Settings from "./pages/SettingsPage";
import TrackerPage from "./pages/TrackerPage";
import UnprotectedRoutes from "./components/routeProtection/UnprotectedRoutes";
import { AuthForm } from "./components/ui/AuthForm";

const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<UnprotectedRoutes />}>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login-email" element={<AuthForm />} />
              <Route path="/register" element={<AuthForm forRegisteration />} />
            </Route>

            <Route element={<ProtectedContentLayout />}>
              <Route path="tracker" element={<TrackerPage />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

root.render(<App />);
