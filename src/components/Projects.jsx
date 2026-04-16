import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
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

const cardsContainerVariants = {
  hidden: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const projects = [
  {
    title: "Malagos Garden Website",
    status: "Deployed",
    image: "/projects/malagos-garden.png",
    repositoryUrl: "https://github.com/BVADBuenviaje/MalagosGardenProject",
    liveUrl: "https://malagos-garden-project.vercel.app/",
    technologies: ["HTML", "CSS", "JavaScript"],
    description:
      "A frontend reimagination of the official Malagos Garden Resort website in Davao City. Built from the ground up using HTML, CSS, and vanilla JavaScript to deliver a modern, fully responsive, and feature-rich user experience tailored for all devices.",
  },
  {
    title: "Jebran Miki Website",
    status: "Undeployed",
    image: "/projects/jebran-miki.png",
    repositoryUrl: "https://github.com/BVADBuenviaje/Jebran-Website-Final",
    technologies: ["ReactJS", "Django", "TailwindCSS"],
    description:
      "A comprehensive full-stack e-commerce platform featuring dual user experiences. Customers can securely log in, place orders, and track them in real time, while a dedicated admin dashboard provides powerful tools for inventory management, order processing, and site administration.",
  },
  {
    title: "Placeholder Project 1",
    status: "Undeployed",
    image: undefined,
    repositoryUrl: undefined,
    technologies: ["ReactJS"],
    description: "This is a placeholder project card. Replace with your own project details.",
  },
  {
    title: "Placeholder Project 2",
    status: "Undeployed",
    image: undefined,
    repositoryUrl: undefined,
    technologies: ["HTML", "CSS"],
    description: "This is a placeholder project card. Replace with your own project details.",
  },
  {
    title: "Placeholder Project 3",
    status: "Undeployed",
    image: undefined,
    repositoryUrl: undefined,
    technologies: ["JavaScript"],
    description: "This is a placeholder project card. Replace with your own project details.",
  },
];

const LOOP_SEGMENTS = 5;

export default function Projects() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const isRecenteringRef = useRef(false);
  const wasInViewRef = useRef(false);
  const [showLoader, setShowLoader] = useState(false);
  const isSectionInView = useInView(sectionRef, { amount: 0.35, once: false });
  const playHoverSfx = useHoverSfx();

  const scrollCards = (direction) => {
    if (!carouselRef.current) return;
    const cardStep = 360;
    carouselRef.current.scrollBy({
      left: direction * cardStep,
      behavior: "smooth",
    });
  };

  const handleCarouselWheel = (event) => {
    const scroller = carouselRef.current;
    if (!scroller) return;

    const delta = event.deltaY !== 0 ? event.deltaY : event.deltaX;
    if (delta === 0) return;

    event.preventDefault();
    event.stopPropagation();
    scroller.scrollBy({
      left: delta,
      behavior: "auto",
    });
  };

  useEffect(() => {
    const scroller = carouselRef.current;
    if (!scroller) return;

    const recenterToMiddle = () => {
      const segmentWidth = scroller.scrollWidth / LOOP_SEGMENTS;
      if (!segmentWidth) return;
      scroller.scrollLeft = segmentWidth * Math.floor(LOOP_SEGMENTS / 2);
    };

    recenterToMiddle();

    const handleScroll = () => {
      if (isRecenteringRef.current) return;

      const segmentWidth = scroller.scrollWidth / LOOP_SEGMENTS;
      if (!segmentWidth) return;

      const minBoundary = segmentWidth * 0.75;
      const maxBoundary = segmentWidth * (LOOP_SEGMENTS - 1.75);
      const recenterJump = segmentWidth * Math.floor(LOOP_SEGMENTS / 2);

      if (scroller.scrollLeft < minBoundary || scroller.scrollLeft > maxBoundary) {
        isRecenteringRef.current = true;
        if (scroller.scrollLeft < minBoundary) {
          scroller.scrollLeft += recenterJump;
        } else {
          scroller.scrollLeft -= recenterJump;
        }
        requestAnimationFrame(() => {
          isRecenteringRef.current = false;
        });
      }
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", recenterToMiddle);
    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", recenterToMiddle);
    };
  }, []);

  useEffect(() => {
    const enteredSection = isSectionInView && !wasInViewRef.current;
    wasInViewRef.current = isSectionInView;
    if (!enteredSection) return;

    setShowLoader(true);
    const minLoaderMs = 1100;
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, minLoaderMs);
    return () => clearTimeout(timer);
  }, [isSectionInView]);

  const loopedProjects = Array.from({ length: LOOP_SEGMENTS }, () => projects).flat();

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 relative z-10 py-24"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        className="max-w-6xl w-full"
      >
        {/* Anchor for navbar/hero scroll */}
        <span id="projects-header" className="block -mt-12 md:-mt-20 pt-12 md:pt-20" />
        <motion.p variants={itemVariants} className="text-retro-green text-xl mb-2">
          {"// PROJECTS"}
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-white text-5xl md:text-6xl mb-12">
          WHAT I&apos;VE <span className="text-retro-green">BUILT</span>
        </motion.h2>

        <motion.div variants={itemVariants} className="flex justify-end gap-3 mb-5">
          <button
            type="button"
            onClick={() => scrollCards(-1)}
            onMouseEnter={playHoverSfx}
            className="border-2 border-retro-green text-retro-green w-10 h-10 text-lg hover:bg-retro-green hover:text-black transition-colors duration-200"
            aria-label="Scroll projects left"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={() => scrollCards(1)}
            onMouseEnter={playHoverSfx}
            className="border-2 border-retro-green text-retro-green w-10 h-10 text-lg hover:bg-retro-green hover:text-black transition-colors duration-200"
            aria-label="Scroll projects right"
          >
            ▶
          </button>
        </motion.div>

        <div className="relative">
          <motion.div
            ref={carouselRef}
            onWheelCapture={handleCarouselWheel}
            variants={cardsContainerVariants}
            className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-visible overscroll-contain snap-x snap-mandatory pt-4 pb-6 px-1 md:pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&>*]:min-w-[84vw] sm:[&>*]:min-w-[280px] md:[&>*]:min-w-[330px] [&>*]:max-w-[360px] [&>*]:shrink-0 [&>*]:snap-start"
          >
            {loopedProjects.map((project, idx) => (
              <ProjectCard
                key={`${project.title}-${idx}`}
                title={project.title}
                status={project.status}
                repositoryUrl={project.repositoryUrl}
                technologies={project.technologies}
                description={project.description}
                image={project.image}
                liveUrl={project.liveUrl}
              />
            ))}
          </motion.div>

          {showLoader && (
            <div
              className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center gap-4 text-retro-green"
              role="status"
              aria-live="polite"
            >
              <span className="w-7 h-7 border-2 border-retro-green border-t-transparent rounded-full animate-spin" />
              <span className="text-lg md:text-xl">Loading projects...</span>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
