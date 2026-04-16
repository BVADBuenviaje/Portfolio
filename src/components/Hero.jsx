import { motion } from "framer-motion";
import SpriteAvatar from "./SpriteAvatar";
import GradientText from "./GradientText";
import { useCharacter } from "../context/CharacterContext";
import useHoverSfx from "../hooks/useHoverSfx";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const leftPanelVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const leftItemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Hero() {
  const { setHoveredElement } = useCharacter();
  const playHoverSfx = useHoverSfx();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 md:px-6 py-20 md:py-0 relative z-10"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center"
      >
        {/* Left — Text */}
        <motion.div variants={leftPanelVariants} className="text-left pl-0 md:pl-12">
          <motion.p
            variants={leftItemVariants}
            className="text-retro-green text-xl mb-2"
          >
            {"// WELCOME TO MY PORTFOLIO"}
          </motion.p>

          <motion.h1
            variants={leftItemVariants}
            className="text-white text-5xl sm:text-6xl md:text-8xl leading-none mb-6"
          >
            HI, I AM
            <br />
            <GradientText
              colors={["#32ba7d", "#2dd4bf", "#a7f3d0", "#32ba7d"]}
              animationSpeed={6}
            >
              WYETH
            </GradientText>
          </motion.h1>

          <motion.p
            variants={leftItemVariants}
            className="text-retro-green/70 text-lg md:text-xl leading-relaxed max-w-md"
          >
            Leveling up the web. I turn complex logic 
            <br />
            into clean, intuitive, and high-performing digital experiences.
          </motion.p>

          <motion.div variants={leftItemVariants} className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#projects-header"
              onMouseEnter={() => {
                playHoverSfx();
                setHoveredElement("view-projects");
              }}
              onMouseLeave={() => setHoveredElement(null)}
              className="inline-block border-2 border-retro-green text-retro-green px-6 md:px-8 py-3 text-lg md:text-xl hover:bg-retro-green hover:text-black transition-colors duration-200 text-center"
            >
              {"▶ VIEW PROJECTS"}
            </a>
            <a
              href="#contact"
              onMouseEnter={() => {
                playHoverSfx();
                setHoveredElement("get-in-touch");
              }}
              onMouseLeave={() => setHoveredElement(null)}
              className="inline-block border-2 border-retro-green text-retro-green px-6 md:px-8 py-3 text-lg md:text-xl hover:bg-retro-green hover:text-black transition-colors duration-200 text-center"
            >
              {"▶ GET IN TOUCH"}
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={leftItemVariants} className="mt-8 flex gap-4 md:gap-6">
            {[
              {
                label: "Facebook",
                href: "https://www.facebook.com/share/14YQTLADq47/",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/brian-vincent-alfred-r-buenviaje-690778350/",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                label: "GitHub",
                href: "https://github.com/BVADBuenviaje",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.6-4.04-1.6a3.18 3.18 0 00-1.34-1.76c-1.1-.75.08-.74.08-.74a2.52 2.52 0 011.84 1.24 2.56 2.56 0 003.5 1 2.55 2.55 0 01.76-1.6c-2.67-.3-5.48-1.34-5.48-5.96a4.67 4.67 0 011.24-3.24 4.34 4.34 0 01.12-3.2s1.01-.32 3.3 1.24a11.3 11.3 0 016 0c2.28-1.56 3.29-1.24 3.29-1.24a4.34 4.34 0 01.12 3.2 4.66 4.66 0 011.23 3.24c0 4.63-2.82 5.65-5.5 5.95a2.85 2.85 0 01.82 2.22v3.3c0 .32.21.7.83.58A12 12 0 0012 .5z" />
                  </svg>
                ),
              },
              {
                label: "X",
                href: "#",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.9 2H22l-6.77 7.74L23 22h-6.1l-4.77-6.23L6.7 22H3.6l7.24-8.27L1 2h6.24l4.3 5.68L18.9 2zm-1.07 18h1.69L6.3 3.9H4.47L17.83 20z" />
                  </svg>
                ),
              },
              {
                label: "Discord",
                href: "https://discord.com/users/757132276915241034",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.3 4.37A19.8 19.8 0 0015.4 3l-.23.46a18.3 18.3 0 00-6.34 0L8.6 3a19.72 19.72 0 00-4.9 1.37C.62 9.03-.18 13.55.22 18.01a19.92 19.92 0 006.03 3.04l1.29-1.77a12.95 12.95 0 01-2.03-.98l.49-.37c3.91 1.84 8.16 1.84 12.03 0l.49.37c-.64.38-1.32.71-2.03.98l1.29 1.77a19.9 19.9 0 006.02-3.04c.48-5.18-.82-9.67-3.5-13.64zM8.68 15.27c-1.17 0-2.12-1.08-2.12-2.41s.94-2.41 2.12-2.41 2.13 1.08 2.12 2.41c0 1.33-.95 2.41-2.12 2.41zm6.64 0c-1.17 0-2.12-1.08-2.12-2.41s.94-2.41 2.12-2.41 2.13 1.08 2.12 2.41c0 1.33-.94 2.41-2.12 2.41z" />
                  </svg>
                ),
              },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onMouseEnter={() => {
                  playHoverSfx();
                  setHoveredElement(`social-${label.toLowerCase()}`);
                }}
                onMouseLeave={() => setHoveredElement(null)}
                className="group relative flex flex-col items-center text-retro-green hover:text-white transition-all duration-200 hover:-translate-y-1"
              >
                <span className="border-2 border-retro-green p-2 group-hover:border-white transition-colors duration-200">
                  {icon}
                </span>
                <span className="absolute top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs leading-none">
                  ▲
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Sprite Window */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-4 md:mt-0"
        >
          <SpriteAvatar />
        </motion.div>
      </motion.div>
    </section>
  );
}
