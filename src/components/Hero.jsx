import React, { useEffect } from "react";
import { Button } from "@mui/material";
import gsap from "gsap";

const Hero = () => {
  // ================== Animation Effects on Parent and Children =================//
  const fadeOut = React.useRef(null);
  const fadeIn = React.useRef(null);
  useEffect(() => {
    gsap.fromTo(
      fadeOut.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      fadeIn.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power2.out", delay: 1 }
    );
  }, []);
  //==============================================================================//

  //=================== JSX Return ===================//
  return (
    <>
      <section
        id="Home"
        className="w-full max-h-[86vh] mt-20 mb-28 flex items-center justify-center"
      >
        <div
          ref={fadeOut}
          className="w-[90%] lg:w-[80%] lg:min-h-[60vh] lg2:h-[30vh] border-2 border-[var(--glass-border)] shadow-depth flex flex-col items-center justify-center p-10"
        >
          <p className="text-2xl lg:text-2xl md:text-sm">
            Hello Everybody, I am
          </p>
          <h1
            className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold mb-4 text-text-primary fill-transparent"
            style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "var(--text-primary)",
            }}
          >
            MUHAMMAD RAWAHA
          </h1>
          <ul
            ref={fadeIn}
            className="text-[1rem] flex flex-wrap bg-[var(--glass-bg)] text-[var(--text-secondary)] shadow-soft p-4"
          >
            <li className="relative pl-3 whitespace-nowrap before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:bg-[var(--muted)] before:rounded-full">
              Student of Dr of Physical Therapy
            </li>
            <li className="ml-3 relative pl-3 whitespace-nowrap before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:bg-[var(--muted)] before:rounded-full">
              MERN Stack Developer
            </li>
            <li className="ml-3 relative pl-3 whitespace-nowrap before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:bg-[var(--muted)] before:rounded-full">
              Data Specialist
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};
export default Hero;
