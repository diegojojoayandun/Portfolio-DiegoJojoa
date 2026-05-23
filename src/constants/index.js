import {
  frontend,
  backend,
  ux,
  prototyping,
  cybersecurity,
  javascript,
  html,
  css,
  reactjs,
  nodejs,
  git,
  gcp,
  docker,
  postgresql,
  python,
  net,
  mysql,
  aws,
  azure,
  portfolio,
  cajahonor,
  nanypetapi,
  miabogadoya,
  beautybussiness,
  yam,
  c360,
  devsu,
  holberton,
  renovaim,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "tech",
    title: "Tech",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "certifications",
    title: "Certs",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: frontend,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Cloud Architecture",
    icon: prototyping,
  },
  {
    title: "Cybersecurity",
    icon: cybersecurity,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: ".Net",
    icon: net,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "AWS",
    icon: aws,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Back-End Developer (Freelance)",
    company_name: "Renova IM",
    icon: renovaim,
    iconBg: "#333333",
    date: "January 2019 - December 2022",
  },
  {
    title: "Back-End Developer",
    company_name: "Complemento",
    icon: c360,
    iconBg: "#333333",
    date: "May 2023 - May 2024",
  },
  {
    title: "Back-End Developer",
    company_name: "Holberton",
    icon: holberton,
    iconBg: "#333333",
    date: "Sep 2022 - Mar 2023",
  },
  {
    title: "Front-End Developer",
    company_name: "Devsu",
    icon: devsu,
    iconBg: "#333333",
    date: "Dec 2021 - Jun 2022",
  },
];

const projects = [
  {
    id: "project-0",
    name: "Portfolio",
    description: "My personal portfolio, Vite, three.js, reactJs, Tailwind.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "Tailwind",
        color: "green-text-gradient",
      },
      {
        name: "Vite",
        color: "pink-text-gradient",
      },
    ],
    image: portfolio,
    repo: "https://github.com/diegojojoayandun/Portfolio-DiegoJojoa",
  },
  {
    id: "project-1",
    name: "CajaHonor",
    description:
      "Corporate web app for managing military housing funds. using React and .NET.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: ".Net",
        color: "green-text-gradient",
      },
      {
        name: "Azure",
        color: "pink-text-gradient",
      },
    ],
    image: cajahonor,
  },
  {
    id: "project-2",
    name: "NanyPet RestAPI",
    description:
      "RestAPI: 3-tier architecture, repository pattern, Ardalis Endpoints, .NET 7.0",
    tags: [
      {
        name: ".NET",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "Sql",
        color: "pink-text-gradient",
      },
    ],
    image: nanypetapi,
    repo: "https://github.com/diegojojoayandun/NanyPetApi",
  },
  {
    id: "project-3",
    name: "Mi Abogado Ya!",
    description: "MERN Stack web app. Javascript, React, NodeJS, MongoDB",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient",
      },
      {
        name: "express",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
    ],
    image: miabogadoya,
    repo: "https://github.com/diegojojoayandun/ciclo4-stack-mern",
  },
  {
    id: "project-4",
    name: "Beauty Bussiness",
    description: `A web application that allows manage Beauty Shops, Made with Python; Django, Postgres.`,
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Django",
        color: "green-text-gradient",
      },
      {
        name: "Postgres",
        color: "pink-text-gradient",
      },
    ],
    image: beautybussiness,
    repo: "https://github.com/diegojojoayandun/Beauty_Business_DJ",
  },
  {
    id: "project-5",
    name: "Yet Another Mail",
    description:
      "This is a Google Chrome extension tha simplify gmail client. CSS3, Vanilla JS",
    tags: [
      {
        name: "javascript",
        color: "blue-text-gradient",
      },
      {
        name: "html",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: yam,
    repo: "https://github.com/diegojojoayandun/yam",
  },
];

export { services, technologies, experiences, projects };
