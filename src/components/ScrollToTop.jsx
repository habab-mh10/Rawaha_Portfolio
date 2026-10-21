import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTop = () => {
  const [show,     setShow]     = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      // Throttle: only run once per animation frame
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const scrollTop      = window.scrollY;
        const docHeight      = document.documentElement.scrollHeight
                             - document.documentElement.clientHeight;
        const pct            = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        setProgress(pct);
        setShow(scrollTop > 300);
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        background: `conic-gradient(black ${progress}%, transparent ${progress}%)`,
      }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center p-[4px] transition-all duration-300"
    >
      <span className="w-full h-full rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-text-primary hover:bg-[var(--accent-hover)] transition-all duration-300">
        <KeyboardArrowUpIcon />
      </span>
    </button>
  );
};

export default ScrollToTop;
