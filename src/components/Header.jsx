import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Theme from "./Theme";
import LocalLogo from "../assets/images/logo.png";
import SendModal from "./SendModal";
import { getPublicAboutProfile } from "../api/about.api";

const Header = ({ currentTheme, changeTheme }) => {
  const location = useLocation();
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const menuRef = useRef(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [logoUrl, setLogoUrl] = useState(LocalLogo);

  /* ── Fetch logo from backend once on mount ── */
  useEffect(() => {
    getPublicAboutProfile()
      .then((res) => {
        const url = res?.data?.logo?.url;
        if (url) setLogoUrl(url);
      })
      .catch(() => {/* keep local logo */});
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropDownMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setDropDownMenu((prev) => !prev);
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[999] min-h-[14vh] max-h-[18vh] h-[100%] bg-[var(--card-bg)] flex items-center justify-between shadow-soft px-10">
        <Link to="/" className="text-4xl font-extrabold text-shadow-dept">
          <img
            src={logoUrl}
            alt="Muhammad Rawaha Portfolio"
            width={"70px"}
            onError={(e) => { e.target.src = LocalLogo; }}
          />
        </Link>
        <nav className="flex items-center gap-6">
          <section className="hidden lg:flex items-center gap-2 border-2 px-10 py-1 rounded-full">
            <ul className="flex list-none gap-9 items-center">
              <li>
                <Link to="/" className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full ${isActive("/") || isActive("/home") ? "before:w-full" : "before:w-0"}`}>Home</Link>
              </li>
              <li>
                <Link to="/About" className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full ${isActive("/About") ? "before:w-full" : "before:w-0"}`}>About</Link>
              </li>
              <li>
                <Link to="/myServices" className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full ${isActive("/myServices") ? "before:w-full" : "before:w-0"}`}>Services</Link>
              </li>
              <li>
                <Link to="/myportfolio" className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full ${isActive("/myportfolio") || isActive("/portfolio") ? "before:w-full" : "before:w-0"}`}>Portfolio</Link>
              </li>
              <li>
                <Link to="/contact" className={`leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full ${isActive("/contact") ? "before:w-full" : "before:w-0"}`}>Contact</Link>
              </li>
              <li className="leading-7 font-medium inline cursor-pointer px-4 py-2 bg-accent-secondary hover:bg-accent-primary rounded-full hover:text-white transition-all duration-500" onClick={() => setShowOrderModal(true)}>
                Order Now
              </li>
            </ul>
          </section>

          <Theme currentTheme={currentTheme} changeTheme={changeTheme} />

          <div ref={menuRef}>
            <div
              className="flex lg:hidden flex-col justify-between w-6 h-4 cursor-pointer"
              onClick={toggleMenu}
            >
              <span className={`block h-1 w-full bg-[var(--muted)] rounded transition-all duration-300 ${dropDownMenu ? "-rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-1 w-full bg-[var(--muted)] rounded transition-all duration-300 ${dropDownMenu ? "opacity-0" : ""}`} />
              <span className={`block h-1 w-full bg-[var(--muted)] rounded transition-all duration-300 ${dropDownMenu ? "rotate-45 -translate-y-2" : ""}`} />
            </div>
            <div className={`absolute h-72 bg-[var(--card-bg)] border-[1px] border-[var(--card-border)] p-4 bottom-0 top-[100%] right-8 overflow-hidden transition-all duration-[1500ms] z-40 ease ${dropDownMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <ul className="w-44 grid gap-3 justify-center">
                <li><Link to="/" onClick={() => setDropDownMenu(false)} className="leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full">Home</Link></li>
                <li><Link to="/About" onClick={() => setDropDownMenu(false)} className="leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full">About</Link></li>
                <li><Link to="/myServices" onClick={() => setDropDownMenu(false)} className="leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full">Services</Link></li>
                <li><Link to="/myportfolio" onClick={() => setDropDownMenu(false)} className="leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full">Portfolio</Link></li>
                <li><Link to="/contact" onClick={() => setDropDownMenu(false)} className="leading-7 font-medium inline cursor-pointer relative before:content-[''] before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-0.5 before:bg-[var(--muted)] before:transition-all before:duration-300 hover:before:w-full">Contact</Link></li>
                <li className="leading-7 font-medium inline cursor-pointer px-4 py-2 bg-accent-secondary hover:bg-accent-primary rounded-full hover:text-white transition-all duration-500 text-center" onClick={() => { setDropDownMenu(false); setShowOrderModal(true); }}>Order Now</li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <SendModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        mode="order"
      />
    </>
  );
};

export default Header;
