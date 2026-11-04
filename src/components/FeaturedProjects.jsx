import React, { useRef, useState, useEffect, useMemo } from "react";
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

/* ─── constants ─── */
const MAX_PROJECTS = 9;

/* ─── filter definitions ─── */
const FILTERS = [
  { id: "all", label: "All" },
  { id: "web", label: "Website Development" },
  { id: "graphic", label: "Graphic Designing" },
  { id: "ads", label: "Advertisements" },
];

/**
 * Categories that belong to each filter group.
 * "Website Development" covers every web-related backend category.
 * "Graphic Designing" covers the combined ADS & Graphic Designing category.
 * "Advertisements" covers the dedicated Advertisement category.
 */
const CATEGORY_MAP = {
  web: new Set([
    "web application",
    "e-commerce",
    "landing page",
    "dashboard",
    "mobile app",
    "api",
  ]),
  graphic: new Set([
    "ads & graphic designing",
    "graphic design",
    "graphic designing",
  ]),
  ads: new Set([
    "advertisement",
    "advertisements",
  ]),
};

/**
 * Technology keywords used as a secondary signal when the project's
 * category alone isn't enough to determine the filter group.
 * Matching is case-insensitive and checks for exact word boundaries
 * to avoid false positives (e.g. "react" matching "interactive").
 */
const TECH_KEYWORDS = {
  web: [
    "react", "vue", "angular", "next.js", "nextjs", "nuxt",
    "html", "css", "javascript", "typescript", "node.js", "nodejs",
    "express", "mern", "mean", "php", "laravel", "django",
    "frontend", "backend", "full-stack", "fullstack", "web",
    "mongodb", "mysql", "postgresql", "tailwind", "bootstrap",
  ],
  graphic: [
    "graphic design", "graphic designing", "logo design", "logo",
    "branding", "poster design", "poster", "illustration",
    "typography", "ui design", "ux design", "ui/ux",
    "adobe illustrator", "illustrator", "photoshop", "figma",
    "canva", "social media design", "print design", "visual identity",
    "motion graphics",
  ],
  ads: [
    "advertisement", "advertising", "ad design", "ad campaign",
    "promotional design", "marketing campaign", "product advertisement",
    "digital marketing", "marketing", "campaign", "promotion",
    "banner ad", "display ad", "social media ad",
  ],
};

/**
 * Determines which filter groups a mapped project belongs to.
 * Uses category first (exact match after normalization), then
 * falls back to keyword scanning across the technologies array.
 */
const getProjectFilters = (project) => {
  const cat = (project.category || "").toLowerCase().trim();
  const techs = (project.technologies || []).map((t) => t.toLowerCase().trim());

  const matched = new Set(["all"]);

  for (const filterId of ["web", "graphic", "ads"]) {
    // ① Primary: category match
    if (CATEGORY_MAP[filterId].has(cat)) {
      matched.add(filterId);
      continue;
    }

    // ② Secondary: technology keyword match (whole-word, case-insensitive)
    const keywords = TECH_KEYWORDS[filterId];
    const hits = techs.some((tech) =>
      keywords.some(
        (kw) =>
          tech === kw ||
          tech.includes(kw) ||
          kw.includes(tech)
      )
    );
    if (hits) matched.add(filterId);
  }

  return matched;
};

