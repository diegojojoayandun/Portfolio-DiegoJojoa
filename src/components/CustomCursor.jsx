import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const rafRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onEnter = (e) => {
      const el = e.target;
      const interactive = el.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']");
      if (interactive) setHovering(true);
    };

    const onLeave = (e) => {
      const el = e.target;
      const interactive = el.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']");
      if (interactive) setHovering(false);
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    const animate = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.1;
      ringY.current += (mouseY.current - ringY.current) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX.current}px, ${ringY.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: clicking ? "6px" : "8px",
          height: clicking ? "6px" : "8px",
          background: "white",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
          marginLeft: clicking ? "-3px" : "-4px",
          marginTop: clicking ? "-3px" : "-4px",
          transition: "width 0.15s, height 0.15s, opacity 0.3s, margin 0.15s",
          willChange: "transform",
        }}
      />

      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? "60px" : clicking ? "32px" : "40px",
          height: hovering ? "60px" : clicking ? "32px" : "40px",
          border: "1.5px solid white",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
          marginLeft: hovering ? "-30px" : clicking ? "-16px" : "-20px",
          marginTop: hovering ? "-30px" : clicking ? "-16px" : "-20px",
          transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s, margin 0.35s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default CustomCursor;
