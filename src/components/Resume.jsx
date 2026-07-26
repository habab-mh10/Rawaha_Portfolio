import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

gsap.registerPlugin(ScrollTrigger);
const Resume = () => {
  // ================== Fade-in Animation for Elements ===================//
  const fadeInElements = React.useRef([]);
  fadeInElements.current = [];

  const fadeInElement = (el) => {
    if (el && !fadeInElements.current.includes(el)) {
      fadeInElements.current.push(el);
    }
  }
  React.useLayoutEffect(() => {
    fadeInElements.current.forEach((el) => {
      gsap.fromTo(
        el,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);
  // =============================================================//


  // ================== Resume & Experiences Data ===================
  const myExperiences = [
    {
      icon: () => (
        <HistoryEduIcon
          className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-text-secondary"
        />
      ),
      date: "2025 - present",
      Institue: "SMIT",
      discipline: "Web & App Development",
    },
    {
      icon: () => (
        <HistoryEduIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-text-secondary" />
      ),
      date: "July 2025 - present",
      Institue: "Experience",
      discipline: "Making Different Website for Portfolio Building up",
    },
    {
      icon: () => (
        <HistoryEduIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-text-secondary" />
      ),
      date: "Nov 2020 - present",
      Institue: "Data Entry",
      discipline: "Miccrosoft Excel, powerPoint, Word & Access Database Management",
    },
  ];

  const myResumes = [
    {
      icon: () => (
        <HistoryEduIcon
          className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-text-secondary"
        />
      ),
      date: "2024 - Present",
      Institue: "Dr of Physical Therapy",
      discipline: "Khyber Medical University Peshawar",
    },
    {
      icon: () => (
        <HistoryEduIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-text-secondary" />
      ),
      date: "2021 - 2023",
      Institue: "Higher Secondary Education",
      discipline: "Govt. Higher Secondary College Hayatabad Peshawar",
    },
    {
      icon: () => (
        <HistoryEduIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-text-secondary" />
      ),
      date: "2019 - 2021",
      Institue: "Matric (SSC)",
      discipline: "Govt. Higher Secondary School Hayatabad Peshawar",
    },
  ];
  // =============================================================//

  // ================== JSX Return ===================//
  return (
    <section id="Resume" className="w-full bg-card-bg px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto mt-8 sm:mt-12 lg:mt-16 flex flex-col justify-center items-center">
        <div className="text-center w-full">
          <p className="text-text-secondary uppercase text-sm sm:text-base">
            Experiences
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-relaxed text-center mt-2 sm:mt-4">
            Professional Resume
          </h1>
        </div>


        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12 mt-8 sm:mt-12 lg:mt-16 xl:mt-20">
          <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 border border-card">
            {myExperiences.map((myExperience, index) => (
              <div
                key={index}
                ref={fadeInElement}
                className={`flex gap-4 sm:gap-6 lg:gap-8 items-start ${
                  index !== myExperiences.length - 1
                    ? "border-b border-card pb-6 sm:pb-8 mb-6 sm:mb-8"
                    : ""
                }`}
              >
                <div className="w-12 h-12 flex-shrink-0 p-3 sm:p-4 bg-muted flex items-center justify-center">
                  {myExperience.icon()}
                </div>
                
                <div className="flex-1">
                  <p className="text-xs sm:text-sm lg:text-base text-text-secondary font-medium mb-1 sm:mb-2">
                    {myExperience.date}
                  </p>
                  <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold mb-2 sm:mb-3 text-text-primary">
                    {myExperience.Institue}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed">
                    {myExperience.discipline}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 border border-card">
            {myResumes.map((myResume, index) => (
              <div
                key={index}
                ref={fadeInElement}
                className={`flex gap-4 sm:gap-6 lg:gap-8 items-start ${
                  index !== myResumes.length - 1
                    ? "border-b border-card pb-6 sm:pb-8 mb-6 sm:mb-8"
                    : ""
                }`}
              >
                <div className="w-12 h-12 flex-shrink-0 p-3 sm:p-4 bg-muted flex items-center justify-center">
                  {myResume.icon()}
                </div>
                
                <div className="flex-1">
                  <p className="text-xs sm:text-sm lg:text-base text-text-secondary font-medium mb-1 sm:mb-2">
                    {myResume.date}
                  </p>
                  <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold mb-2 sm:mb-3 text-text-primary">
                    {myResume.Institue}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed">
                    {myResume.discipline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;