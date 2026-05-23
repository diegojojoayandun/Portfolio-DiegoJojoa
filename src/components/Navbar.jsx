import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { close, menu, logo } from "../assets";

const LangToggle = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("es") ? "es" : "en";

  return (
    <button
      onClick={() => i18n.changeLanguage(current === "en" ? "es" : "en")}
      className="flex items-center gap-1 text-[13px] font-medium font-poppins
        text-eerieBlack hover:text-taupe transition-colors duration-200
        border border-eerieBlack/20 rounded-full px-3 py-1 hover:border-taupe"
      aria-label="Toggle language"
    >
      {current === "en" ? "EN" : "ES"}
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>
  );
};

const Navbar = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const translatedLinks = navLinks.map((nav) => ({
    ...nav,
    title: t(`nav.${nav.id}`, nav.title),
  }));

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-2 fixed
      top-0 z-20 bg-flashWhite sm:opacity-[0.97] xxs:h-[12vh]`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => { setActive(""); window.scrollTo(0, 0); }}
        >
          <img src={logo} alt="logo" className="xs:w-[40px] xs:h-[40px] sm:w-[50px] sm:h-[50px] w-[45px] h-[45px] object-contain" />
        </Link>

        {/* Desktop */}
        <ul className="list-none hidden sm:flex flex-row gap-10 mt-2 items-center">
          {translatedLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${active === nav.title ? "text-french" : "text-eerieBlack"} hover:text-taupe text-[21px] font-medium font-mova uppercase tracking-[3px] cursor-pointer nav-links`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li><LangToggle /></li>
        </ul>

        {/* Mobile */}
        <div className="sm:hidden flex flex-1 justify-end items-center gap-3">
          <LangToggle />
          {toggle ? (
            <div className={`p-6 bg-flashWhite opacity-[0.98] absolute top-0 left-0 w-screen h-[100vh] z-10 menu ${toggle ? "menu-open" : "menu-close"}`}>
              <div className="flex justify-end">
                <img src={close} alt="close" className="w-[22px] h-[22px] object-contain cursor-pointer" onClick={() => setToggle(!toggle)} />
              </div>
              <ul className="list-none flex flex-col gap-6 items-start justify-end mt-16 ml-4">
                {translatedLinks.map((nav) => (
                  <li
                    key={nav.id}
                    style={{ fontSize: "15px" }}
                    className={`${active === nav.title ? "text-french" : "text-eerieBlack"} font-bold font-arenq uppercase tracking-[1px] cursor-pointer hover:text-french transition-all duration-300 ease-in-out`}
                    onClick={() => { setToggle(!toggle); setActive(nav.title); }}
                  >
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <img src={menu} alt="menu" className="w-[34px] h-[34px] object-contain cursor-pointer" onClick={() => setToggle(!toggle)} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
