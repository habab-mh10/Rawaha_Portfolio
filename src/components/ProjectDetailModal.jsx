import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

/**
 * ProjectDetailModal
 * - Rendered via ReactDOM.createPortal (same as SendModal)
 * - Centered overlay with backdrop-blur, body scroll locked
 * - Left: project image / video  |  Right: title, description, tech, CTA
 */
const ProjectDetailModal = ({ project, onClose }) => {
  const [activeMedia, setActiveMedia] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Build media list — video first, then images
  const mediaList = [];
  if (project.projectVideo) mediaList.push({ type: "video", url: project.projectVideo });
  if (project.projectImage) mediaList.push({ type: "image", url: project.projectImage });
  if (project.allImages && Array.isArray(project.allImages)) {
    project.allImages.forEach((img) => {
      if (img.url && img.url !== project.projectImage) {
        mediaList.push({ type: "image", url: img.url });
      }
    });
  }

  // Escape key + body scroll lock
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center px-4 py-6"
      style={{ zIndex: 99999 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card — same shell as SendModal */}
      <div
        className="relative z-10 bg-[var(--card-bg)] border border-[var(--card-border)] w-full max-w-4xl shadow-2xl"
        style={{ animation: "modalFadeIn 0.25s ease", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — top-right, same style as SendModal */}
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
        >
          <CloseIcon />
        </button>

        {/* ── Split layout ── */}
        <div className="flex flex-col lg:flex-row" style={{ maxHeight: "90vh" }}>

          {/* LEFT — media */}
          <div className="w-full lg:w-1/2 bg-black flex flex-col flex-shrink-0" style={{ maxHeight: "90vh" }}>
            {/* Main media — relative so the fullscreen button can sit on top */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden" style={{ minHeight: 260 }}>
              {mediaList[activeMedia]?.type === "video" ? (
                <video
                  src={mediaList[activeMedia].url}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-contain"
                  style={{ maxHeight: "calc(90vh - 80px)" }}
                />
              ) : (
                <img
                  src={mediaList[activeMedia]?.url || project.projectImage}
                  alt={project.projectTitle}
                  className="w-full h-full object-cover"
                  style={{ maxHeight: "calc(90vh - 80px)" }}
                />
              )}

              {/* ── Fullscreen toggle button ── */}
              <button
                onClick={() => setIsFullscreen((prev) => !prev)}
                aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
                className="absolute top-3 left-3 w-9 h-9 flex items-center justify-center
                  bg-black/50 hover:bg-[var(--accent-primary)] rounded-full
                  text-white transition-colors duration-200"
              >
                {isFullscreen
                  ? <FullscreenExitIcon sx={{ fontSize: 20 }} />
                  : <FullscreenIcon sx={{ fontSize: 20 }} />
                }
              </button>
            </div>

            {/* Thumbnails strip */}
            {mediaList.length > 1 && (
              <div className="flex gap-2 p-3 bg-black/80 overflow-x-auto flex-shrink-0">
                {mediaList.map((media, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMedia(idx)}
                    className={`flex-shrink-0 w-14 h-14 overflow-hidden border-2 transition-all duration-200 ${
                      activeMedia === idx
                        ? "border-[var(--accent-primary)] opacity-100"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    {media.type === "video"
                      ? <video src={media.url} className="w-full h-full object-cover" muted />
                      : <img src={media.url} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    }
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Fullscreen overlay — renders over everything when active ── */}
          {isFullscreen && ReactDOM.createPortal(
            <div
              className="fixed inset-0 bg-black flex items-center justify-center"
              style={{ zIndex: 999999 }}
              onClick={() => setIsFullscreen(false)}
            >
              {mediaList[activeMedia]?.type === "video" ? (
                <video
                  src={mediaList[activeMedia].url}
                  controls
                  autoPlay
                  loop
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <img
                  src={mediaList[activeMedia]?.url || project.projectImage}
                  alt={project.projectTitle}
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              {/* Exit fullscreen button */}
              <button
                onClick={() => setIsFullscreen(false)}
                aria-label="Exit fullscreen"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
                  bg-black/60 hover:bg-[var(--accent-primary)] rounded-full
                  text-white transition-colors duration-200"
              >
                <FullscreenExitIcon sx={{ fontSize: 22 }} />
              </button>
            </div>,
            document.body
          )}

          {/* RIGHT — details, scrollable independently */}
          <div
            className="w-full lg:w-1/2 p-8 sm:p-10 font-syne flex flex-col gap-5 overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            {/* Category badge */}
            {project.category && (
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] w-fit">
                {project.category}
              </span>
            )}

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight">
              {project.projectTitle}
            </h2>

            {/* Divider */}
            <div className="w-full h-px bg-[var(--card-border)]" />

            {/* Description */}
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                About this project
              </p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {project.fullDescription || project.projectDescription}
              </p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs border border-[var(--card-border)] text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="w-full h-px bg-[var(--card-border)]" />

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.hasLiveUrl && project.projectLink ? (
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-4
                    border border-[var(--accent-primary)] bg-[var(--accent-primary)]
                    text-text-primary text-sm font-semibold
                    hover:bg-transparent hover:border-[var(--accent-hover)]
                    transition-all duration-[400ms] ease-in-out"
                >
                  View Live
                  <ArrowOutwardIcon sx={{ fontSize: 18 }} />
                </a>
              ) : (
                <p className="text-xs text-[var(--text-secondary)] italic">
                  This project is showcased within the portfolio.
                </p>
              )}

              <button
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 p-4
                  border border-[var(--card-border)] text-[var(--text-secondary)] text-sm font-semibold
                  hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)]
                  transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectDetailModal;
