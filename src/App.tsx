import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestTW from "./pages/TestTailwind";
import TrackerPage from "./pages/TrackerPage";

const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TrackerPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

root.render(<App />);
