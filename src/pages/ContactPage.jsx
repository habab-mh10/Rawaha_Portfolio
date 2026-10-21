import React from "react";
import Header from "../components/Header";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Theme from "../components/Theme";

/* Scroll-to-top is handled globally by ScrollToTopOnRoute in App.jsx */

const ContactPage = ({ currentTheme, changeTheme }) => {
  return (
    <>
      <Header currentTheme={currentTheme} changeTheme={changeTheme} />
      <main className="pt-[14vh] min-h-screen">
        <Pricing />
        <Contact />
      </main>
      <Footer currentTheme={currentTheme} />
    </>
  );
};

export default ContactPage;
