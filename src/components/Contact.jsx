import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallIcon from "@mui/icons-material/Call";
import TextField from "@mui/material/TextField";

gsap.registerPlugin(ScrollTrigger);


const Contact = () => {
  //=================== Fade-in Animation of Left content ===================//
  const leftFadeIn = React.useRef([]);
  leftFadeIn.current = [];

  const leftFadeInElement = (el) => {
    if (el && !leftFadeIn.current.includes(el)) {
      leftFadeIn.current.push(el);
    }
  };

  React.useEffect(() => {
    leftFadeIn.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: 50 },
        {
          duration: 1,
          opacity: 1,
          x: 0,
          ease: "easeIn",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);
  //=======================================================================//

  //======================== Input Tags Animation of Right Content  ========================//
  const rightFadeIn = React.useRef([]);
  rightFadeIn.current = [];
  const rightFadeInElements = (el) => {
    if (el && !rightFadeIn.current.includes(el)) {
      rightFadeIn.current.push(el);
    }
  };

  React.useEffect(() => {
    rightFadeIn.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "easeIn",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);
  //============================================================//

  // =================== Input Field Styles ===================//
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      fontFamily: "Syne",
      "& input": {
        fontFamily: "Syne",
        color: "var(--text-primary)",
      },
      "& fieldset": {
        borderColor: "var(--text-secondary)",
      },
      "&:hover fieldset": {
        borderColor: "var(--text-secondary)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--text-primary)",
      },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "Syne",
      color: "var(--text-secondary)",
      "&.Mui-focused": {
        color: "var(--text-secondary)",
      },
    },
  };
  // =========================================================//

  // =================== JSX Return ===================//
  return (
    <section id="Contact" className="w-full p-4 sm:p-6 lg:p-10 mb-32">
      <div className="w-full mt-16 flex flex-col justify-center items-center text-center">
        <p className="text-text-secondary uppercase text-sm sm:text-base">
          Contact
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4">
          Ready to Start Your Project?
        </h1>
      </div>

      <div className="w-full mt-16 flex flex-wrap justify-center gap-8">
        {/* ================= Left Contact ================= */}
        <div className="w-full lg:w-1/3">
          <div className="bg-card-bg p-6 sm:p-10 lg:p-16 flex flex-col gap-12">
            <div
              ref={leftFadeInElement}
              className="text-text-secondary hover:text-text-primary border-b-[1.5px] border-card pb-6"
            >
              <CallIcon fontSize="large" />
              <h2 className="text-xl text-text-primary font-bold mt-5">
                Contact Number :
              </h2>
              <a href="tel:+923028053159" className="block mt-2">
                +92 302 80 53159
              </a>
            </div>

            <div
              ref={leftFadeInElement}
              className="text-text-secondary hover:text-text-primary border-b-[1.5px] border-card pb-6"
            >
              <MailOutlineIcon fontSize="large" />
              <h2 className="text-xl text-text-primary font-bold mt-5">
                Email Us :
              </h2>
              <a href="mailto:rawahamr11@gmail.com" className="block mt-2">
                rawahamr11@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* ================= Right Contact Form ================= */}
        <div className="w-full lg:w-1/2 border-[1.5px] border-card bg-neo p-6 sm:p-8 lg:p-10">
          <form className="flex flex-col gap-8 font-syne">
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <TextField
                label="Your Name"
                required
                fullWidth
                sx={inputStyle}
                ref={rightFadeInElements}
              />
              <TextField
                label="Your Email"
                type="email"
                required
                fullWidth
                sx={inputStyle}
                ref={leftFadeInElement}
              />
            </div>

            <TextField
              label="Your Subject"
              required
              fullWidth
              sx={inputStyle}
              ref={rightFadeInElements}
            />

            <div ref={rightFadeInElements} className="relative w-full">
              <textarea
                id="your-message"
                required
                rows={5}
                placeholder=" "
                className="w-full peer rounded-md border border-text-secondary bg-transparent px-3 pt-5 pb-2 text-sm text-text-primary
                focus:border-text-primary transition-all duration-200 font-syne"
              ></textarea>

              <label
                htmlFor="your-message"
                className="absolute left-3 top-0 px-1 text-text-secondary text-sm bg-neo transition-all duration-200
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
                peer-focus:-top-3 peer-focus:text-[0.8rem]"
              >
                Describe Your Project *
              </label>
            </div>

            <button
              className="w-fit mt-6 p-4 sm:p-5 text-sm font-semibold
              text-text-primary border border-[var(--accent-primary)]
              bg-[var(--accent-primary)]
              transition-all duration-300
              hover:bg-transparent hover:border-[var(--accent-hover)]
              flex items-center gap-2"
            >
              Message <MailOutlineIcon fontSize="small" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;