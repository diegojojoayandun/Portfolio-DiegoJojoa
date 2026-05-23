import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { styles } from "../styles";
import { diego, devwhite, devblack } from "../assets";

const curtainTopVariants = {
  initial: { y: "0%" },
  animate: { y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 } },
};
const curtainBottomVariants = {
  initial: { y: "0%" },
  animate: { y: "100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 } },
};
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.1 + delay } },
});
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.1, ease: "easeOut", delay: 1.1 + delay } },
});

const Hero = () => {
  const { t } = useTranslation();

  return (
    <>
      <motion.div className="fixed top-0 left-0 w-screen z-[100] bg-[#0a0a0a] pointer-events-none" style={{ height: "50vh" }} variants={curtainTopVariants} initial="initial" animate="animate" />
      <motion.div className="fixed bottom-0 left-0 w-screen z-[100] bg-[#0a0a0a] pointer-events-none" style={{ height: "50vh" }} variants={curtainBottomVariants} initial="initial" animate="animate" />
      <motion.div className="fixed top-1/2 left-0 w-screen z-[101] bg-white pointer-events-none" style={{ height: "1px", translateY: "-50%" }} initial={{ scaleX: 0, opacity: 1 }} animate={{ scaleX: [0, 1, 1, 0], opacity: [1, 1, 1, 0] }} transition={{ duration: 1.0, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }} />

      <motion.div className="absolute top-0 left-0 z-0 h-[100vh] w-screen" variants={fadeIn(0.1)} initial="initial" animate="animate">
        <img src={devwhite} alt="background" className="w-full h-full sm:block hidden object-cover" />
      </motion.div>
      <motion.div className="absolute top-0 left-0 z-0 h-[100vh] w-screen" variants={fadeIn(0.1)} initial="initial" animate="animate">
        <img src={devblack} alt="background" className="w-full h-full sm:hidden block object-cover" />
      </motion.div>

      <section className="relative flex sm:flex-row flex-col w-full h-screen mx-auto sm:bg-hero bg-hero-mobile overflow-hidden">
        <div className={`absolute inset-0 sm:top-[250px] top-[150px] lg:top-[150px] xl:top-[250px] ${styles.paddingX} max-w-7xl mx-auto flex flex-row items-start justify-between gap-3`}>
          <motion.div className="flex flex-col justify-center items-center mt-5 ml-3" variants={fadeIn(0.3)} initial="initial" animate="animate">
            <div className="w-5 h-5 rounded-full bg-[#0a0a0a] sm:hidden" />
            <div className="w-1 sm:h-80 h-40 bw-gradient sm:hidden" />
          </motion.div>

          <div>
            <motion.h1 className={`${styles.heroHeadText} text-eerieBlack font-poppins uppercase`} variants={fadeUp(0)} initial="initial" animate="animate">
              {t("hero.greeting")}{" "}
              <span className="sm:text-battleGray sm:text-[90px] text-eerieBlack text-[50px] font-mova font-extrabold uppercase">Diego</span>
            </motion.h1>
            <motion.p className={`${styles.heroSubText} mt-2 text-eerieBlack`} variants={fadeUp(0.2)} initial="initial" animate="animate">
              {t("hero.subtitle1")} <br className="sm:block hidden" />
              {t("hero.subtitle2")}
            </motion.p>
          </div>

          <div className="w-screen flex flex-col items-start justify-center sm:-ml-[3rem] xxs:mt-4" />
          <div />
        </div>

        <motion.div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center" variants={fadeIn(0.6)} initial="initial" animate="animate">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-french border-dim flex justify-center items-start p-2">
              <motion.div animate={{ y: [0, 24, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }} className="w-3 h-3 rounded-full bg-taupe mb-1" />
            </div>
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.2, ease: "easeOut", delay: 1.0 }}>
          <img className="absolute bottom-0 ml-[50vw] lg:ml-[75vw] md:ml-[60vw] xmd:ml-[60vw] 2xl:ml-[83vw] sm:h-[90vh] md:h-[70vh] xl:h-[80vh]" src={diego} alt="diegojojoa" loading="lazy" />
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
