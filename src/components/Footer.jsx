import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";

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

const MagneticIcon = ({ href, label, icon }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setPos({ x: dx * 0.45, y: dy * 0.45 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
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
      className="relative w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: hovered ? "#333535" : "#474646",
        color: "#fff",
        transition: "background 0.3s",
      }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Ripple ring on hover */}
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
  );
};

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container flex flex-col items-center justify-center">
        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="w-24 h-px bg-white/20 mb-8"
        />

        {/* Magnetic social icons */}
        <motion.div
          className="social-links"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {socialLinks.map((link) => (
            <motion.div
              key={link.href}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <MagneticIcon {...link} />
            </motion.div>
          ))}
        </motion.div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
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
