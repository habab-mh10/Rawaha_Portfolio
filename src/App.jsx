import React, {
  useEffect,
  useState,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// ── scroll helper (NOT a Route — lives alongside <Routes>) ──
import ScrollToTopOnRoute from "./components/ScrollToTopOnRoute";

// ── Public pages — lazy-loaded so each page is its own JS chunk ──
const Home         = lazy(() => import("./pages/Home"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const MyServices   = lazy(() => import("./pages/MyServices"));
const ContactPage  = lazy(() => import("./pages/ContactPage"));
const AboutPage    = lazy(() => import("./pages/AboutPage"));
const PricingPage  = lazy(() => import("./pages/PricingPage"));

// ── Admin pages — lazy-loaded (rarely visited, keep them out of main bundle) ──
const Login        = lazy(() => import("./admin/pages/Login"));
const AdminLayout  = lazy(() => import("./admin/layouts/AdminLayout"));
const Dashboard    = lazy(() => import("./admin/pages/Dashboard"));
const Projects     = lazy(() => import("./admin/pages/Projects"));
const Pricing      = lazy(() => import("./admin/pages/Pricing"));
const Testimonials = lazy(() => import("./admin/pages/Testimonials"));
const Messages     = lazy(() => import("./admin/pages/Messages"));
const Team         = lazy(() => import("./admin/pages/Team"));
const VisionGoals  = lazy(() => import("./admin/pages/VisionGoals"));

// ── Auth guard (small, keep it synchronous) ──
import ProtectedRoute from "./admin/components/ProtectedRoute";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/* ── minimal full-screen spinner used while lazy chunks load (admin only) ── */
const AdminPageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--bg-gradient)]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-primary)]" />
  </div>
);

/* ── Simple loader for public pages (no heavy animation) ── */
const SimpleLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--bg-gradient)]">
    <div className="text-text-primary">Loading...</div>
  </div>
);

const App = () => {
  /* ── theme ── */
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  /* stable reference — won't cause child re-renders on every App render */
  const changeTheme = useCallback(() => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <>
      {/*
        ScrollToTopOnRoute MUST be outside <Routes>.
        React Router v6 only allows <Route> / <React.Fragment> as direct
        children of <Routes>. This component returns null and is safe here.
      */}
      <ScrollToTopOnRoute />

      {/* Public Routes - No heavy loaders */}
      <Routes>
        {/* ═══════════════ PUBLIC ROUTES ═══════════════ */}

        <Route
          path="/"
          element={<Home currentTheme={currentTheme} changeTheme={changeTheme} />}
        />
        <Route
          path="/home"
          element={<Home currentTheme={currentTheme} changeTheme={changeTheme} />}
        />
        <Route
          path="/portfolio"
          element={<PortfolioPage currentTheme={currentTheme} changeTheme={changeTheme} />}
        />
        <Route
          path="/myportfolio"
          element={<PortfolioPage currentTheme={currentTheme} changeTheme={changeTheme} />}
        />
        <Route
          path="/myServices"
          element={<MyServices currentTheme={currentTheme} changeTheme={changeTheme} />}
        />
        <Route
          path="/contact"
          element={<ContactPage currentTheme={currentTheme} changeTheme={changeTheme} />}
        />
        <Route
          path="/About"
          element={<AboutPage currentTheme={currentTheme} changeTheme={changeTheme} />}
        />
        <Route
          path="/pricing"
          element={<PricingPage currentTheme={currentTheme} changeTheme={changeTheme} />}
        />

        {/* ═══════════════ ADMIN ROUTES ═══════════════ */}

        <Route 
          path="/admin/login" 
          element={
            <Suspense fallback={<AdminPageLoader />}>
              <Login />
            </Suspense>
          } 
        />

        <Route
          path="/admin"
          element={
            <Suspense fallback={<AdminPageLoader />}>
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            </Suspense>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route 
            path="dashboard" 
            element={
              <Suspense fallback={<AdminPageLoader />}>
                <Dashboard />
              </Suspense>
            } 
          />
          <Route 
            path="projects" 
            element={
              <Suspense fallback={<AdminPageLoader />}>
                <Projects />
              </Suspense>
            } 
          />
          <Route 
            path="pricing" 
            element={
              <Suspense fallback={<AdminPageLoader />}>
                <Pricing />
              </Suspense>
            } 
          />
          <Route 
            path="messages" 
            element={
              <Suspense fallback={<AdminPageLoader />}>
                <Messages />
              </Suspense>
            } 
          />
          <Route 
            path="testimonials" 
            element={
              <Suspense fallback={<AdminPageLoader />}>
                <Testimonials />
              </Suspense>
            } 
          />
          <Route 
            path="team" 
            element={
              <Suspense fallback={<AdminPageLoader />}>
                <Team />
              </Suspense>
            } 
          />
          <Route 
            path="visiongoals" 
            element={
              <Suspense fallback={<AdminPageLoader />}>
                <VisionGoals />
              </Suspense>
            } 
          />

          <Route
            path="orders"
            element={
              <Suspense fallback={<AdminPageLoader />}>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">Orders Management</h1>
                  <p className="text-gray-500">Coming soon…</p>
                </div>
              </Suspense>
            }
          />
          <Route
            path="technologies"
            element={
              <Suspense fallback={<AdminPageLoader />}>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">Technologies CMS</h1>
                  <p className="text-gray-500">Coming soon…</p>
                </div>
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<AdminPageLoader />}>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">About Me Editor</h1>
                  <p className="text-gray-500">Coming soon…</p>
                </div>
              </Suspense>
            }
          />
          <Route
            path="homepage"
            element={
              <Suspense fallback={<AdminPageLoader />}>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">Homepage Settings</h1>
                  <p className="text-gray-500">Coming soon…</p>
                </div>
              </Suspense>
            }
          />
        </Route>

        {/* ═══════════════ 404 ═══════════════ */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
                <p className="text-text-secondary mb-6">Page not found</p>
                <a
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold
                    text-text-primary border-[1px] border-[var(--accent-primary)]
                    bg-[var(--accent-primary)] transition-all duration-[400ms] ease-in-out
                    hover:bg-transparent hover:border-[var(--accent-hover)]"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