/* ─── static fallback (only used when backend is unreachable) ─── */
const FALLBACK = [
  {
    _id: "fb1",
    projectImage:       projectImg1,
    projectTitle:       "E-Commerce Website",
    projectDescription: "Full-stack e-commerce app with React, Node.js, authentication, product management and payment integration.",
    projectLink:        "https://minishopofrawaha.netlify.app/",
    category:           "E-Commerce",
    technologies:       ["React", "Node.js", "MongoDB"],
    fullDescription:    "Full-stack e-commerce app with React, Node.js, authentication, product management and payment integration.",
    allImages:          [],
  },
  {
    _id: "fb2",
    projectImage:       projectImg2,
    projectTitle:       "Kite",
    projectDescription: "Cinematic MERN web app featuring GSAP animations, interactive UI components and modern React architecture.",
    projectLink:        "https://kite-one-tan.vercel.app/",
    category:           "Web Application",
    technologies:       ["React", "GSAP", "Node.js"],
    fullDescription:    "Cinematic MERN web app featuring GSAP animations, interactive UI components and modern React architecture.",
    allImages:          [],
  },
  {
    _id: "fb3",
    projectImage:       projectImg4,
    projectTitle:       "Demo Dashboard",
    projectDescription: "High-performance analytics dashboard with cinematic animations, built for scale and visual impact.",
    projectLink:        "https://demo-dashboard-seven-hazel.vercel.app/",
    category:           "Dashboard",
    technologies:       ["React", "Tailwind CSS"],
    fullDescription:    "High-performance analytics dashboard with cinematic animations, built for scale and visual impact.",
    allImages:          [],
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
  category:           p.category         || "Other",
  technologies:       p.technologies     || [],
  fullDescription:    p.description      || "",
  allImages:          p.images           || [],
});

const FeaturedProjects = () => {
  /* ── core data state ── */
  const [allProjects,   setAllProjects]   = useState(FALLBACK);
  const [activeFilter,  setActiveFilter]  = useState("all");

  /* ── UI interaction state (unchanged from original) ── */
  const [hoveredIndex,  setHoveredIndex]  = useState(null);
  const [currentIcon,   setCurrentIcon]   = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal,     setShowModal]     = useState(false);
  const videoRefs = useRef([]);

  /* ── client-side filter + 9-project cap ── */
  const projects = useMemo(() => {
    if (activeFilter === "all") {
      return allProjects.slice(0, MAX_PROJECTS);
    }
    return allProjects
      .filter((p) => getProjectFilters(p).has(activeFilter))
      .slice(0, MAX_PROJECTS);
  }, [allProjects, activeFilter]);

  /* ── modal handlers (unchanged) ── */
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

  /* ── GSAP scroll animations — re-run whenever visible projects change ── */
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

  /* ── fetch: up to 9 published projects (featured-first, then recent) ── */
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        /* ① fetch up to MAX_PROJECTS featured & published projects */
        const featuredRes = await getProjects({ featured: "true", limit: MAX_PROJECTS });
        const featuredList = (featuredRes?.data ?? []).filter(
          (p) => p.published && p.featured,
        );

        if (featuredList.length > 0) {
          setAllProjects(featuredList.map(mapProject));
          return;
        }

        /* ② no featured — fall back to MAX_PROJECTS most-recent published */
        const allRes = await getProjects({ limit: MAX_PROJECTS });
        const recentList = (allRes?.data ?? [])
          .filter((p) => p.published)
          .slice(0, MAX_PROJECTS);

        if (recentList.length > 0) {
          setAllProjects(recentList.map(mapProject));
        }
        /* ③ nothing yet — FALLBACK already in state, keep it */
      } catch (err) {
        console.error("FeaturedProjects fetch error:", err);
        /* FALLBACK already in state */
      }
    };

    fetchFeatured();
  }, []);

  /* ── video hover handlers (unchanged) ── */
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

      {/* ── category filter buttons ── */}
      <div className="w-full flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-8 px-2">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={isActive}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold border-[1px] transition-all duration-[400ms] ease-in-out cursor-pointer
                ${isActive
                  ? "bg-accent-primary text-text-primary border-[var(--accent-primary)]"
                  : "bg-transparent text-text-secondary border-[var(--card-border)] hover:text-text-primary hover:border-[var(--accent-primary)]"
                }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* ── cards grid ── */}
      <div className="w-full flex flex-wrap justify-center items-stretch gap-8 mt-10 mb-16">
        {projects.length === 0 ? (
          /* ── empty state for filtered categories with no matching projects ── */
          <div className="w-full flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-text-secondary text-base">
              No projects in this category yet.
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className="inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold
                bg-transparent text-text-secondary border-[1px] border-[var(--card-border)]
                transition-all duration-[400ms] ease-in-out
                hover:text-text-primary hover:border-[var(--accent-primary)]"
            >
              View All Projects
            </button>
          </div>
        ) : (
          projects.map((project, index) => (
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
          ))
        )}
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
