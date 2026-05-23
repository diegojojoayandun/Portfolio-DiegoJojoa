import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const certifications = [
  {
    title: "Google Cybersecurity Professional",
    issuer: "Google",
    file: "/certifications/CERTIFICADO_PROFESIONAL_GOOGLE_CIBERSEGURIDAD.pdf",
    fileName: "Google_Cybersecurity_Professional.pdf",
  },
  {
    title: "Multi-Cloud Red Teaming Analyst",
    issuer: "TCM Security",
    file: "/certifications/Diego Fernando Jojoa Multi-Cloud Red Teaming Analyst.pdf",
    fileName: "MultiCloud_RedTeaming_Analyst.pdf",
  },
  {
    title: "SC-100 Microsoft Cybersecurity Architect",
    issuer: "Microsoft",
    file: "/certifications/DIEGO FERNANDO JOJOA - SC-100.pdf",
    fileName: "SC100_Microsoft.pdf",
  },
  {
    title: "ISC2 Certified",
    issuer: "ISC2",
    file: "/certifications/isc2.pdf",
    fileName: "ISC2_Certified.pdf",
  },
  {
    title: "Holberton Backend Developer",
    issuer: "Holberton School",
    file: "/certifications/Hoberton Desarrollador Backend.pdf",
    fileName: "Hoberton_Desarrollador_Backend.pdf",
  },
  {
    title: "Talento Tech Cloud Architecture",
    issuer: "Talento Tech",
    file: "/certifications/Talento Tech Arquitectura en Nube.pdf",
    fileName: "TalentoTech_Arquitectura_Nube.pdf",
  },
  {
    title: "Cybersecurity",
    issuer: "Universidad de Antioquia",
    file: "/certifications/Certificacion_CIberseguridad_UDEA.pdf",
    fileName: "Ciberseguridad_UDEA.pdf",
  },
  {
    title: "Cybersecurity",
    issuer: "Universidad de Caldas",
    file: "/certifications/ciberseguridad_distrital_caldas.pdf",
    fileName: "Ciberseguridad_Caldas.pdf",
  },
  {
    title: "Cybersecurity Intermediate",
    issuer: "MinTIC Colombia",
    file: "/certifications/CIBERSEGURIDAD MINTIC INTERMEDIO.pdf",
    fileName: "Ciberseguridad_MinTIC_Intermedio.pdf",
  },
];

const INITIAL_COUNT = 4;

const PdfViewer = ({ file }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    const render = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(file).promise;
        const page = await pdf.getPage(1);
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const containerWidth = canvas.parentElement?.clientWidth || 380;
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaled = page.getViewport({ scale });
        canvas.width = scaled.width;
        canvas.height = scaled.height;
        await page.render({ canvasContext: canvas.getContext("2d"), viewport: scaled }).promise;
        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) { setError(true); setLoading(false); }
      }
    };

    render();
    return () => { cancelled = true; };
  }, [file]);

  return (
    <div className="rounded-xl overflow-hidden border border-black/10 bg-[#f0f0f0] flex items-center justify-center" style={{ minHeight: "320px" }}>
      {loading && (
        <div className="flex flex-col items-center gap-2 text-[#555]">
          <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <span className="text-xs">Loading certificate...</span>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center gap-3 text-[#555] px-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-xs leading-relaxed">Use "View full" to open the certificate.</span>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full" style={{ display: loading || error ? "none" : "block" }} />
    </div>
  );
};

const CertCard = ({ cert, onClick, index, animate }) => (
  <motion.div
    variants={!animate ? fadeIn("right", "spring", 0.5 * index, 0.75) : undefined}
    initial={animate ? { opacity: 0, x: 60 } : undefined}
    animate={animate ? { opacity: 1, x: 0 } : undefined}
    transition={animate ? { type: "spring", duration: 0.75, delay: 0.08 * index } : undefined}
    exit={animate ? { opacity: 0, x: 60, transition: { duration: 0.3, delay: 0.05 * (index - 4) } } : undefined}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
    onClick={() => onClick(cert)}
    className="xs:w-[250px] w-full card-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer select-none"
  >
    <div className="bg-jetLight rounded-[20px] py-5 px-8 min-h-[200px] flex flex-col justify-evenly gap-3">
      <div className="w-11 h-11 rounded-xl bg-[#1a1a1a] flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="12" y2="17" />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-taupe font-semibold text-sm leading-snug font-beckman tracking-[1px]">{cert.title}</p>
        <p className="text-dim text-xs font-poppins">{cert.issuer}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-[11px] text-taupe bg-jetLight border border-white/10 rounded-full px-2.5 py-1 w-fit font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Verified
      </span>
    </div>
  </motion.div>
);

const CertModal = ({ cert, onClose }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cert.file;
    link.download = cert.fileName;
    link.click();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-6 w-full max-w-md flex flex-col gap-5 shadow-2xl border border-black/10"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-[#1a1a1a] font-semibold text-base leading-snug">{cert.title}</h3>
              <p className="text-[#555] text-sm mt-0.5">{cert.issuer}</p>
            </div>
            <button onClick={onClose} className="text-[#555] hover:text-[#1a1a1a] transition-colors p-1 -mt-1 -mr-1" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <PdfViewer file={cert.file} />
          <div className="flex gap-3 justify-end">
            <button onClick={() => window.open(cert.file, "_blank")} className="flex items-center gap-2 text-sm text-[#555] border border-black/15 rounded-xl px-4 py-2 hover:bg-[#f5f5f5] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View full
            </button>
            <button onClick={handleDownload} className="flex items-center gap-2 text-sm text-white bg-[#1a1a1a] rounded-xl px-4 py-2 hover:bg-[#333] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Certifications = () => {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? certifications : certifications.slice(0, INITIAL_COUNT);

  return (
    <div className="mt-[-2rem]">
      <motion.div variants={textVariant()}>
        <p className="text-[#a09d9d] text-sm uppercase tracking-widest mb-1">Certified & Verified</p>
        <h2 className="text-white font-bold text-4xl">Certifications.</h2>
      </motion.div>

      <AnimatePresence>
        <div className="mt-10 flex flex-wrap gap-7">
          {visible.map((cert, i) => (
            <CertCard key={cert.fileName} cert={cert} onClick={setSelected} index={i} animate={i >= INITIAL_COUNT} />
          ))}
        </div>
      </AnimatePresence>

      {/* Show more / Show less */}
      {certifications.length > INITIAL_COUNT && (
        <motion.div
          variants={fadeIn("up", "tween", 0.4, 0.6)}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-sm text-timberWolf border border-white/20 rounded-xl px-6 py-3 hover:bg-white/10 transition-all duration-300 font-medium"
          >
            {showAll ? (
              <>
                Show less
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </>
            ) : (
              <>
                View all {certifications.length} certifications
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </>
            )}
          </button>
        </motion.div>
      )}

      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default SectionWrapper(Certifications, "certifications");
