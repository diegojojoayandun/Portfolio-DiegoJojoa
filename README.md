<div align="center">

<img src="src/assets/logo/logodev.png" alt="DEV Logo" width="80" />

# Diego Fernando Jojoa Yandun — Portfolio

**Fullstack Developer · .NET · Python · Cybersecurity**

[![Live](https://img.shields.io/badge/Live-diegojojoayandun.site-black?style=flat-square&logo=vercel)](https://diegojojoayandun.site)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-white?style=flat-square)](LICENSE)

</div>

---

## ✨ Demo

🌐 **[diegojojoayandun.site](https://diegojojoayandun.site)**

---

## 🚀 Stack

| Categoría | Tecnología |
|---|---|
| Framework | React 18 + Vite 4 |
| Animaciones | Framer Motion 10 |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Estilos | TailwindCSS 3 |
| PDF Viewer | pdfjs-dist 5 |
| i18n | react-i18next + i18next-browser-languagedetector |
| Deploy | Vercel (Static Build) |
| Dominio | GoDaddy → diegojojoayandun.site |
| CV Storage | Vercel Blob Storage |

---

## 📁 Estructura del proyecto

```
src/
├── assets/              # Imágenes, íconos, fuentes
├── components/
│   ├── About.jsx        # Perfil y servicios
│   ├── Certifications.jsx # Galería de certificaciones con visor PDF
│   ├── Contact.jsx      # Tarjetas de contacto
│   ├── CustomCursor.jsx # Cursor personalizado con efecto magnetic
│   ├── Experience.jsx   # Timeline de experiencia laboral
│   ├── Footer.jsx       # Footer con iconos magnéticos
│   ├── Hero.jsx         # Sección hero con cortina cinematográfica
│   ├── Navbar.jsx       # Navbar con toggle de idioma EN/ES
│   ├── Projects.jsx     # Galería de proyectos interactiva
│   ├── Tech.jsx         # Tecnologías con bolas 3D (desktop) / íconos (móvil)
│   └── canvas/
│       └── Ball.jsx     # Bola 3D con WebGL optimizado
├── constants/
│   └── index.js         # Datos: navLinks, services, technologies, experiences, projects
├── hoc/
│   └── SectionWrapper.jsx # HOC con animaciones de entrada
├── i18n/
│   ├── en.json          # Traducciones en inglés
│   └── es.json          # Traducciones en español
├── i18n.js              # Configuración de i18next
├── styles.js            # Clases utilitarias globales
├── utils/
│   └── motion.js        # Variantes de animación reutilizables
├── App.jsx              # Composición principal
└── main.jsx             # Entry point
public/
├── certifications/      # PDFs de certificaciones
└── resume.pdf           # CV descargable (alternativa local)
vercel.json              # Configuración de deploy y headers de seguridad
```

---

## 🌍 Internacionalización (i18n)

El portafolio detecta automáticamente el idioma del navegador y renderiza en **inglés** o **español**. El usuario puede cambiar el idioma manualmente con el botón **EN / ES** en el navbar.

- Detección automática via `i18next-browser-languagedetector`
- Preferencia guardada en `localStorage`
- Fallback: inglés
- Traducciones en `src/i18n/en.json` y `src/i18n/es.json`

---

## 🔒 Seguridad

Headers HTTP configurados en `vercel.json`:

| Header | Valor |
|---|---|
| `Content-Security-Policy` | script-src sin unsafe-eval, font-src restringido |
| `Strict-Transport-Security` | max-age=63072000; includeSubDomains; preload |
| `X-Frame-Options` | DENY |
| `X-Content-Type-Options` | nosniff |
| `Referrer-Policy` | strict-origin-when-cross-origin |
| `Permissions-Policy` | camera, mic, geolocation, payment bloqueados |

**Score de seguridad: A** (verificado con securityheaders.com)

---

## 🖥️ Features destacadas

- **Cortina cinematográfica** — animación de apertura al cargar la página
- **Cursor personalizado** — punto + anillo con lag, mix-blend-mode difference, solo en desktop
- **Bolas 3D** — WebGL optimizado con `frameloop="demand"` y `powerPreference: "low-power"`. Fallback a íconos en móvil
- **Visor de certificaciones** — renderiza PDFs en canvas con pdfjs-dist, sin iframes
- **Timeline de experiencia** — con descarga de CV desde Vercel Blob Storage
- **Footer magnético** — íconos que se atraen al cursor con spring physics
- **Responsive completo** — adaptado para desktop, tablet y móvil

---

## 🛠️ Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/diegojojoayandun/Portfolio-Template.git
cd Portfolio-Template

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

---

## 🚢 Deploy en Vercel

El proyecto está configurado para deploy estático con Vite:

```json
{
  "framework": "vite",
  "builds": [{ "src": "package.json", "use": "@vercel/static-build", "config": { "distDir": "dist" } }]
}
```

**Pasos:**
1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Vercel detecta automáticamente la configuración
3. Configura las variables de entorno si es necesario
4. El deploy se ejecuta en cada `git push` a `main`

### Dominio personalizado (GoDaddy)

1. En Vercel → Settings → Domains → agregar dominio
2. En GoDaddy → Administrar DNS → agregar registro `A`:
   - Host: `@`
   - Valor: `216.198.79.1`
3. Esperar propagación (5 min — 2 horas)

---

## 📦 Variables de entorno

```env
# Vercel Blob (para descarga del CV)
BLOB_READ_WRITE_TOKEN=tu_token_aqui
```

---

## 📄 Licencia

MIT © [Diego Fernando Jojoa Yandun](https://diegojojoayandun.site)

---

<div align="center">
  <sub>Diseñado y desarrollado por Diego Fernando Jojoa Yandun</sub>
</div>
