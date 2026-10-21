import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPublicVisionGoals } from "../api/visiongoals.api";

gsap.registerPlugin(ScrollTrigger);

const VisionGoals = () => {
  const [visionData, setVisionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  // ======================== Fallback Vision Data ========================//
  const fallbackVision = {
    title: "Our Goals and Vision",
    content: "My goal is to continuously improve my skills, challenge my limits, and reach a high level of professional excellence. I aspire to grow as a developer and designer, build meaningful digital products, and turn ambitious ideas into reliable real-world solutions. Through consistent learning, creativity, and dedication, I aim to establish a strong professional identity, work with inspiring people, and create technology that delivers lasting value for individuals and businesses.",
    published: true
  };

  // ======================== Fetch Vision Data ========================//
  useEffect(() => {
    const fetchVisionData = async () => {
      try {
        const response = await getPublicVisionGoals();
        if (response.success && response.data) {
          setVisionData(response.data);
        } else {
          setVisionData(fallbackVision);
        }
      } catch (error) {
        console.error('Error fetching vision data:', error);
        setVisionData(fallbackVision);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVisionData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ======================== GSAP Animation ========================//
  useEffect(() => {
    if (!loading && sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [loading]);

  if (loading || !visionData || !visionData.published) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full flex items-center justify-center py-12 md:py-16 px-4 sm:px-6 lg:px-0 bg-[var(--card-bg)]"
    >
      <div className="w-full lg:w-[95%] xl:w-[85%] flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-text-primary mb-6 sm:mb-8">
          {visionData.title}
        </h2>
        <p className="text-text-secondary leading-relaxed text-base sm:text-lg md:text-xl max-w-4xl text-center">
          {visionData.content}
        </p>
      </div>
    </section>
  );
};

export default VisionGoals;