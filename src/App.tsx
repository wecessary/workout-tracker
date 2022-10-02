import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import TrackerPage from "./pages/TrackerPage";
import ProtectedRoutes from "./routeProtection/ProtectedRoutes";

const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route
              path="/tracker-page"
              element={
                <ProtectedRoutes>
                  <TrackerPage />
                </ProtectedRoutes>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

root.render(<App />);
