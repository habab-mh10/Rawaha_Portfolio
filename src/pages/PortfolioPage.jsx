import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Portfolio from "../components/Portfolio";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PortfolioPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <main>
        <div className="w-full p-4 sm:p-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-text-primary border-[1px] border-[var(--accent-primary)] bg-[var(--accent-primary)] transition-all duration-[400ms] ease-in-out hover:text-text-primary hover:border-[var(--accent-hover)] hover:bg-transparent"
          >
            <ArrowBackIcon className="mr-2" />
            Back to Home
          </Link>
        </div>
        <Portfolio />
      </main>
    </>
  );
};

export default PortfolioPage;