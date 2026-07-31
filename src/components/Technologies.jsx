import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faJs } from "@fortawesome/free-brands-svg-icons";
import { SiTailwindcss, SiHtml5 } from "react-icons/si";
import materialUi from "../assets/images/materialui.png";
import msWord from "../assets/images/msWord.png";
import msExcel from "../assets/images/msExcel.png";


gsap.registerPlugin(ScrollTrigger);

const Technologies = () => {
  // ================== Swing Animation of Icons ===================
  const swingIcon = React.useRef([]);
  swingIcon.current = [];

  const swingIconRef = (el) => {
    if (el && !swingIcon.current.includes(el)) {
      swingIcon.current.push(el);
    }
  };

  React.useLayoutEffect(() => {
    swingIcon.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { rotation: -5 },
        {
          rotation: 5,
          duration: 1.2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.4,
        }
      );
    });
  }, []);
  // =============================================================//


  // ================== Infinite Marquee Animation ===================//
  const marqueeTrackRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = marqueeTrackRef.current;
      if (!track) return;

      // The track contains TWO identical sets side-by-side.
      // We translate the entire track left by exactly 50% (one full set width),
      // then repeat infinitely — this creates the seamless loop.
      gsap.to(track, {
        xPercent: -50,          // move left by exactly half (one full set)
        duration: 30,           // slow cinematic speed — adjust for taste
        ease: "none",           // constant linear speed, no acceleration
        repeat: -1,             // loop forever
      });
    }, marqueeTrackRef);

    return () => ctx.revert();
  }, []);
  // =============================================================//


  // ================== Technologies Data ===================
  const myTechnologies = [
    {
      techIcon: () => (
        <SiHtml5 color="#E34F26" className="w-12 h-12" />
      ),
      techTitle: "HTML",
    },

    {
      techIcon: () => (
        <SiTailwindcss color="#38BDF8" className="w-12 h-12" />
      ),
      techTitle: "Tailwind CSS",
    },

    {
      techIcon: () => (
        <FontAwesomeIcon
          icon={faJs}
          color="#F7DF1E"
          className="w-12 h-12"
        />
      ),
      techTitle: "JavaScript",
    },
    {
      techIcon: () => (
        <FontAwesomeIcon
          icon={faReact}
          color="#61DAFB"
          className="w-12 h-12"
        />
      ),
      techTitle: "React",
    },
    {
      techIcon: () => (
        <img
          src={materialUi}
          className="w-12 h-12 object-contain"
        />
      ),
      techTitle: "Material UI",
    },

    {
      techIcon: () => (
        <img
          src={msExcel}
          className="w-12 h-12 object-contain"
        />
      ),
      techTitle: "Excel",
    },

    {
      techIcon: () => (
        <img
          src={msWord}
          className="w-12 h-12 object-contain"
        />
      ),
      techTitle: "MS Word",
    },
  ];
  // =============================================================//


  // ================== Render a single technology card ===================//
  const renderCard = (Technology, index) => (
    <div
      key={index}
      className={`
        group
        flex-shrink-0
        flex
        items-center
        justify-center
        w-24
        h-24
        rounded-full
        bg-card-bg
        shadow-soft
        border
        border-transparent
        hover:border-text-primary
        cursor-pointer
        transition-all
        duration-300
        mx-6
        sm:mx-8
        md:mx-10
        lg:mx-14
        relative
      `}
    >
      <div ref={swingIconRef}>
        {Technology.techIcon()}
      </div>

      <div
        className="
        absolute
        -bottom-12
        opacity-0
        group-hover:opacity-100
        translate-y-3
        group-hover:translate-y-0
        transition-all
        duration-300
        bg-text-secondary
        text-white
        px-4
        py-2
        text-sm
        whitespace-nowrap
        "
      >
        {Technology.techTitle}
      </div>
    </div>
  );
  // =============================================================//


  // ================== JSX Return ===================
  return (
    <section id="Tech" className="w-full p-2 sm:p-4">
      <div className="w-full p-2 mt-16 sm:p-4 flex flex-col justify-center items-center">
        <p className="text-text-secondary uppercase text-sm sm:text-base">
          Technologies
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center mt-2 sm:mt-4">
          What Technologies I use
        </h1>
      </div>

      {/* ── Marquee Container ── */}
      <div className="w-full mt-10 mb-16 py-10 overflow-hidden">
        {/* ── Marquee Track: two identical sets side-by-side ── */}
        <div
          ref={marqueeTrackRef}
          className="flex flex-nowrap items-center w-max"
        >
          {/* Set 1 — original */}
          {myTechnologies.map((tech, i) => renderCard(tech, i))}
          {/* Set 2 — duplicate for seamless loop */}
          {myTechnologies.map((tech, i) => renderCard(tech, i + myTechnologies.length))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;