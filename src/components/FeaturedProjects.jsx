import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectImg1 from "../assets/images/p1.png";
import projectImg2 from "../assets/images/p2.png";
import projectImg4 from "../assets/images/p4.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";


gsap.registerPlugin(ScrollTrigger);


const Portfolio = () => {
  // ================= Fade-in Animation ==================//
  const FadeIn = useRef([]);

  FadeIn.current = [];

  const fadeInElements = (el) => {
    if (el && !FadeIn.current.includes(el)) {
      FadeIn.current.push(el);
    }
  };

  React.useEffect(() => {
    FadeIn.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          duration: 0.4,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            start: "top 90%",
            trigger: el,
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  // =====================================================//

  // ================== Projects cards data and Pics ===================
  const [currentIcon, setCurrentIcon] = useState(null);

  const myProjects = [
    {
      projectImage: projectImg1,
      projectTitle: "E-Commerce Website",
      projectDescription:
        "Made a full-stack e-commerce website using React for the frontend and Node.js for the backend. Implemented features like user authentication, product management, and payment integration.",
      projectLink: "https://minishopofrawaha.netlify.app/",
    },
    {
      projectImage: projectImg2,
      projectTitle: "Kite",
      projectDescription:
        "A responsive full-stack MERN web application featuring cinematic GSAP animations, interactive UI components, responsive layouts, and a modern React-based frontend.",
      projectLink: "https://kite-eight-eta.vercel.app/",
    },
    {
      projectImage: projectImg4,
      projectTitle: "Demo Dashboard",
      projectDescription:
        "Built with HTML, CSS, JS, possibly React or a JS framework . Static setup ensures high performance, low maintenance, and scalability. it is highly cinematic animated website.",
      projectLink: "https://demo-dashboard-seven-hazel.vercel.app/",
    },
  ];
  // =====================================================================//

  // ===================== JSX Return =========================//
  return (
    <section id="Works" aria-labelledby="Works" className="w-full p-2 sm:p-4 bg-card-bg">
      <div className="w-full p-2 mt-16 sm:p-4 flex flex-col justify-center items-center">
        <p className="text-text-secondary uppercase text-sm sm:text-base">
          Portfolio
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center mt-2 sm:mt-4">
          My Works
        </h1>
      </div>

      <div className="w-full flex flex-wrap justify-center items-center gap-8 mt-10 mb-16">
        {myProjects.map((project, index) => (
          <div
            key={index}
            ref={fadeInElements}
            className="w-[95%] lg:w-[30%] md:w-[95%] overflow-hidden shadow-depth bg-[--neo-bg] border border-glass transition-all duration-500 hover:border-text-primary"
          >
            <div className="w-full h-64 overflow-hidden">
              <img
                src={project.projectImage}
                alt={project.projectTitle}
                className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
              />
            </div>

            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-text-primary">
                {project.projectTitle}
              </h2>

              <p className="text-text-secondary">
                {project.projectDescription}
              </p>

              <div className="h-20 w-full -mb-3 overflow-hidden relative">
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[48%] mt-4 inline-flex items-center justify-center gap-2 bg-accent-primary text-text-secondary text-center px-6 py-2 hover:bg-[--neo-bg] hover:text-text-primary hover:border-[1.2px] hover:border-accent-secondary transition-all duration-500 relative"
                  onMouseEnter={() => setCurrentIcon(index)}
                  onMouseLeave={() => setCurrentIcon(null)}
                >
                  View Live
                  <span className="relative w-5 h-5">
                    <ArrowForwardIcon
                      className={`absolute top-0 left-0 transition-all duration-1000 ${currentIcon === index
                        ? "opacity-0 transition-all duration-1000 -translate-x-2"
                        : "opacity-100 transition-all duration-1000 -translate-x-0"
                        }`}
                      fontSize="small"
                    />
                    <ArrowOutwardIcon
                      className={`absolute top-0 left-0 transition-all duration-1000 ${currentIcon === index
                        ? "opacity-100 transition-all duration-1000 -translate-x-0"
                        : "opacity-0 transition-all duration-1000 -translate-x-2"
                        }`}
                      fontSize="small"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center mb-10">
        <Link
          to="/portfolio"
          className="inline-flex gap-2 items-center justify-center px-8 py-3 text-sm font-semibold text-text-primary border-[1px] border-[var(--accent-primary)] bg-[var(--accent-primary)] transition-all duration-[400ms] ease-in-out hover:text-text-primary hover:border-[var(--accent-hover)] hover:bg-transparent"
        >
          View Live
          <ArrowForwardIcon className="w-4 h-4"/>
        </Link>
      </div>
    </section>
  );
};

export default Portfolio;
