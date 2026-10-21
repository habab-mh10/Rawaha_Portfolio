import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProjects } from "../api/project.api";
import projectImg1 from "../assets/images/p1.png";
import projectImg2 from "../assets/images/p2.png";
import projectImg4 from "../assets/images/p4.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ProjectDetailModal from "./ProjectDetailModal";

gsap.registerPlugin(ScrollTrigger);

/* ─── static fallback (only used when backend is unreachable) ─── */
const FALLBACK = [
  {
    _id: "fb1",
    projectImage:       projectImg1,
    projectTitle:       "E-Commerce Website",
    projectDescription: "Full-stack e-commerce app with React, Node.js, authentication, product management and payment integration.",
    projectLink:        "https://minishopofrawaha.netlify.app/",
  },
  {
    _id: "fb2",
    projectImage:       projectImg2,
    projectTitle:       "Kite",
    projectDescription: "Cinematic MERN web app featuring GSAP animations, interactive UI components and modern React architecture.",
    projectLink:        "https://kite-one-tan.vercel.app/",
  },
  {
    _id: "fb3",
    projectImage:       projectImg4,
    projectTitle:       "Demo Dashboard",
    projectDescription: "High-performance analytics dashboard with cinematic animations, built for scale and visual impact.",
    projectLink:        "https://demo-dashboard-seven-hazel.vercel.app/",
  },
];

/* ─── map a raw backend project to the shape the card needs ─── */
const mapProject = (p) => ({
  _id:                p._id,
  projectImage:       p.images?.[0]?.url || p.video?.thumbnail || projectImg1,
  projectVideo:       p.video?.url       || null,
  projectTitle:       p.title,
  projectDescription: p.shortDescription || p.description || "",
  projectLink:        p.liveUrl          || "#",
  hasLiveUrl:         Boolean(p.liveUrl),
  category:           p.category         || 'Other',
  technologies:       p.technologies     || [],
  fullDescription:    p.description      || "",
  allImages:          p.images           || [],
});

