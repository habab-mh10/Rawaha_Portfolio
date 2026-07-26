import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import CodeIcon from "@mui/icons-material/Code";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import DatasetIcon from "@mui/icons-material/Dataset";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  // ======================== Fade In Effect ========================//
  const fadeIn = React.useRef([]);
  fadeIn.current = [];

  const fadeInElements = (el) => {
    if (el && !fadeIn.current.includes(el)) {
      fadeIn.current.push(el);
    }
  };

  React.useEffect(() => {
    fadeIn.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 10 },
        {
          duration: 0.4,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);
  //=======================================================================//
  // ======================== Hover Rotate Effect ========================//
  const hoverRotate = React.useRef([]);
  hoverRotate.current = [];

  const hoverRotateIcons = (el) => {
    if (el && !hoverRotate.current.includes(el)) {
      hoverRotate.current.push(el);
    }
  };

  const HoverIn = (index) => {
    gsap.to(hoverRotate.current[index], {
      rotation: 20,
      duration: 1,
      ease: "power2.out",
    });
  };

  const HoverOut = (index) => {
    gsap.to(hoverRotate.current[index], {
      rotation: 0,
      duration: 1,
      ease: "power2.out",
    });
  };
  //=======================================================================//

  // ======================== Service Cards Data ========================//
  const servicesCards = [
    {
      icon: () => (
        <CodeIcon
          style={{
            fontSize: 50,
            marginTop: "1rem",
            color: "currentColor",
          }}
        />
      ),
      title: "MERN Stack Web Development",
      description:
        "Developing scalable and high-performance full-stack web applications using MongoDB, Express.js, React, and Node.js with secure APIs and modern UI design.",
    },
    {
      icon: () => (
        <WebAssetIcon
          style={{
            fontSize: 50,
            marginTop: "1rem",
            color: "currentColor",
          }}
        />
      ),
      title: "Responsive Website & UI/UX Design",
      description:
        "Designing clean, modern, and fully responsive websites with optimized performance, user-friendly interfaces, and cross-device compatibility.",
    },
    {
      icon: () => (
        <DatasetIcon
          style={{
            fontSize: 50,
            marginTop: "1rem",
            color: "currentColor",
          }}
        />
      ),
      title: "Excel Data Entry & MS Access Management",
      description:
        "Providing accurate Excel data entry, spreadsheet organization, data cleaning, and professional Microsoft Access database creation with tables, queries, forms, and reports.",
    },
  ];

  //=======================================================================//

  // ============================ JSX Return ==============================//
  return (
    <section id="Services" className="w-full p-2 sm:p-4 mb-14">
      <div className="w-full p-2 mt-16 sm:p-4 flex flex-col justify-center items-center">
        <p className="text-text-secondary uppercase text-sm sm:text-base">
          Services
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-relaxed text-center mt-2 sm:mt-4">
          Quality Services
        </h1>
        <div className="w-full lg:w-[95%] xl:w-[90%] mt-8 sm:mt-12 lg:mt-20 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-7">
          {servicesCards.map((serviceCard, index) => (
            <div
              key={index}
              ref={fadeInElements}
              onMouseEnter={() => HoverIn(index)}
              onMouseLeave={() => HoverOut(index)}
              className="w-full sm:w-[31%] p-4 sm:p-6 lg:p-8 xl:p-9 bg-card-bg text-text-secondary shadow-soft flex flex-col items-start justify-start hover:text-text-primary hover:transform hover:scale-105 transition-all duration-300"
            >
              <div ref={hoverRotateIcons}>{serviceCard.icon()}</div>
              <h2 className="w-full text-lg text-text-primary sm:text-xl font-[500] mt-3 sm:mt-4 text-start">
                {serviceCard.title}
              </h2>
              <p className="mt-4 sm:mt-6 text-text-secondary text-start leading-6 sm:leading-7 text-sm sm:text-base">
                {serviceCard.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
//=======================================================================//
export default Services;
