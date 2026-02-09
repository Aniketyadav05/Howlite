import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  
  const [mode, setMode] = useState("default");
  const [isVisible, setIsVisible] = useState(false); // New state to control rendering

  useEffect(() => {
    // 1. MOBILE CHECK: Only run if device has a fine pointer (mouse)
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseOver = (e) => {
      const t = e.target;
      const tag = t.tagName.toLowerCase();
      
      if (tag === 'img' || t.classList.contains('reveal-img')) {
        setMode('image');
      }
      else if (
        tag === 'button' || 
        tag === 'a' || 
        t.closest('button') || 
        t.closest('a') ||
        t.classList.contains('cursor-pointer')
      ) {
        setMode('button');
      } 
      else if (['p', 'h1', 'h2', 'span', 'input'].includes(tag)) {
        setMode('text');
      } 
      else {
        setMode('default');
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    // Physics Loop
    const loop = () => {
      const ease = 0.15;
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      
      pos.current.x += dx * ease;
      pos.current.y += dy * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      requestAnimationFrame(loop);
    };

    const raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  // If on mobile, render nothing
  if (!isVisible) return null;

  // --- DYNAMIC STYLES ---
  const getCursorStyles = () => {
    const base = "fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-all duration-300 ease-out flex items-center justify-center";
    
    if (mode === 'image') {
      return `${base} w-32 h-32 border border-white/50 bg-white/10 backdrop-brightness-150 backdrop-saturate-150 shadow-[0_0_30px_rgba(255,255,255,0.3)] mix-blend-normal`;
    }
    if (mode === 'button') {
      return `${base} w-20 h-20 bg-white mix-blend-difference opacity-100`;
    }
    if (mode === 'text') {
      return `${base} w-16 h-16 bg-white mix-blend-difference opacity-100`;
    }
    return `${base} w-6 h-6 border border-white/50 mix-blend-difference opacity-50`;
  };

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ left: '-3px', top: '-3px' }} 
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full" />
      </div>

      <div 
        ref={cursorRef}
        className={getCursorStyles()}
        style={{ 
          marginLeft: mode === 'image' ? '-64px' : (mode === 'button' ? '-40px' : (mode === 'text' ? '-32px' : '-12px')), 
          marginTop: mode === 'image' ? '-64px' : (mode === 'button' ? '-40px' : (mode === 'text' ? '-32px' : '-12px')) 
        }}
      />
    </>
  );
};

export default CustomCursor;