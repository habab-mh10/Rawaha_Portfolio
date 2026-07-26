import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CV from "../assets/Docs/MR_CV_2025.pdf"
import profileImg from "../assets/images/profile.png";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  //  =================== Fade In of Left content ===================//
  const fadeInFromLeft = React.useRef(null);
  React.useEffect(() => {
    gsap.fromTo(
      fadeInFromLeft.current,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: fadeInFromLeft.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
  //  =============================================================//

  //  =================== Fade In of Right content ===================//
  const fadeInFromRight = React.useRef(null);
  React.useEffect(() => {
    gsap.fromTo(
      fadeInFromRight.current,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: fadeInFromRight.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
  //  =============================================================//

  // ===================== JSX Return ======================//
  return (
    <>
      <section
        id="About"
        className="w-full flex items-center justify-center mt-6 md:mt-10 mb-6 md:mb-10 px-4 sm:px-6 lg:px-0"
      >
        <div className="w-full lg:w-[95%] xl:w-[85%] flex flex-col lg:flex-row flex-wrap items-center justify-center lg:justify-evenly gap-8 lg:gap-4">
          {/* ==================== Left side Contents ======================= */}
          <div
            ref={fadeInFromLeft}
            className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-2/5 p-4 sm:p-6 lg:p-8 xl:p-10 border-[1px] border-card"
          >
            <div className="w-full object-fill">
              <img
                src={profileImg}
                alt="profile-image"
                className="w-full object-fill"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-center mt-4 sm:mt-5">
              Muhammad Rawaha
            </h1>
            <div className="flex justify-center items-center">
              <div className="mt-3 px-4 sm:px-6 py-2 inline-flex items-center gap-4 sm:gap-6 border-[1.5px] border-card">
                <p className="text-sm sm:text-base">Available for Work</p>
                <div className="relative">
                  <span className="absolute block w-2 h-2 rounded-full bg-accent-primary animate-bigPing"></span>
                  <span className="relative block w-2 h-2 rounded-full bg-accent-primary"></span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <div className="flex gap-4 sm:gap-6">
                <WhatsAppIcon
                  sx={{
                    fontSize: { xs: "36px", sm: "40px", md: "43px" },
                    color: "var(--text-secondary)",
                    padding: "8px",
                    border: "1px solid var(--card-border)",
                    cursor: "pointer",
                    "&:hover": { color: "var(--text-primary)" },
                  }}
                  onClick={() => {
                    window.open("https://wa.me/+923028053159");
                  }}
                />
                <LinkedInIcon
                  sx={{
                    fontSize: { xs: "36px", sm: "40px", md: "43px" },
                    color: "var(--text-secondary)",
                    padding: "8px",
                    border: "1px solid var(--card-border)",
                    cursor: "pointer",
                    "&:hover": { color: "var(--text-primary)" },
                  }}
                  onClick={() => {
                    window.open(
                      "https://www.linkedin.com/in/muhammad-rawaha-1ab54b34b/"
                    );
                  }}
                />
                <GitHubIcon
                  sx={{
                    fontSize: { xs: "36px", sm: "40px", md: "43px" },
                    color: "var(--text-secondary)",
                    padding: "8px",
                    border: "1px solid var(--card-border)",
                    cursor: "pointer",
                    "&:hover": { color: "var(--text-primary)" },
                  }}
                  onClick={() => {
                    window.open("https://github.com/Rawaha-mr11");
                  }}
                />
                <InstagramIcon
                  sx={{
                    fontSize: { xs: "36px", sm: "40px", md: "43px" },
                    color: "var(--text-secondary)",
                    padding: "8px",
                    border: "1px solid var(--card-border)",
                    cursor: "pointer",
                    "&:hover": { color: "var(--text-primary)" },
                  }}
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/muhammad_rawaha_mr11/"
                    );
                  }}
                />
              </div>
            </div>
          </div>

          {/* ======================= Right side Contents ========================= */}
          <div
            ref={fadeInFromRight}
            className="w-full lg:w-2/4 xl:w-2/4 flex flex-col flex-wrap"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-6 lg:mt-12 leading-tight">
              Hello, I'm Muhammad Rawaha,{" "}
              <span className="block sm:inline-block mt-2 sm:mt-0 px-1 border-card border-[1.3px] sm:border-r-0 align-middle">
                Website
              </span>{" "}
              <span className="block sm:inline-block mt-2 sm:mt-0 px-1 border-card border-[1.3px] sm:border-l-0 sm:border-r-0 align-middle">
                Developer and Data
              </span>{" "}
              <span className="block sm:inline-block mt-2 sm:mt-0 px-1 border-card border-[1.3px] sm:border-l-0 align-middle">
                Specialist
              </span>{" "}
              Based in Pakistan
            </h1>

            <button onClick={() => window.open(CV, "_blank")} className="w-fit sm:w-fit mt-6 sm:mt-8 lg:mt-10 p-4 sm:p-5 text-sm sm:text-[14px] font-semibold text-text-primary border-[1px] border-[var(--accent-primary)] bg-[var(--accent-primary)] transition-all duration-[400ms] ease-in-out hover:text-text-primary hover:border-[var(--accent-hover)] hover:bg-transparent flex items-center justify-center gap-2">
              Download CV{" "}
              <FileDownloadOutlinedIcon
                style={{ fontSize: "18px", fontWeight: "600" }}
              />
            </button>

            <div className="flex flex-col sm:flex-row flex-wrap justify-between sm:justify-evenly mt-6 sm:mt-8 lg:mt-9 sm:gap-0">
              <div className="w-full sm:w-1/2 whitespace-nowrap text-text-secondary text-base sm:text-md font-[500] leading-8 sm:leading-10 pl-4">
                <li>MERN Stack Development</li>
                <li>Web Design (Modern Interfaces)</li>
                <li>UI / UX Designing</li>
                <li>Mobile & Web App Development</li>
              </div>
              <div className="w-full sm:w-1/2 text-text-secondary text-base sm:text-md font-[500] leading-8 sm:leading-10 pl-4">
                <li>Access DB Management</li>
                <li>Excel Data Entry & Automation</li>
                <li>Data Cleaning & Formatting</li>
                <li>Data Analysis & Reporting</li>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;