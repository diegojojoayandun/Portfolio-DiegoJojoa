import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const isMobileDevice = () =>
  /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );

const IconBall = ({ name, icon }) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="w-28 h-28 flex flex-col items-center justify-center gap-2 group"
  >
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4a4a4a] to-[#2a2a2a] flex items-center justify-center shadow-xl border border-white/10 group-hover:border-white/30 transition-all duration-300">
      <img
        src={icon}
        alt={name}
        className="w-10 h-10 object-contain"
      />
    </div>
    <span className="text-[10px] text-[#a8a8c0] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {name}
    </span>
  </motion.div>
);

const Tech = () => {
  const [mobile, setMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMobile(isMobileDevice());
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-10 mt-14">
        {technologies.map((technology) =>
          mobile ? (
            <IconBall
              key={technology.name}
              name={technology.name}
              icon={technology.icon}
            />
          ) : (
            <div className="w-28 h-28" key={technology.name}>
              <BallCanvas icon={technology.icon} />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
