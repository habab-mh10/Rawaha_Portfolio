import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProjects } from "../api/project.api";
import projectImg1 from "../assets/images/p1.png";
import projectImg2 from "../assets/images/p2.png";
import projectImg3 from "../assets/images/p3.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ProjectDetailModal from "./ProjectDetailModal";

gsap.registerPlugin(ScrollTrigger);

/* ─── static fallback shown only when the backend is unreachable ─── */
const FALLBACK = [
  {
    _id: "fb1",
    projectImage:       projectImg1,
    projectVideo:       null,
    projectTitle:       "E-Commerce Website",
    projectDescription: "Full-stack e-commerce app with React, Node.js, authentication, product management and payment integration.",
    projectLink:        "https://minishopofrawaha.netlify.app/",
    hasLiveUrl:         true,
    category:           "E-Commerce",
    technologies:       ["React", "Node.js", "MongoDB"],
    fullDescription:    "Full-stack e-commerce app with React, Node.js, authentication, product management and payment integration.",
  },
  {
    _id: "fb2",
    projectImage:       projectImg2,
    projectVideo:       null,
    projectTitle:       "Kite",
    projectDescription: "Cinematic MERN web app featuring GSAP animations, interactive UI components and modern React architecture.",
    projectLink:        "https://kite-eight-eta.vercel.app/",
    hasLiveUrl:         true,
    category:           "Web Application",
    technologies:       ["React", "GSAP", "Node.js"],
    fullDescription:    "Cinematic MERN web app featuring GSAP animations, interactive UI components and modern React architecture.",
  },
  {
    _id: "fb3",
    projectImage:       projectImg3,
    projectVideo:       null,
    projectTitle:       "Aspor A-633",
    projectDescription: "High-performance cinematic website built with HTML, CSS, JavaScript for maximum speed and visual impact.",
    projectLink:        "https://aspor-a-633.vercel.app/",
    hasLiveUrl:         true,
    category:           "Landing Page",
    technologies:       ["HTML", "CSS", "JavaScript"],
    fullDescription:    "High-performance cinematic website built with HTML, CSS, JavaScript for maximum speed and visual impact.",
  },
  {
    _id: "fb4",
    projectImage:       projectImg1,
    projectVideo:       null,
    projectTitle:       "Demo Dashboard",
    projectDescription: "Analytics dashboard with cinematic animations, built for scale, maintainability and developer experience.",
    projectLink:        "https://demo-dashboard-seven-hazel.vercel.app/",
    hasLiveUrl:         true,
    category:           "Dashboard",
    technologies:       ["React", "Tailwind CSS"],
    fullDescription:    "Analytics dashboard with cinematic animations, built for scale, maintainability and developer experience.",
  },
];

/* ─── map a raw backend project to the card shape ─── */
const mapProject = (p) => ({
  _id:                p._id,
  projectImage:       p.images?.[0]?.url || p.video?.thumbnail || projectImg1,
  projectVideo:       p.video?.url       || null,
  projectTitle:       p.title,
  projectDescription: p.shortDescription || p.description || "",
  projectLink:        p.liveUrl          || null,
  hasLiveUrl:         Boolean(p.liveUrl),
  category:           p.category         || 'Other',
  technologies:       p.technologies     || [],
  fullDescription:    p.description      || "",
  allImages:          p.images           || [],
});

const Portfolio = () => {
  const [projects,      setProjects]      = useState(FALLBACK);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [hoveredIndex,  setHoveredIndex]  = useState(null);
  const [currentIcon,   setCurrentIcon]   = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal,     setShowModal]     = useState(false);
  const videoRefs = useRef([]);

  /* ── fade-in refs (rebuild after each render so new cards are included) ── */
  const fadeRefs  = useRef([]);
  fadeRefs.current = [];
  const addFadeRef = (el) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };

  /* ── GSAP: re-trigger after data arrives ── */
  useEffect(() => {
    if (loading || fadeRefs.current.length === 0) return;
    fadeRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          duration: 0.4,
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
  }, [loading, projects]);

  /* ── fetch ALL published projects (no featured filter) ── */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        /* backend GET /projects supports pagination; fetch a large page so
           we get all projects in one request for a typical portfolio size   */
        const response = await getProjects({ limit: 100 });
        const list = (response?.data ?? []).filter((p) => p.published);

        setProjects(list.length > 0 ? list.map(mapProject) : FALLBACK);
      } catch (err) {
        console.error("Portfolio fetch error:", err);
        setError("Failed to load projects");
        setProjects(FALLBACK);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* ── handle View Live click ── */
  const handleViewLive = (project, e) => {
    e.preventDefault();
    if (project.hasLiveUrl && project.projectLink) {
      window.open(project.projectLink, '_blank', 'noopener,noreferrer');
    } else {
      // No live URL — open detail modal instead
      setSelectedProject(project);
      setShowModal(true);
    }
  };

  /* ── handle eye icon click — always opens detail modal ── */
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

  /* ── render ── */
  return (
    <section id="Works" aria-labelledby="portfolio-heading" className="w-full p-2 sm:p-4 bg-card-bg">

      {/* heading */}
      <div className="w-full p-2 mt-16 sm:p-4 flex flex-col justify-center items-center">
        <p className="text-text-secondary uppercase text-sm sm:text-base">Portfolio</p>
        <h1
          id="portfolio-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center mt-2 sm:mt-4"
        >
          My Work
        </h1>
      </div>

      {/* grid */}
      <div className="w-full flex flex-wrap justify-center items-stretch gap-8 mt-10 mb-16">

        {loading ? (
          <div className="flex items-center justify-center py-20 w-full">
            <p className="text-text-secondary">Loading projects...</p>
          </div>

        ) : error ? (
          <div className="text-center py-20 w-full">
            <p className="text-text-secondary">{error}</p>
          </div>

        ) : projects.length === 0 ? (
          <div className="text-center py-20 w-full">
            <p className="text-text-secondary">No projects available yet.</p>
          </div>

        ) : (
          projects.map((project, index) => (
            <div
              key={project._id}
              ref={addFadeRef}
              className="w-[95%] lg:w-[30%] md:w-[95%] overflow-hidden shadow-depth bg-[var(--neo-bg)] border border-glass transition-all duration-500 hover:border-text-primary flex flex-col"
            >
              {/* media */}
              <div
                className="w-full h-64 overflow-hidden relative flex-shrink-0"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
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

              {/* body */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h2 className="text-2xl font-semibold text-text-primary">
                  {project.projectTitle}
                </h2>

                <p className="text-text-secondary text-sm sm:text-base leading-relaxed line-clamp-3">
                  {project.projectDescription}
                </p>

                <div className="mt-2 flex items-center gap-3">
                  {/* View Live button */}
                  <button
                    onClick={(e) => handleViewLive(project, e)}
                    onMouseEnter={() => setCurrentIcon(index)}
                    onMouseLeave={() => setCurrentIcon(null)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-semibold
                      bg-accent-primary text-text-primary
                      border-[1px] border-[var(--accent-primary)]
                      transition-all duration-[400ms] ease-in-out
                      hover:bg-transparent hover:border-[var(--accent-hover)]
                      cursor-pointer"
                  >
                    {project.hasLiveUrl ? 'View Live' : 'View Project'}
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
                  </button>

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
          ))
        )}
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

export default Portfolio;
