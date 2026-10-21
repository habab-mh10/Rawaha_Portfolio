import React from "react";
import Header from "../components/Header";
import About from "../components/About";
import VisionGoals from "../components/VisionGoals";
import Footer from "../components/Footer";
import Theme from "../components/Theme";
import Team from "../components/Team";

/* Scroll-to-top is handled globally by ScrollToTopOnRoute in App.jsx */

const AboutPage = ({ currentTheme, changeTheme }) => {
  return (
    <>
      <Header currentTheme={currentTheme} changeTheme={changeTheme} />
      <main className="pt-[14vh] min-h-screen">
        <About />
        <VisionGoals />
        {/* <Team /> */}
      </main>
      <Footer currentTheme={currentTheme} />
     </>
  );
};

export default AboutPage;
