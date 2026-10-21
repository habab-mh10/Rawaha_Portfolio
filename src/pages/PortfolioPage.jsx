import React from "react";
import Header from "../components/Header";
import Portfolio from "../components/Portfolio";
import Footer from "../components/Footer";
import Theme from "../components/Theme";

/* Scroll-to-top is handled globally by ScrollToTopOnRoute in App.jsx */

const PortfolioPage = ({ currentTheme, changeTheme }) => {
  return (
    <>
      <Header currentTheme={currentTheme} changeTheme={changeTheme} />
      <main className="pt-[14vh] min-h-screen">
        <Portfolio />
      </main>
      <Footer currentTheme={currentTheme} />
    </>
  );
};

export default PortfolioPage;
