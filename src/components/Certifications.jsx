import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const certifications = [
  {
    title: "Hoberton Desarrollador Backend",
    issuer: "Holberton School",
    file: "/certifications/Hoberton Desarrollador Backend.pdf",
    fileName: "Hoberton_Desarrollador_Backend.pdf",
  },
  {
    title: "Talento Tech Arquitectura en Nube",
    issuer: "Talento Tech",
    file: "/certifications/Talento Tech Arquitectura en Nube.pdf",
    fileName: "TalentoTech_Arquitectura_Nube.pdf",
  },
  {
    title: "Talento Tech Desarrollo Web",
    issuer: "Talento Tech",
    file: "/certifications/Talento Tech Desarrollo Web.pdf",
    fileName: "TalentoTech_Desarrollo_Web.pdf",
  },
  {
    title: "Certificado Profesional Google CI/CD",
    issuer: "Google",
    file: "/certifications/CERTIFICADO_PROFESIONAL_GOOGLE_CI.pdf",
    fileName: "Certificado_Profesional_Google_CICD.pdf",
  },
];

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
        await page.render({
          canvasContext: canvas.getContext("2d"),
          viewport: scaled,
        }).promise;
        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [file]);

  return (
    <div
      className="rounded-xl overflow-hidden border border-black/10 bg-[#f0f0f0] flex items-center justify-center"
      style={{ minHeight: "320px" }}
    >
      {loading && (
        <div className="flex flex-col items-center gap-2 text-[#555]">
          <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <span className="text-xs">Cargando certificado...</span>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center gap-3 text-[#555] px-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-xs leading-relaxed">
            Usa "Ver completo" para abrir el certificado.
          </span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ display: loading || error ? "none" : "block" }}
      />
    </div>
  );
};

const CertCard = ({ cert, onClick, index }) => (
  <motion.div
    variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
    onClick={() => onClick(cert)}
    className="xs:w-[250px] w-full cursor-pointer rounded-[20px] p-5 flex flex-col gap-4 select-none border border-black/10 bg-white/80 shadow-card hover:shadow-lg transition-shadow duration-300"
  >
    <div className="w-11 h-11 rounded-xl bg-[#1a1a1a] flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#e0e0e0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="12" y2="17" />
      </svg>
    </div>
    <div className="flex flex-col gap-1">
      <p className="text-[#1a1a1a] font-semibold text-sm leading-snug">
        {cert.title}
      </p>
      <p className="text-[#555] text-xs">{cert.issuer}</p>
    </div>
    <span className="inline-flex items-center gap-1 text-[11px] text-[#1a1a1a] bg-[#e8e8e8] border border-black/10 rounded-full px-2.5 py-1 w-fit font-medium">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Verificado
    </span>
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
              <h3 className="text-[#1a1a1a] font-semibold text-base leading-snug">
                {cert.title}
              </h3>
              <p className="text-[#555] text-sm mt-0.5">{cert.issuer}</p>
            </div>
            <button
              onClick={onClose}
              className="text-[#555] hover:text-[#1a1a1a] transition-colors p-1 -mt-1 -mr-1"
              aria-label="Cerrar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <PdfViewer file={cert.file} />
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => window.open(cert.file, "_blank")}
              className="flex items-center gap-2 text-sm text-[#555] border border-black/15 rounded-xl px-4 py-2 hover:bg-[#f5f5f5] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Ver completo
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 text-sm text-white bg-[#1a1a1a] rounded-xl px-4 py-2 hover:bg-[#333] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Descargar PDF
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Certifications = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="mt-[-2rem]">
      <motion.div variants={textVariant()}>
        <p className="text-[#a09d9d] text-sm uppercase tracking-widest mb-1">
          Certified & Verified
        </p>
        <h2 className="text-white font-bold text-4xl">Credentials.</h2>
      </motion.div>

      <div className="mt-10 flex flex-wrap gap-7">
        {certifications.map((cert, i) => (
          <CertCard key={i} cert={cert} onClick={setSelected} index={i} />
        ))}
      </div>

      {selected && (
        <CertModal cert={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default SectionWrapper(Certifications, "certifications");
