import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

    const renderPdf = async () => {
      setLoading(true);
      setError(false);
      try {
        const pdfjsLib = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
          .replace("cdnjs.cloudflare.com", "cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build")
          .replace("/pdf.min.js", "/pdf.min.js"));
      } catch {}

      try {
        // Load pdf.js from CDN via script tag if not already loaded
        if (!window.pdfjsLib) {
          await new Promise((resolve, reject) => {
            if (document.querySelector("#pdfjs-script")) {
              resolve();
              return;
            }
            const script = document.createElement("script");
            script.id = "pdfjs-script";
            script.src = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
        }

        const pdf = await window.pdfjsLib.getDocument(file).promise;
        const page = await pdf.getPage(1);

        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const containerWidth = canvas.parentElement?.clientWidth || 400;
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        await page.render({
          canvasContext: canvas.getContext("2d"),
          viewport: scaledViewport,
        }).promise;

        if (!cancelled) setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    };

    renderPdf();
    return () => { cancelled = true; };
  }, [file]);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d1a] flex items-center justify-center" style={{ minHeight: "320px" }}>
      {loading && (
        <div className="flex flex-col items-center gap-2 text-[#a8a8c0]">
          <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          <span className="text-xs">Cargando certificado...</span>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center gap-2 text-[#a8a8c0] px-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span className="text-xs">Usa "Ver completo" para abrir el certificado</span>
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
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
    onClick={() => onClick(cert)}
    className="glassmorphism card-shadow cursor-pointer rounded-2xl p-5 flex flex-col gap-4 select-none"
  >
    <div className="w-11 h-11 rounded-xl bg-[#1a1a2e] flex items-center justify-center border border-white/10">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a8a8c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="9" y1="13" x2="15" y2="13"/>
        <line x1="9" y1="17" x2="12" y2="17"/>
      </svg>
    </div>
    <div className="flex flex-col gap-1">
      <p className="text-white font-medium text-sm leading-snug">{cert.title}</p>
      <p className="text-[#a8a8c0] text-xs">{cert.issuer}</p>
    </div>
    <span className="inline-flex items-center gap-1 text-[11px] text-[#6ee7b7] bg-[#064e3b]/40 border border-[#6ee7b7]/20 rounded-full px-2.5 py-1 w-fit">
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
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

  const handleView = () => {
    window.open(cert.file, "_blank");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="glassmorphism rounded-2xl p-6 w-full max-w-md flex flex-col gap-5"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-semibold text-base leading-snug">{cert.title}</h3>
              <p className="text-[#a8a8c0] text-sm mt-0.5">{cert.issuer}</p>
            </div>
            <button
              onClick={onClose}
              className="text-[#a8a8c0] hover:text-white transition-colors p-1 -mt-1 -mr-1"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <PdfViewer file={cert.file} />

          <div className="flex gap-3 justify-end">
            <button
              onClick={handleView}
              className="flex items-center gap-2 text-sm text-[#a8a8c0] border border-white/10 rounded-xl px-4 py-2 hover:bg-white/5 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Ver completo
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 text-sm text-white bg-[#1a1a3e] border border-white/20 rounded-xl px-4 py-2 hover:bg-[#22224e] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
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
    <section className="max-w-7xl mx-auto px-6 py-16" id="certifications">
      <div className="mb-10">
        <p className="text-[#a8a8c0] text-sm uppercase tracking-widest mb-1">Lo que he logrado</p>
        <h2 className="text-white font-bold text-4xl">Certificaciones.</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {certifications.map((cert, i) => (
          <CertCard key={i} cert={cert} onClick={setSelected} index={i} />
        ))}
      </div>
      {selected && (
        <CertModal cert={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
};

export default Certifications;
