import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCharacter } from "../context/CharacterContext";

// Sprite assets by Xiao Su Zao Shui
// https://xiaosuzaoshui.itch.io

const DESKTOP_SCALE = 5;
const MOBILE_SCALE = 3;
const XS_SCALE = 2;
const MOBILE_BREAKPOINT = 640;
const XS_BREAKPOINT = 380;

export default function SpriteAvatar() {
  const { characters, characterIndex, setCharacterIndex, character } = useCharacter();
  const [viewportWidth, setViewportWidth] = useState(() => {
    if (typeof window === "undefined") return 1024;
    return window.innerWidth;
  });

  const prev = () => setCharacterIndex((i) => (i - 1 + characters.length) % characters.length);
  const next = () => setCharacterIndex((i) => (i + 1) % characters.length);

  const char = character;
  const anim = char.idle;
  const scale =
    viewportWidth < XS_BREAKPOINT
      ? XS_SCALE
      : viewportWidth < MOBILE_BREAKPOINT
        ? MOBILE_SCALE
        : DESKTOP_SCALE;

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="border-4 border-retro-green bg-black p-2 inline-block max-w-full w-full md:w-auto"
    >
      {/* Window Title Bar */}
      <div className="border-b-2 border-retro-green px-3 py-1 text-retro-green text-sm flex items-center justify-between mb-2">
        <span>character.exe</span>
        <span>[ _ □ X ]</span>
      </div>

      {/* Sprite Display */}
      <div className="flex items-center justify-center gap-2 md:gap-4 px-2 md:px-4">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="text-retro-green text-xl md:text-2xl hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
        >
          ◀
        </button>

        {/* Animated Sprite */}
        <AnimatePresence mode="wait">
          <motion.div
            key={char.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              width: char.w * scale,
              height: char.h * scale,
              backgroundImage: `url(${anim.src})`,
              backgroundSize: `${char.w * anim.frames * scale}px ${char.h * scale}px`,
              imageRendering: "pixelated",
              animation: `sprite-${char.name} ${anim.frames * 0.15}s steps(${anim.frames}) infinite`,
            }}
          />
        </AnimatePresence>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="text-retro-green text-xl md:text-2xl hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
        >
          ▶
        </button>
      </div>

      {/* Character Name */}
      <div className="border-t-2 border-retro-green mt-2 pt-1 text-retro-green text-center text-lg">
        {char.name}
      </div>

      {/* Dialogue Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={char.name + "-quote"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="border-2 border-retro-green mx-1 mt-2 px-3 py-2 text-retro-green text-sm leading-snug text-left"
        >
          <span className="text-white">{char.name}:</span>
          <br />
          {"Select your companion! They'll guide you through the portfolio."}
        </motion.div>
      </AnimatePresence>

      {/* Credit */}
      <div className="text-retro-green/40 text-xs text-center mt-2">
        Sprites by Xiao Su Zao Shui
      </div>

      {/* Keyframes for all characters */}
      <style>{characters.map((c) => `
        @keyframes sprite-${c.name} {
          from { background-position-x: 0; }
          to { background-position-x: -${c.w * c.idle.frames * scale}px; }
        }
      `).join("")}</style>
    </motion.div>
  );
}
