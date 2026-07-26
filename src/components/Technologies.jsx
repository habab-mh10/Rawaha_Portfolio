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
  // ================== Animation of parent Divs ===================//
  const scaleOut = React.useRef([]);
  scaleOut.current = [];
  const scaleOutRef = (el) => {
    if (el && !scaleOut.current.includes(el)) {
      scaleOut.current.push(el);
    }
  };
  React.useLayoutEffect(() => {
    scaleOut.current.forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 0.4, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 97%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);
  //=================================================================//

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

  // ================== Technologies Data ===================
  const myTechnologies = [
    {
      techIcon: () => (
        <SiHtml5 color="#E34F26" className="w-12 h-12" />
      ),
      techTitle: "HTML",
      position: "top-5 left-10",
    },

    {
      techIcon: () => (
        <SiTailwindcss color="#38BDF8" className="w-12 h-12" />
      ),
      techTitle: "Tailwind CSS",
      position: "top-20 right-20",
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
      position: "bottom-20 left-32",
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
      position: "bottom-16 right-40",
    },

    {
      techIcon: () => (
        <img
          src={materialUi}
          className="w-12 h-12 object-contain"
        />
      ),
      techTitle: "Material UI",
      position: "bottom-32 left-1/2",
    },

    {
      techIcon: () => (
        <img
          src={msExcel}
          className="w-12 h-12 object-contain"
        />
      ),
      techTitle: "Excel",
      position: "top-28 left-96",
    },

    {
      techIcon: () => (
        <img
          src={msWord}
          className="w-12 h-12 object-contain"
        />
      ),
      techTitle: "MS Word",
      position: "top-10 right-1/3",
    },
  ];
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

      <div className="relative w-full h-[500px] mt-10 mb-16 p-5 overflow-hidden">

        {myTechnologies.map((Technology, index) => (

          <div
            key={index}
            ref={scaleOutRef}
            className={`
        absolute
        ${Technology.position}
        group
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

        ))}

      </div>
    </section>
  );
};

export default Technologies;