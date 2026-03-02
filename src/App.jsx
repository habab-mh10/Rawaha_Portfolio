import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Resume from "./components/Resume";
import Testimonial from "./components/Testimonial";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Technologies from "./components/Technologies";
import ScrollToTop from "./components/ScrollToTop";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  //=================== Theme State ===================//
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const changeTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  //===================================================//

  //=================== Smooth Scrolling ===================//
  useEffect(() => {
    let smoother;
    if (gsap && ScrollSmoother) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
      });
    }
    // gsap.set("#Header", { y: 2 });
    // ScrollTrigger.create({
    //   trigger: "#Header",
    //   start: 0,
    //   end: "max",
    //   pin: true,
    //   pinSpacing: false,
    // });

    return () => {
      if (smoother) smoother.kill();
    };
  }, []);

  //========================================================//

  //=================== JSX Return ===================//
  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Header
            id="Header"
            currentTheme={currentTheme}
            changeTheme={changeTheme}
          />
          <Hero currentTheme={currentTheme} />
          <About currentTheme={currentTheme} />
          <Services currentTheme={currentTheme} />
          <Technologies currentTheme={currentTheme} />
          <Resume currentTheme={currentTheme} />
          <Testimonial currentTheme={currentTheme} />
          <Portfolio currentTheme={currentTheme} />
          <Contact currentTheme={currentTheme} />
          <Footer currentTheme={currentTheme} />
        </div>
        <ScrollToTop />
      </div>
    </>
  );
};

export default App;
