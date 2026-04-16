import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useHoverSfx from "../hooks/useHoverSfx";

const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects-header" },
  { label: "CONTACT", href: "#contact" },
];
const RESUME_HREF = "/Buenviaje-Resume.pdf";

function RainToggleIcon({ on }) {
  if (on) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M16 14v6M13 17v3M19 17v3" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M2 2l20 20" />
    </svg>
  );
}

export default function Navbar({ rainEnabled = true, onRainToggle }) {
  const [logoLoadFailed, setLogoLoadFailed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResumeConfirm, setShowResumeConfirm] = useState(false);
  const lastScrollY = useRef(0);
  const navContainerRef = useRef(null);
  const playHoverSfx = useHoverSfx();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setVisible(true);
      return;
    }

    const getScrollTop = () => {
      const scrollingElement = document.scrollingElement;
      if (scrollingElement) return scrollingElement.scrollTop;
      return window.scrollY || document.documentElement.scrollTop || 0;
    };

    lastScrollY.current = getScrollTop();

    function handleScroll() {
      const currentY = getScrollTop();
      
      if (currentY <= 50 || currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      }

      lastScrollY.current = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    if (mobileMenuOpen) setVisible(true);
  }, [mobileMenuOpen]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!navContainerRef.current?.contains(event.target)) {
        setShowResumeConfirm(false);
        setMobileMenuOpen(false);
      }
    }

    if (showResumeConfirm || mobileMenuOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [showResumeConfirm, mobileMenuOpen]);

  const handleResumeClick = () => {
    setShowResumeConfirm((prev) => !prev);
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = RESUME_HREF;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setShowResumeConfirm(false);
    setMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-screen max-w-[100vw] z-50 bg-black/90 backdrop-blur-sm transition-transform duration-300 ${
        visible || isMobile ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div ref={navContainerRef} className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:items-center flex items-center justify-between min-w-0">
          <div className="text-retro-green pr-12 md:pr-0 whitespace-nowrap flex items-center gap-2 md:gap-3 min-w-0">
            {!logoLoadFailed ? (
              <img
                src="/Portfolio-logo.png"
                alt="Portfolio logo"
                onError={() => setLogoLoadFailed(true)}
                className="h-6 md:h-7 w-auto shrink-0"
              />
            ) : (
              <span className="text-xl md:text-2xl font-bold tracking-wider shrink-0">{"<BRIAN />"}</span>
            )}
            {onRainToggle && (
              <button
                type="button"
                onClick={() => {
                  playHoverSfx();
                  onRainToggle();
                }}
                onMouseEnter={playHoverSfx}
                className="shrink-0 border-2 border-retro-green text-retro-green w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-black hover:text-white transition-colors duration-200"
                aria-label={rainEnabled ? "Turn off rain effect" : "Turn on rain effect"}
                aria-pressed={rainEnabled}
              >
                <RainToggleIcon on={rainEnabled} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              playHoverSfx();
              setMobileMenuOpen((prev) => !prev);
            }}
            className="md:hidden z-[60] shrink-0 border-2 border-retro-green text-retro-green w-10 h-10 text-lg flex items-center justify-center bg-black"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "X" : "☰"}
          </button>

          <ul className="hidden md:flex gap-8 list-none m-0 p-0 justify-self-center">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onMouseEnter={playHoverSfx}
                  className="group flex items-center text-retro-green text-xl no-underline hover:text-white transition-colors duration-200"
                >
                  <span
                    className="inline-block w-0 overflow-hidden group-hover:w-5 transition-all duration-200 text-sm leading-none"
                    style={{ imageRendering: "pixelated" }}
                  >
                    ▶
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block justify-self-end relative">
            <button
              type="button"
              onClick={handleResumeClick}
              onMouseEnter={playHoverSfx}
              className="group flex items-center text-retro-green text-xl hover:text-white transition-colors duration-200"
              id="resume-btn-anchor"
              style={{ position: "relative", zIndex: 51 }}
            >
              <span
                className="inline-block w-5 text-sm leading-none transition-opacity duration-200 group-hover:opacity-100 opacity-0"
                style={{ imageRendering: "pixelated" }}
              >
                ▶
              </span>
              <span>RESUME</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3a1 1 0 011 1v8.59l2.3-2.3a1 1 0 111.4 1.42l-4 3.99a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.41L11 12.58V4a1 1 0 011-1zm-7 14a1 1 0 011 1v1h12v-1a1 1 0 112 0v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 011-1z" />
              </svg>
            </button>

            <AnimatePresence>
              {showResumeConfirm && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-0 top-full mt-2 border-2 border-retro-green bg-black p-3 w-64 z-[52]"
                  style={{ minWidth: 'max-content' }}
                >
                  <p className="text-retro-green text-sm mb-3">Download attached resume?</p>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadResume}
                      onMouseEnter={playHoverSfx}
                      className="border border-retro-green text-retro-green px-3 py-1 text-sm hover:bg-retro-green hover:text-black transition-colors duration-200"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowResumeConfirm(false)}
                      onMouseEnter={playHoverSfx}
                      className="border border-retro-green/60 text-retro-green/80 px-3 py-1 text-sm hover:border-retro-green hover:text-retro-green transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden mt-4 border-2 border-retro-green bg-black p-4"
            >
              <ul className="flex flex-col gap-3 list-none m-0 p-0">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onMouseEnter={playHoverSfx}
                      onClick={handleNavClick}
                      className="group flex items-center text-retro-green text-lg no-underline hover:text-white transition-colors duration-200"
                    >
                      <span className="inline-block w-0 overflow-hidden group-hover:w-5 transition-all duration-200 text-sm leading-none">
                        ▶
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 border-t border-retro-green/40">
                <button
                  type="button"
                  onClick={handleResumeClick}
                  onMouseEnter={playHoverSfx}
                  className="group flex items-center text-retro-green text-lg hover:text-white transition-colors duration-200"
                >
                  <span className="inline-block w-0 overflow-hidden group-hover:w-5 transition-all duration-200 text-sm leading-none">
                    ▶
                  </span>
                  <span>RESUME</span>
                </button>

                <AnimatePresence>
                  {showResumeConfirm && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="mt-3 border border-retro-green/60 p-3"
                    >
                      <p className="text-retro-green text-sm mb-3">Download attached resume?</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleDownloadResume}
                          className="border border-retro-green text-retro-green px-3 py-1 text-sm hover:bg-retro-green hover:text-black transition-colors duration-200"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowResumeConfirm(false)}
                          className="border border-retro-green/60 text-retro-green/80 px-3 py-1 text-sm hover:border-retro-green hover:text-retro-green transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}