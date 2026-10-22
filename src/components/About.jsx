import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocalCV from "../assets/Docs/MR_CV_2026.pdf";
import profileImg from "../assets/images/profile.png";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { getPublicAboutProfile } from "../api/about.api";
import Team from "./Team";

gsap.registerPlugin(ScrollTrigger);

/* Fallback static content */
const FALLBACK = {
  name: "Muhammad Rawaha",
  headline: "Full-Stack Website Developer and Physical Therapist",
  biography: "I'm a passionate Full-Stack Developer based in Pakistan, specializing in building modern, high-performance web applications using the MERN stack. I combine technical expertise with creative design to deliver seamless digital experiences — from pixel-perfect UIs to robust backend APIs.",
  skills: [
    "MERN Stack Web Development",
    "React & Next.js Development",
    "Modern UI / UX Implementation",
    "REST API Development",
    "Graphic Designing",
    "Websites & Poster Designing",
    "Resumes Designing",
    "Adobe Illustrator and XD",
  ],
  socialLinks: {
    whatsapp: "https://wa.me/923028053159",
    linkedin: "www.linkedin.com/in/rawahamr11",
    github: "https://github.com/Rawaha-mr11",
    instagram: "https://www.instagram.com/muhammad_rawaha_mr11/",
  },
  profilePicture: { url: profileImg },
};

const About = () => {
  const [profile, setProfile] = useState(null);
  const fadeInFromLeft  = useRef(null);
  const fadeInFromRight = useRef(null);

  /* ── Fetch from backend ── */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getPublicAboutProfile();
        const data = res.data;
        if (data && data.name) setProfile(data);
      } catch {
        // keep FALLBACK
      }
    };
    fetchProfile();
  }, []);

  /* ── GSAP animations — run once on mount, not gated on loading ── */
  useEffect(() => {
    if (fadeInFromLeft.current) {
      gsap.fromTo(
        fadeInFromLeft.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: fadeInFromLeft.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    }
    if (fadeInFromRight.current) {
      gsap.fromTo(
        fadeInFromRight.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: fadeInFromRight.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    }
  }, []);

  /* Always render — use live data when available, FALLBACK otherwise */
  const p = profile || FALLBACK;

  /* CV URL — prefer Cloudinary, fall back to local bundle */
  const cvUrl = p.cv?.url || LocalCV;

  /* Split skills into two columns */
  const skills = (p.skills && p.skills.length > 0) ? p.skills : FALLBACK.skills;
  const leftSkills  = skills.slice(0, Math.ceil(skills.length / 2));
  const rightSkills = skills.slice(Math.ceil(skills.length / 2));

  const social = (p.socialLinks && Object.values(p.socialLinks).some(Boolean))
    ? p.socialLinks
    : FALLBACK.socialLinks;

  return (
    <>
      <section
        id="About"
        className="w-full flex items-center justify-center mt-6 md:mt-10 mb-6 md:mb-10 px-4 sm:px-6 lg:px-0"
      >
        <div className="w-full lg:w-[95%] xl:w-[85%] flex flex-col lg:flex-row flex-wrap items-center justify-center lg:justify-evenly gap-8 lg:gap-4">

          {/* ── Left: profile card ── */}
          <div
            ref={fadeInFromLeft}
            className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-2/5 p-4 sm:p-6 lg:p-8 xl:p-10 border-[1px] border-card"
          >
            <div className="w-full overflow-hidden">
              <img
                src={p.profilePicture?.url || profileImg}
                alt={`${p.name} - Full-Stack Web Developer`}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full object-cover"
                onError={(e) => { e.target.src = profileImg; }}
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-center mt-4 sm:mt-5">
              {p.name}
            </h1>

            {/* Available badge */}
            <div className="flex justify-center items-center mt-3">
              <div className="px-4 sm:px-6 py-2 inline-flex items-center gap-4 sm:gap-6 border-[1.5px] border-card">
                <p className="text-sm sm:text-base">Available for Work</p>
                <div className="relative">
                  <span className="absolute block w-2 h-2 rounded-full bg-accent-primary animate-bigPing" />
                  <span className="relative block w-2 h-2 rounded-full bg-accent-primary" />
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex justify-center items-center mt-4">
              <div className="flex gap-4 sm:gap-6">
                {social.whatsapp && (
                  <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <WhatsAppIcon sx={{ fontSize: { xs: "36px", sm: "40px", md: "43px" }, color: "var(--text-secondary)", padding: "8px", border: "1px solid var(--card-border)", cursor: "pointer", "&:hover": { color: "var(--text-primary)" } }} />
                  </a>
                )}
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <LinkedInIcon sx={{ fontSize: { xs: "36px", sm: "40px", md: "43px" }, color: "var(--text-secondary)", padding: "8px", border: "1px solid var(--card-border)", cursor: "pointer", "&:hover": { color: "var(--text-primary)" } }} />
                  </a>
                )}
                {social.github && (
                  <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <GitHubIcon sx={{ fontSize: { xs: "36px", sm: "40px", md: "43px" }, color: "var(--text-secondary)", padding: "8px", border: "1px solid var(--card-border)", cursor: "pointer", "&:hover": { color: "var(--text-primary)" } }} />
                  </a>
                )}
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstagramIcon sx={{ fontSize: { xs: "36px", sm: "40px", md: "43px" }, color: "var(--text-secondary)", padding: "8px", border: "1px solid var(--card-border)", cursor: "pointer", "&:hover": { color: "var(--text-primary)" } }} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── Right: bio + skills ── */}
          <div
            ref={fadeInFromRight}
            className="w-full lg:w-2/4 xl:w-2/4 flex flex-col flex-wrap"
          >
            {/* Dynamic headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-6 lg:mt-12 leading-tight">
              Hello, I'm {p.name},{" "}
              {(p.headline || FALLBACK.headline).split(" ").map((word, i) => (
                <span
                  key={i}
                  className="inline-block mt-2 px-1 border-card border-[1.3px] align-middle mr-1"
                >
                  {word}
                </span>
              ))}
              {" "}Based in Pakistan
            </h1>

            {/* CV button */}
            <button
              onClick={() => window.open(cvUrl, "_blank")}
              className="w-fit mt-6 sm:mt-8 lg:mt-10 p-4 sm:p-5 text-sm sm:text-[14px] font-semibold text-text-primary border-[1px] border-[var(--accent-primary)] bg-[var(--accent-primary)] transition-all duration-[400ms] ease-in-out hover:text-text-primary hover:border-[var(--accent-hover)] hover:bg-transparent flex items-center justify-center gap-2"
            >
              Download CV
              <FileDownloadOutlinedIcon style={{ fontSize: "18px", fontWeight: "600" }} />
            </button>

            {/* Skills */}
            <div className="flex flex-col sm:flex-row flex-wrap mt-6 sm:mt-8 lg:mt-9">
              <div className="w-full sm:w-1/2 text-text-secondary text-base sm:text-md font-[500] leading-8 sm:leading-10 pl-4">
                {leftSkills.map((s, i) => <li key={i}>{s}</li>)}
              </div>
              <div className="w-full sm:w-1/2 text-text-secondary text-base sm:text-md font-[500] leading-8 sm:leading-10 pl-4">
                {rightSkills.map((s, i) => <li key={i}>{s}</li>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
