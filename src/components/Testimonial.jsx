import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPublishedTestimonials } from "../api/testimonial.api";

import fallbackImg from "../assets/images/profile.png";

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading]           = useState(true);
  const headerRef = useRef(null);

  /* ─── fallback static data ─── */
  const fallback = [
    {
      clientPhoto: { url: fallbackImg },
      testimonial: "Working with Muhammad was an absolute pleasure! He delivered our project ahead of schedule and exceeded all our expectations. His attention to detail and technical expertise are outstanding.",
      clientName: "Zakariya Naveed",
      designation: "Nurse",
    },
    {
      clientPhoto: { url: fallbackImg },
      testimonial: "Muhammad transformed our outdated website into a modern, fast, and beautiful platform. The GSAP animations he implemented are smooth and professional. Highly recommended!",
      clientName: "Sir Tatheer Hussain",
      designation: "CEO & Founder of Tech4edge",
    },
    {
      clientPhoto: { url: fallbackImg },
      testimonial: "Excellent communication and technical skills. Muhammad understood our requirements perfectly and delivered a robust solution that scaled with our growing user base.",
      clientName: "Taimura Bihna",
      designation: "Physical Therapist",
    },
  ];

  /* ─── fetch from backend ─── */
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await getPublishedTestimonials();
        const data = res.data ?? [];
        setTestimonials(data.length > 0 ? data : fallback);
      } catch {
        setTestimonials(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  /* ─── GSAP header animation ─── */
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      }
    );
  }, []);

  /* ─── render ─── */
  return (
    <section id="Testimonials" className="w-full p-2 sm:p-4 bg-card-bg">
      {/* Heading */}
      <div ref={headerRef} className="w-full p-2 mt-16 sm:p-4 flex flex-col justify-center items-center">
        <p className="text-text-secondary uppercase text-sm sm:text-base">Testimonials</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center mt-2 sm:mt-4">
          What clients say!
        </h1>
      </div>

      <div className="w-full px-4 mt-10">
        {loading ? (
          <div className="flex justify-center py-16">
            <p className="text-text-secondary">Loading testimonials...</p>
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            navigation={{ nextEl: ".btn-next", prevEl: ".btn-prev" }}
            loop={testimonials.length > 1}
            speed={1000}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            freeMode={false}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              640:  { slidesPerView: 1 },
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={t._id || i}>
                <div className="w-full flex flex-col gap-5 p-5 border-[1.2px] bg-card-bg border-card hover:border-text-primary transition-all duration-500 ease-in-out h-full">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[--muted] flex-shrink-0">
                    <img
                      src={t.clientPhoto?.url || fallbackImg}
                      alt={t.clientName}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = fallbackImg; }}
                    />
                  </div>

                  {/* Feedback */}
                  <p className="text-text-secondary leading-relaxed flex-1">
                    "{t.testimonial}"
                  </p>

                  {/* Name + profession */}
                  <div className="flex flex-col gap-1 mt-auto">
                    <h3 className="font-semibold text-text-primary">{t.clientName}</h3>
                    <p className="text-sm text-muted">{t.designation || ''}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-center items-center gap-4 mt-10 mb-16">
          <button className="btn-prev w-10 h-10 rounded-full text-text-primary bg-[var(--accent-primary)] transition-all duration-[400ms] ease-in-out hover:text-text-primary hover:border-[var(--accent-hover)] hover:bg-transparent hover:border active:border-[var(--accent-hover)] active:bg-transparent active:border">
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </button>
          <button className="btn-next w-10 h-10 rounded-full text-text-primary bg-[var(--accent-primary)] transition-all duration-[400ms] ease-in-out hover:text-text-primary hover:border hover:border-[var(--accent-hover)] hover:bg-transparent">
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
