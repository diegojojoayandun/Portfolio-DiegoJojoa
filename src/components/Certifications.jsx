import { useState } from "react";
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
    {/* Icon */}
    <div className="w-11 h-11 rounded-xl bg-[#1a1a2e] flex items-center justify-center border border-white/10">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a8a8c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="9" y1="13" x2="15" y2="13"/>
        <line x1="9" y1="17" x2="12" y2="17"/>
      </svg>
    </div>

    {/* Info */}
    <div className="flex flex-col gap-1">
      <p className="text-white font-medium text-sm leading-snug">{cert.title}</p>
      <p className="text-[#a8a8c0] text-xs">{cert.issuer}</p>
    </div>

    {/* Badge */}
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
          {/* Header */}
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

          {/* PDF Preview */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d1a]" style={{ height: "360px" }}>
            <iframe
              src={cert.file + "#toolbar=0"}
              title={cert.title}
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </div>

          {/* Actions */}
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
      {/* Section Header */}
      <div className="mb-10">
        <p className="text-[#a8a8c0] text-sm uppercase tracking-widest mb-1">Lo que he logrado</p>
        <h2 className="text-white font-bold text-4xl">Certificaciones.</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {certifications.map((cert, i) => (
          <CertCard key={i} cert={cert} onClick={setSelected} index={i} />
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <CertModal cert={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
};

export default Certifications;
