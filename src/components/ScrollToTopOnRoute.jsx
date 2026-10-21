import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the very top (0, 0) whenever the route pathname
 * changes. Place this once inside <BrowserRouter> (or <Routes>) in App.jsx
 * so every page always opens from the top.
 */
const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll — no smooth behaviour so the user never sees the
    // previous page's scroll position flash on the new page.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Belt-and-braces: some browsers / GSAP ScrollSmoother keep their own
    // scroll position on the document element.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null; // renders nothing
};

export default ScrollToTopOnRoute;
