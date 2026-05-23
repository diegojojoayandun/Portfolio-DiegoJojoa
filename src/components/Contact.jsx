import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";

const contacts = [
  {
    label: "Email",
    value: "diego.jojoa@proton.me",
    href: "mailto:diego.jojoa@proton.me",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "diego-fernando-jojoa-yandun",
    href: "https://www.linkedin.com/in/diego-fernando-jojoa-yandun/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "diegojojoayandun",
    href: "https://github.com/diegojojoayandun",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9 17.44 9 18v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "+57 (Colombia)",
    href: "https://wa.me/573233266482",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.1-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

const ContactCard = ({ contact, index }) => (
  <motion.a
    href={contact.href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="group card-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer"
  >
    <div className="bg-jetLight rounded-[20px] py-5 px-8 min-h-[200px] flex flex-col justify-evenly items-center text-center gap-3">
      <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-taupe group-hover:text-timberWolf transition-colors duration-300">
        {contact.icon}
      </div>
      <div>
        <p className="text-dim text-xs uppercase tracking-widest mb-1 font-poppins">
          {contact.label}
        </p>
        <p className="text-taupe font-medium text-sm leading-snug font-beckman tracking-[1px]">
          {contact.value}
        </p>
      </div>
      <div className="flex items-center gap-2 text-dim text-xs group-hover:text-timberWolf transition-colors duration-300">
        <span className="font-poppins">Get in touch</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:translate-x-1 transition-transform duration-200"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </div>
  </motion.a>
);

const Contact = () => {
  return (
    <div className="-mt-[8rem] flex flex-col gap-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <h3 className={styles.sectionHeadTextLight}>Contact.</h3>
        <p className="text-taupe mt-2 text-sm">
          Open to opportunities — let's build something together.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contacts.map((contact, i) => (
          <ContactCard key={contact.label} contact={contact} index={i} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
