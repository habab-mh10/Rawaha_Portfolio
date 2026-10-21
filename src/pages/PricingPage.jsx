import React from "react";
import Header from "../components/Header";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import Theme from "../components/Theme";

/* Scroll-to-top is handled globally by ScrollToTopOnRoute in App.jsx */

const PricingPage = ({ currentTheme, changeTheme }) => {
  return (
    <>
      <Header currentTheme={currentTheme} changeTheme={changeTheme} />
      <main className="pt-[14vh] min-h-screen">
        <Pricing />
      </main>
      <Footer currentTheme={currentTheme} />
      <Theme currentTheme={currentTheme} changeTheme={changeTheme} />
    </>
  );
};

export default PricingPage;
