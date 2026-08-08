import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Home from "./pages/Home";
import PortfolioPage from "./pages/PortfolioPage";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  // ==================== Theme State ==================== //

  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      currentTheme
    );
  }, [currentTheme]);

  const changeTheme = () => {
    setCurrentTheme((prev) =>
      prev === "light" ? "dark" : "light"
    );
  };

  // ====================================================== //

  return (
    <Routes>

      {/* ================= HOME ================= */}

      <Route
        path="/"
        element={
          <Home
            currentTheme={currentTheme}
            changeTheme={changeTheme}
          />
        }
      />

      {/* ================ PORTFOLIO ================ */}

      <Route
        path="/portfolio"
        element={
          <PortfolioPage
            currentTheme={currentTheme}
            changeTheme={changeTheme}
          />
        }
      />

    </Routes>
  );
};

export default App;
