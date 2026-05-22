import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseX = useRef(window.innerWidth / 2);
  const mouseY = useRef(window.innerHeight / 2);
  const ringX = useRef(window.innerWidth / 2);
  const ringY = useRef(window.innerHeight / 2);
  const rafRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };

    const onOver = (e) => {
      const interactive = e.target.closest("a, button, [role='button'], input, textarea, select");
      setHovering(!!interactive);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    const animate = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.1;
      ringY.current += (mouseY.current - ringY.current) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = ringX.current + "px";
        ringRef.current.style.top = ringY.current + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const dotSize = clicking ? 6 : 8;
  const ringSize = hovering ? 60 : clicking ? 28 : 40;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: dotSize + "px",
          height: dotSize + "px",
          borderRadius: "50%",
          background: "white",
          pointerEvents: "none",
          zIndex: 999999,
          opacity: visible ? 1 : 0,
          transform: "translate(-50%, -50%)",
          transition: "width 0.1s, height 0.1s, opacity 0.3s",
          mixBlendMode: "difference",
          top: 0,
          left: 0,
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: ringSize + "px",
          height: ringSize + "px",
          borderRadius: "50%",
          border: "1.5px solid white",
          pointerEvents: "none",
          zIndex: 999998,
          opacity: visible ? 0.8 : 0,
          transform: "translate(-50%, -50%)",
          transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s",
          mixBlendMode: "difference",
          top: 0,
          left: 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