const FeaturedProjects = () => {
  const [projects,      setProjects]      = useState(FALLBACK);
  const [hoveredIndex,  setHoveredIndex]  = useState(null);
  const [currentIcon,   setCurrentIcon]   = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal,     setShowModal]     = useState(false);
  const videoRefs = useRef([]);

  /* ── handle eye icon click — opens detail modal ── */
  const handleViewDetails = (project, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  /* ── fade-in refs ── */
  const fadeRefs = useRef([]);
  fadeRefs.current = [];
  const addFadeRef = (el) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };

  /* ── GSAP scroll animations — run whenever projects change ── */
  useEffect(() => {
    if (fadeRefs.current.length === 0) return;
    fadeRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          duration: 0.5,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, [projects]);

  /* ── fetch: try featured=true first, fall back to first 3 published ── */
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        /* ① ask backend for featured & published projects, max 3 */
        const featuredRes = await getProjects({ featured: "true", limit: 3 });
        const featuredList = (featuredRes?.data ?? []).filter(
          (p) => p.published && p.featured,
        );

        if (featuredList.length > 0) {
          setProjects(featuredList.map(mapProject));
          return;
        }

        /* ② no featured projects — fall back to 3 most-recent published */
        const allRes = await getProjects({ limit: 3 });
        const recentList = (allRes?.data ?? []).filter((p) => p.published).slice(0, 3);

        if (recentList.length > 0) {
          setProjects(recentList.map(mapProject));
        }
        /* ③ nothing yet — FALLBACK already in state, keep it */
      } catch (err) {
        console.error("FeaturedProjects fetch error:", err);
        /* FALLBACK already in state */
      }
    };

    fetchFeatured();
  }, []);

  /* ── video hover handlers ── */
  const handleMouseEnter = (idx) => {
    setHoveredIndex(idx);
    videoRefs.current[idx]?.play().catch(() => {});
  };

  const handleMouseLeave = (idx) => {
    setHoveredIndex(null);
    const v = videoRefs.current[idx];
    if (v) { v.pause(); v.currentTime = 0; }
  };

  return (
    <section id="Works" aria-labelledby="works-heading" className="w-full p-2 sm:p-4 bg-card-bg">
      {/* ── heading ── */}
      <div className="w-full p-2 mt-16 sm:p-4 flex flex-col justify-center items-center">
        <p className="text-text-secondary uppercase text-sm sm:text-base">Portfolio</p>
        <h1
          id="works-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center mt-2 sm:mt-4"
        >
          My Works
        </h1>
      </div>

      {/* ── cards grid ── */}
      <div className="w-full flex flex-wrap justify-center items-stretch gap-8 mt-10 mb-16">
        {projects.map((project, index) => (
          <div
            key={project._id}
            ref={addFadeRef}
            className="w-[95%] lg:w-[30%] md:w-[95%] overflow-hidden shadow-depth bg-[var(--neo-bg)] border border-glass transition-all duration-500 hover:border-text-primary flex flex-col"
          >
            {/* ── media ── */}
            <div
              className="w-full h-64 overflow-hidden relative flex-shrink-0"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* image — always rendered; hidden on hover only when video exists */}
              <img
                src={project.projectImage}
                alt={project.projectTitle}
                loading="lazy"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  project.projectVideo && hoveredIndex === index
                    ? "opacity-0 scale-105"
                    : "opacity-100 hover:scale-105"
                }`}
                onError={(e) => { e.currentTarget.src = projectImg1; }}
              />

              {/* video — only when project has one */}
              {project.projectVideo && (
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={project.projectVideo}
                  muted
                  loop
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </div>

            {/* ── card body ── */}
            <div className="p-6 flex flex-col gap-3 flex-1">
              <h2 className="text-2xl font-semibold text-text-primary">
                {project.projectTitle}
              </h2>

              <p className="text-text-secondary text-sm sm:text-base leading-relaxed line-clamp-3">
                {project.projectDescription}
              </p>

              <div className="mt-2 flex items-center gap-3">
                {/* View Live button */}
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCurrentIcon(index)}
                  onMouseLeave={() => setCurrentIcon(null)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-semibold
                    bg-accent-primary text-text-primary
                    border-[1px] border-[var(--accent-primary)]
                    transition-all duration-[400ms] ease-in-out
                    hover:bg-transparent hover:border-[var(--accent-hover)]"
                >
                  View Live
                  <span className="relative w-5 h-5">
                    <ArrowForwardIcon
                      fontSize="small"
                      className={`absolute top-0 left-0 transition-all duration-300 ${
                        currentIcon === index ? "opacity-0 -translate-x-1" : "opacity-100 translate-x-0"
                      }`}
                    />
                    <ArrowOutwardIcon
                      fontSize="small"
                      className={`absolute top-0 left-0 transition-all duration-300 ${
                        currentIcon === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                      }`}
                    />
                  </span>
                </a>

                {/* Eye icon button — opens project detail modal */}
                <button
                  onClick={(e) => handleViewDetails(project, e)}
                  aria-label={`View details for ${project.projectTitle}`}
                  className="inline-flex items-center justify-center w-10 h-10 text-text-secondary
                    border-[1px] border-[var(--card-border)]
                    transition-all duration-300
                    hover:text-text-primary hover:border-[var(--accent-primary)]
                    cursor-pointer"
                >
                  <VisibilityIcon fontSize="small" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── view all CTA ── */}
      <div className="w-full flex items-center justify-center mb-10">
        <Link
          to="/myportfolio"
          className="inline-flex gap-2 items-center justify-center px-8 py-3
            text-sm font-semibold text-text-primary
            border-[1px] border-[var(--accent-primary)] bg-[var(--accent-primary)]
            transition-all duration-[400ms] ease-in-out
            hover:bg-transparent hover:border-[var(--accent-hover)]"
        >
          View All Projects
          <ArrowForwardIcon style={{ fontSize: 18 }} />
        </Link>
      </div>

      {/* Project Detail Modal */}
      {showModal && selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default FeaturedProjects;
