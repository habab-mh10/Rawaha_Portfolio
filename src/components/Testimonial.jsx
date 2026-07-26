import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import img from "../assets/images/profile.png";

const Testimonial = () => {
  const myTestimonials = [
    {
      clientProfile: img,
      Message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque corporis iure voluptate distinctio quibusdam, ipsum vitae inventore numquam eveniet maiores, dolore culpa deserunt repudiandae ducimus accusantium et doloremque, ad corrupti.",
      clientName: "Zakariya Naveed",
      clientProfession: "Nurse",
    },
    {
      clientProfile: img,
      Message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque corporis iure voluptate distinctio quibusdam, ipsum vitae inventore numquam eveniet maiores, dolore culpa deserunt repudiandae ducimus accusantium et doloremque, ad corrupti.",
      clientName: "Sir Tatheer Hussain",
      clientProfession: "CEO & Founder of Tech4edge",
    },
    {
      clientProfile: img,
      Message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque corporis iure voluptate distinctio quibusdam, ipsum vitae inventore numquam eveniet maiores, dolore culpa deserunt repudiandae ducimus accusantium et doloremque, ad corrupti.",
      clientName: "Taimura Bihna",
      clientProfession: "Physical Therapist",
    },
  ];

  return (
    <section id="Testimonials" className="w-full p-2 sm:p-4 bg-card-bg">
      <div className="w-full p-2 mt-16 sm:p-4 flex flex-col justify-center items-center">
        <p className="text-text-secondary uppercase text-sm sm:text-base">
          Testimonials
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center mt-2 sm:mt-4">
          What clients say!
        </h1>
      </div>

      <div className="w-full px-4 mt-10">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          navigation={{
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
          }}
          loop={true} 
          speed={1000} 
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          freeMode={true} 
          freeModeMomentum={false} 
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
        >
          {myTestimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="w-full flex flex-col gap-6 p-5 border-[1.2px] bg-card-bg border-card hover:border-text-primary transition-alld duration-500 ease-in-out">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[--muted]">
                  <img src={t.clientProfile} alt="Client-Profile" />
                </div>
                <p>{t.Message}</p>
                <div className="flex flex-col gap-1 mt-2">
                  <h1 className="font-semibold">{t.clientName}</h1>
                  <h2 className="text-md text-muted">
                    {t.clientProfession}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center items-center gap-4 mt-10 mb-16">
          <button className="btn-prev w-10 h-10 rounded-full font-bolder text-text-primary bg-[var(--accent-primary)] transition-all duration-[400ms] ease-in-out hover:text-text-primary hover:border-[var(--accent-hover)] hover:bg-transparent hover:border active:border-[var(--accent-hover)] active:bg-transparent active:border">
            <ArrowBackIosNewRoundedIcon color="var(--text-muted)" fontSize="1rem" />
          </button>

          <button className="btn-next w-10 h-10 rounded-full font-bolder text-text-primary bg-[var(--accent-primary)] transition-all duration-[400ms] ease-in-out hover:text-text-primary hover:border hover:border-[var(--accent-hover)] hover:bg-transparent">
            <ArrowForwardIosRoundedIcon color="var(--text-muted)" fontSize="1rem" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
