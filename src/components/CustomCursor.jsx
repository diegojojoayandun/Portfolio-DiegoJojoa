import { useEffect, useRef, useState } from "react";

const isTouchDevice = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTouchDevice()) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const over = (e) => {
      setHovering(!!e.target.closest("a, button, [role='button']"));
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mousedown", () => setClicking(true));
    document.addEventListener("mouseup", () => setClicking(false));
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      {/* Dot — sharp, exact */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: "-4px",
          left: "-4px",
          width: clicking ? "6px" : "8px",
          height: clicking ? "6px" : "8px",
          borderRadius: "50%",
          background: hovering ? "#fff" : "#fff",
          pointerEvents: "none",
          zIndex: 2147483647,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s, width 0.1s, height 0.1s",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />

      {/* Ring — lagged */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: hovering ? "-30px" : clicking ? "-14px" : "-20px",
          left: hovering ? "-30px" : clicking ? "-14px" : "-20px",
          width: hovering ? "60px" : clicking ? "28px" : "40px",
          height: hovering ? "60px" : clicking ? "28px" : "40px",
          borderRadius: "50%",
          border: "1.5px solid #fff",
          pointerEvents: "none",
          zIndex: 2147483646,
          opacity: visible ? 0.85 : 0,
          transition: "opacity 0.2s, width 0.4s cubic-bezier(0.22,1,0.36,1), height 0.4s cubic-bezier(0.22,1,0.36,1), top 0.4s cubic-bezier(0.22,1,0.36,1), left 0.4s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
};

export default CustomCursor;
