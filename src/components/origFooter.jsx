import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container flex flex-col items-center justify-center">
        <p></p>
        <div className="social-links">
          {/* Animated links with Framer Motion */}
          <motion.a
            href="https://x.com/Xcryp70R___"
            className="twitter"
            i
            variants={linkVariants} // Use variants for consistent animation
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="bx bxl-twitter text-xl xs:text-3xl"></i>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/diego-fernando-jojoa-yandun/"
            className="linkedin"
            variants={linkVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="bx bxl-linkedin text-xl xs:text-3xl"></i>
          </motion.a>
          <motion.a
            href="https://github.com/diegojojoayandun"
            className="github"
            variants={linkVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="bx bxl-github text-xl xs:text-3xl"></i>
          </motion.a>
          <motion.a
            href="https://gitlab.com/xcryptorlabs"
            className="gitlab"
            variants={linkVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="bx bxl-gitlab text-xl xs:text-3xl"></i>
          </motion.a>
        </div>
        <div className="copyright mt-4"></div>
        <div className="credits font-beckman sm:text-[20px] text-[60px] mt-4">
          <span className="designed-text">Design by</span>{" "}
          <motion.a
            className="designed-name font-beckman text-[16px]"
            href="#"
            variants={linkVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            Diego Fernando Jojoa
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

// Wrap Footer with SectionWrapper new editio of footer
export default SectionWrapper(Footer, "footer");
