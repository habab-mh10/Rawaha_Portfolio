import React from "react";
import Header from "../components/Header";
import Services from "../components/Services";
import Footer from "../components/Footer";
import Theme from "../components/Theme";

/* Scroll-to-top is handled globally by ScrollToTopOnRoute in App.jsx */

const MyServices = ({ currentTheme, changeTheme }) => {
  return (
    <>
      <Header currentTheme={currentTheme} changeTheme={changeTheme} />
      <main className="pt-[14vh] min-h-screen">
        <Services />
      </main>
      <Footer currentTheme={currentTheme} />
    </>
  );
};

export default MyServices;
