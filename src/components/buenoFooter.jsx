import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const socialLinks = [
  {
    href: "https://x.com/Xcryp70R___",
    label: "Twitter / X",
    icon: <i className="bx bxl-twitter text-2xl" />,
  },
  {
    href: "https://www.linkedin.com/in/diego-fernando-jojoa-yandun/",
    label: "LinkedIn",
    icon: <i className="bx bxl-linkedin text-2xl" />,
  },
  {
    href: "https://github.com/diegojojoayandun",
    label: "GitHub",
    icon: <i className="bx bxl-github text-2xl" />,
  },
  {
    href: "https://gitlab.com/xcryptorlabs",
    label: "GitLab",
    icon: <i className="bx bxl-gitlab text-2xl" />,
  },
];

const MagneticIcon = ({ href, label, icon, index }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.45, y: (e.clientY - cy) * 0.45 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.6)}
    >
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: hovered ? "#333535" : "#474646",
          color: "#fff",
          transition: "background 0.3s",
        }}
      >
        {hovered && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-white/30 pointer-events-none"
          />
        )}
        {icon}
      </motion.a>
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container flex flex-col items-center justify-center">

        {/* Divider — hereda stagger del SectionWrapper */}
        <motion.div
          variants={fadeIn("down", "tween", 0, 0.8)}
          className="w-24 h-px bg-white/20 mb-8"
        />

        {/* Magnetic icons con stagger heredado */}
        <div className="social-links">
          {socialLinks.map((link, i) => (
            <MagneticIcon key={link.href} {...link} index={i} />
          ))}
        </div>

        {/* Credits */}
        <motion.div
          variants={fadeIn("up", "tween", 0.4, 0.6)}
          className="credits font-beckman text-[13px] mt-6"
        >
          <span className="designed-text">Design by</span>{" "}
          <motion.a
            className="designed-name font-beckman text-[13px]"
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Diego Fernando Jojoa
          </motion.a>
        </motion.div>

      </div>
    </footer>
  );
};

export default SectionWrapper(Footer, "footer");
