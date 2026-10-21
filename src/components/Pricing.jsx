import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllPackages } from "../api/pricing.api";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SendModal from "./SendModal";

gsap.registerPlugin(ScrollTrigger);

/* Fallback data shown while loading or if API fails */
const FALLBACK = [
  {
    _id: "f1",
    name: "Web Development",
    description: "Complete website development with modern technologies",
    price: 1500,
    duration: "project",
    isPopular: true,
    features: [
      "Responsive Design",
      "Up to 10 Pages",
      "Contact Form Integration",
      "SEO Optimization",
      "Fast Loading Speed",
      "Free 1 Month Support",
    ],
  },
  {
    _id: "f2",
    name: "Graphic Designing",
    description: "Professional graphic design for your brand identity",
    price: 500,
    duration: "project",
    isPopular: false,
    features: [
      "Logo Design (3 Concepts)",
      "Brand Color Palette",
      "Social Media Graphics",
      "Business Card Design",
      "Source Files Included",
      "Unlimited Revisions",
    ],
  },
  {
    _id: "f3",
    name: "UGC Ads",
    description: "User-Generated Content style advertisements",
    price: 300,
    duration: "ad campaign",
    isPopular: false,
    features: [
      "Script Writing",
      "Professional Video Editing",
      "Background Music & Effects",
      "Captions & Text Overlays",
      "Platform Optimization",
      "72 Hour Delivery",
    ],
  },
];

const Pricing = () => {
  const [packages, setPackages] = useState(FALLBACK);
  const [orderModal, setOrderModal] = useState({ open: false, packageId: null });
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addCard = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  /* Fetch from backend — render FALLBACK immediately, swap when ready */
  useEffect(() => {
    const fetchPkg = async () => {
      try {
        const res = await getAllPackages();
        const data = res.data ?? [];
        if (data.length > 0) setPackages(data);
      } catch {
        // keep FALLBACK already in state
      }
    };
    fetchPkg();
  }, []);

  /* GSAP animations */
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      }
    );
  }, []);

  useEffect(() => {
    if (cardsRef.current.length === 0) return;
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" },
        }
      );
    });
  }, [packages]);

  return (
    <>
    <section id="Pricing" className="w-full px-4 sm:px-6 lg:px-10 py-10 bg-[var(--bg-primary)]">
      {/* Heading */}
      <div ref={headerRef} className="w-full flex flex-col justify-center items-center mb-14 mt-10">
        <p className="text-text-secondary uppercase text-sm sm:text-base tracking-widest">
          Pricing
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center mt-3">
          Simple, Transparent Pricing
        </h1>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6 pb-16">
        {packages.map((pkg) => (
            <div
              key={pkg._id}
              ref={addCard}
              className={`relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm flex flex-col border transition-all duration-500 hover:-translate-y-1 hover:shadow-depth ${
                pkg.isPopular
                  ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/5"
                  : "border-card bg-card-bg"
              }`}
            >
              {/* Popular badge */}
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--accent-primary)] text-white text-xs font-semibold px-5 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="p-7 flex flex-col flex-1 gap-5">
                {/* Name + desc */}
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{pkg.name}</h3>
                  <p className="text-text-secondary text-sm mt-1">{pkg.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-text-primary">${pkg.price}</span>
                  <span className="text-text-secondary mb-1">/ {pkg.duration}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-card" />

                {/* Features */}
                <ul className="flex flex-col gap-2.5 flex-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <CheckIcon className="text-[var(--accent-primary)] flex-shrink-0 mt-0.5" style={{ fontSize: 16 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`mt-4 w-full py-3 font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all duration-[400ms] ease-in-out border-[1px] ${
                    pkg.isPopular
                      ? "bg-[var(--accent-primary)] text-text-primary border-[var(--accent-primary)] hover:bg-transparent hover:border-[var(--accent-hover)]"
                      : "border-[var(--accent-primary)] bg-transparent text-text-primary hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)]"
                  }`}
                  onClick={() => {
                    setOrderModal({ open: true, packageId: pkg._id });
                  }}
                >
                  Get Started
                  <ArrowForwardIcon style={{ fontSize: 16 }} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>

    {/* Order modal — opened by "Get Started" buttons */}
    <SendModal
      isOpen={orderModal.open}
      onClose={() => setOrderModal({ open: false, packageId: null })}
      mode="order"
      defaultPackage={orderModal.packageId}
    />
    </>
  );
};

export default Pricing;
