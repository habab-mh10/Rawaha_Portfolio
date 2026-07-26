import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Theme from "./Theme";
import Logo from "../assets/images/logo.png";

const Header = ({ currentTheme, changeTheme }) => {
  // ================= Header Animation on scrolling ================= //
  // const headerRef = useRef(null);
  // const [lastScrollTop, setLastScrollTop] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     if (!headerRef.current) return;

  //     if (scrollTop > lastScrollTop && scrollTop > 20) {
  //       gsap.to(headerRef.current, { y: "-90%", duration: 0.5, ease: "power2.out" });
  //     } else {
  //       gsap.to(headerRef.current, { y: "0%", duration: 0.5, ease: "power2.out" });
  //     }
  //     setLastScrollTop(scrollTop);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollTop]);
  // ================================================================ //


  //================= DropDown Menu ==================//
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropDownMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setDropDownMenu((prev) => !prev);
  };
  

  //================= JSX Return ==================//
  return (
    <>
      <header className="sticky top-0 left-0 z-[999] min-h-[14vh] max-h-[18vh] h-[100%] bg-[var(--card-bg)] flex items-center justify-between shadow-soft px-10">
        <div className="text-4xl font-extrabold text-shadow-dept">
          <img
            src={Logo}
            alt=""
            width={"70px"}
          />
        </div>
        <nav className="flex items-center gap-6">
          <section className="hidden lg:flex items-center gap-2 border-2 px-10 py-1 rounded-full">
            <ul className="flex list-none gap-9">
              <li
                className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full`}
                onClick={() =>
                  document
                    .getElementById("Home")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Home
              </li>
              <li
                className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full`}
                onClick={() =>
                  document
                    .getElementById("About")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                About
              </li>
              <li
                className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full`}
                onClick={() =>
                  document
                    .getElementById("Services")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Services
              </li>
              <li
                className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full`}
                onClick={() =>
                  document
                    .getElementById("Resume")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Resume
              </li>
              <li
                className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full`}
                onClick={() =>
                  document
                    .getElementById("Works")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Portfolio
              </li>
              <li
                className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full`}
                onClick={() =>
                  document
                    .getElementById("Contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact
              </li>
            </ul>
          </section>

          <Theme currentTheme={currentTheme} changeTheme={changeTheme} />

          <div ref={menuRef}>
            <div
              className="flex lg:hidden flex-col justify-between w-6 h-4 cursor-pointer"
              onClick={toggleMenu}
            >
              <span
                className={`block h-1 w-full bg-[var(--muted)] rounded transition-all duration-300 ${
                  dropDownMenu ? "-rotate-45 translate-y-2" : ""
                } `}
              ></span>
              <span
                className={`block h-1 w-full bg-[var(--muted)] rounded transition-all duration-300 ${
                  dropDownMenu ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-1 w-full bg-[var(--muted)] rounded transition-all duration-300 ${
                  dropDownMenu ? "rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
            <div
              className={`absolute h-56 bg-[var(--card-bg)] border-[1px] border-[var(--card-border)] p-4 bottom-0 top-[100%] right-8 overflow-hidden transition-all duration-[1500ms] z-40 ease ${
                dropDownMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="w-44 grid gap-3 justify-center">
                <li
                  className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full`}
                >
                  Home
                </li>
                <li
                  className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full`}
                >
                  About
                </li>
                <li
                  className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full`}
                >
                  Services
                </li>
                <li
                  className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full`}
                >
                  Resume
                </li>
                <li
                  className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full`}
                >
                  Contact
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;