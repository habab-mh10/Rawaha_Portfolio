import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faJs } from "@fortawesome/free-brands-svg-icons";
import { SiTailwindcss, SiHtml5, SiExpress } from "react-icons/si";
import materialUi from "../assets/images/materialui.png";
import msWord from "../assets/images/msWord.png";
import msExcel from "../assets/images/msExcel.png";
import Access from "../assets/images/Access.png";
import { FaNodeJs } from "react-icons/fa";

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
        <SiHtml5
          color="#E34F26"
          className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
        />
      ),
      techTitle: "HTML",
      Purpose: "Front End",
    },
    {
      techIcon: () => (
        <SiTailwindcss
          color="#38BDF8"
          className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
        />
      ),
      techTitle: "Tailwind",
      Purpose: "Front End",
    },
    {
      techIcon: () => (
        <FontAwesomeIcon
          icon={faJs}
          className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
          color="#F7DF1E"
        />
      ),
      techTitle: "JavaScript",
      Purpose: "Front End",
    },
    {
      techIcon: () => (
        <FontAwesomeIcon
          icon={faReact}
          className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
          color="#61DAFB"
        />
      ),
      techTitle: "React",
      Purpose: "Front End",
    },
    {
      techIcon: () => (
        <img
          src={materialUi}
          alt="MaterialUI"
          className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
        />
      ),
      techTitle: "MaterialUI",
      Purpose: "Front End",
    },

    {
       techIcon: () => (
        <SiExpress
          color="#93C745"
          className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
        />
      ),
      techTitle: "Express",
      Purpose: "Back End",
    },

     {
       techIcon: () => (
        <FaNodeJs
          color="#93C745"
          className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 font-extrabold"
        />
      ),
      techTitle: "NodeJS",
      Purpose: "Back End",
    },

    {
      techIcon: () => (
        <img
          src={msExcel}
          alt="Excel"
          className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
        />
      ),
      techTitle: "Excel",
      Purpose: "Data Entry",
    },

    {
      techIcon: () => (
        <img
          src={msWord}
          alt="Word"
          className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
        />
      ),
      techTitle: "WORD",
      Purpose: "Data Entry",
    },

    {
      techIcon: () => (
        <img
          src={Access}
          alt="Access"
          className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
        />
      ),
      techTitle: "Access",
      Purpose: "Data Entry",
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

      <div className="w-full mt-10 mb-16 flex flex-wrap items-center justify-center gap-7">
        {myTechnologies.map((Technology, index) => (
          <div
            key={index}
            ref={scaleOutRef}
            className="w-36 h-52 bg-card-bg p-6 rounded-full flex flex-col justify-center items-center gap-4 shadow-soft transition-border duration-300 border-[1.2px] border-transparent hover:border-text-primary hover:cursor-text"
          >
            <div ref={swingIconRef}>{Technology.techIcon()}</div>
            <h1 className="text-text-primary text-xl mt-4 font-bold">
              {Technology.techTitle}
            </h1>
            <p>{Technology.Purpose}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;