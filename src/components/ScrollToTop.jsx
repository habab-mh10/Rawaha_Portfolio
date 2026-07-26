import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTop = () => {
<<<<<<< HEAD

  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);


  useEffect(() => {

    const handleScroll = () => {

      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;


      const scrollPercentage =
        (scrollTop / documentHeight) * 100;


      setProgress(scrollPercentage);


      setShow(scrollTop > 300);

    };


    window.addEventListener("scroll", handleScroll);


    return () =>
      window.removeEventListener("scroll", handleScroll);


  }, []);



  const scrollToTop = () => {

    window.scrollTo({

      top:0,

      behavior:"smooth"

    });

  };



  return (

    show && (

      <button

        onClick={scrollToTop}


        style={{

          background: `
          conic-gradient(
          #ff0000 ${progress}%,
          transparent ${progress}%
          )
          `

        }}



        className="
        fixed
        bottom-6
        right-6
        z-50
        w-12
        h-12
        rounded-full
        flex
        items-center
        justify-center
        p-[4px]
        transition-all
        duration-300
        "

      >


        {/* Inner Button */}

        <span

          className="
          w-full
          h-full
          rounded-full
          bg-[var(--accent-primary)]
          flex
          items-center
          justify-center
          text-text-primary
          hover:bg-[var(--accent-hover)]
          transition-all
          duration-300
          "

        >

          <KeyboardArrowUpIcon />

        </span>


      </button>

    )

  );

};


export default ScrollToTop;
=======
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    show && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[var(--accent-primary)] text-text-primary shadow-lg hover:bg-[var(--accent-hover)] transition-all duration-300"
      >
        <KeyboardArrowUpIcon />
      </button>
    )
  );
};

export default ScrollToTop;
>>>>>>> 2cdd9d75d8f0b6e00c737ae179c8dc1b497e7340
