import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedContentLayout from "./components/ProtectedContentLayout";
import AuthContextProvider from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TrackerPage from "./pages/TrackerPage";
import UnprotectedRoutes from "./routeProtection/UnprotectedRoutes";

const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<UnprotectedRoutes />}>
              <Route path="/" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
            </Route>

            <Route element={<ProtectedContentLayout />}>
              <Route path="tracker-page" element={<TrackerPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

root.render(<App />);
