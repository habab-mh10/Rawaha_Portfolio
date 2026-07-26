import React, { useRef } from "react";
import { gsap } from "gsap";

const Footer = () => {
  const RotateM = useRef(null);
  const RotateR = useRef(null);

  React.useEffect(() => {
    gsap.to(RotateM.current, {
      duration: 1.5,
      rotateX: 360,
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 2,
    });
    gsap.to(RotateR.current, {
      duration: 1.5,
      rotateX: -360,
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 2,
    }, "+=0.5");
  }, []);

  return (
    <>
      <section className="py-10">
        <div className="w-full text-xl text-center fill-transparent" style={{ WebkitTextFillColor: 'transparent', WebkitTextStrokeWidth: '0.17px', WebkitTextStrokeColor: 'var(--text-primary)', perspective: "800px" }}><span ref={RotateM} className="inline-block">M</span>uhammad {" "} <span ref={RotateR} className="inline-block">R</span>awaha</div>
        <div className="w-full p-4 text-center">
         <h3>&copy; 2025 Muhammad Rawaha | All rights reserved</h3>
        </div>
      </section>
    </>
  );
};

export default Footer;