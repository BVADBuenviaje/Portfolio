import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCharacter } from "../context/CharacterContext";

const DESKTOP_SCALE = 4;
const MOBILE_SCALE = 3;
const MOBILE_BREAKPOINT = 768;

export default function SpriteCompanion() {
  const { character, dialogue, currentSection } = useCharacter();
  const [isScrolling, setIsScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });
  const scrollTimer = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setIsScrolling(false), 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer.current);
    };
  }, []);

  const anim = isScrolling ? character.run : character.idle;
  const scale = isMobile ? MOBILE_SCALE : DESKTOP_SCALE;
  const spriteW = character.w * anim.frames * scale;
  const spriteH = character.h * scale;
  const displayW = character.w * scale;
  const displayH = character.h * scale;
  const animName = `companion-${character.name}-${isScrolling ? "run" : "idle"}`;
  const duration = anim.frames * 0.12;

  if (!mounted || typeof document === "undefined") return null;

  const companionContent = (
    <div className="fixed top-0 left-0 w-screen h-[100dvh] pointer-events-none z-[60]">
      <div className="absolute bottom-[max(0.5rem,env(safe-area-inset-bottom))] -left-2 md:-bottom-8 md:left-0 flex items-end gap-0 transition-transform duration-200">
        
        {/* Sprite */}
        <div className="relative pointer-events-auto">
          <div
            style={{
              width: displayW,
              height: displayH,
              backgroundImage: `url(${anim.src})`,
              backgroundSize: `${spriteW}px ${spriteH}px`,
              imageRendering: "pixelated",
              animation: `${animName} ${duration}s steps(${anim.frames}) infinite`,
              transition: "opacity 0.2s ease-in-out",
            }}
          />

          <style>{`
            @keyframes ${animName} {
              from { background-position-x: 0; }
              to { background-position-x: -${spriteW}px; }
            }
          `}</style>
        </div>

        {/* Dialogue Box */}
        <AnimatePresence mode="wait">
          {dialogue && (
            <motion.div
              key={dialogue}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="border-2 border-retro-green bg-black px-3 md:px-4 py-2 max-w-[11rem] md:max-w-xs mb-16 md:mb-24 relative -ml-8 md:-ml-12 pointer-events-auto"
            >
              {/* Speech arrow */}
              <div
                className="absolute left-0 bottom-4 -translate-x-full w-0 h-0"
                style={{
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderRight: "8px solid #32ba7d",
                }}
              />
              <p className="text-retro-green text-xs md:text-sm leading-snug">
                <span className="text-white">{character.name}:</span>{" "}
                {dialogue}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return createPortal(companionContent, document.body);
}