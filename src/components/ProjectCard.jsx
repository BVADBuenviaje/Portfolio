
import { motion } from "framer-motion";
import { useCharacter } from "../context/CharacterContext";
import useHoverSfx from "../hooks/useHoverSfx";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const techIcons = {
  "ReactJS": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.852.2-1.56.793-1.554 4.204.22 8.348C3.28 11.35 1.5 13.084 1.5 14.582c0 1.498 1.78 3.232 4.973 4.682-1.774 4.144-1.78 7.555-.22 8.35.26.13.54.197.85.197 1.346 0 3.108-.96 4.888-2.623 1.78 1.654 3.542 2.603 4.887 2.603.31 0 .592-.068.852-.2 1.56-.794 1.554-4.205-.22-8.349C20.72 17.218 22.5 15.484 22.5 13.986c0-1.498-1.78-3.232-4.973-4.682 1.774-4.144 1.78-7.555.22-8.35a1.724 1.724 0 00-.87-.22zM12 16.878c-2.69 0-4.878-2.189-4.878-4.878S9.31 7.122 12 7.122s4.878 2.189 4.878 4.878-2.189 4.878-4.878 4.878z" />
    </svg>
  ),
  Python: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.68H3.23l-.21-.03-.28-.07-.34-.12-.37-.17-.36-.21-.33-.25-.29-.27-.24-.28-.18-.27-.13-.24-.09-.19-.06-.12-.03-.05L.1 17.22l.05-.25.1-.26.14-.27.19-.28.24-.29.3-.3.36-.3.43-.3.5-.28.58-.26.66-.22.73-.17.81-.1.87-.04 5.88-.02h.05l.04-.06.03-.11.02-.17-.01-.21-.04-.25-.08-.28-.11-.29-.15-.28-.18-.26-.21-.22-.24-.17-.26-.11-.27-.05h-3.86l-.22-.02-.2-.05-.17-.08-.14-.1-.12-.12-.09-.13-.07-.13-.05-.12-.03-.11L5.8 8.2l.01-.1.03-.13.05-.16.08-.19.11-.22.15-.25.19-.27.24-.28.3-.28.36-.27.42-.24.49-.2.56-.15.63-.09.7-.02L12 4.22h2.25zM11.78 6.22a1.375 1.375 0 100 2.75 1.375 1.375 0 000-2.75z" />
    </svg>
  ),
  JavaScript: <span className="text-[10px] font-bold leading-none">JS</span>,
  HTML: <span className="text-[10px] font-bold leading-none">HTML</span>,
  CSS: <span className="text-[10px] font-bold leading-none">CSS</span>,
  Django: <span className="text-[10px] font-bold leading-none">DJ</span>,
};

const discordIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.32 4.37a19.79 19.79 0 00-4.9-1.52.07.07 0 00-.07.03c-.21.37-.44.85-.6 1.23a18.27 18.27 0 00-5.49 0c-.16-.39-.4-.86-.61-1.23a.08.08 0 00-.07-.03 19.74 19.74 0 00-4.9 1.52.07.07 0 00-.03.03C.53 9.03-.32 13.53.1 17.97a.08.08 0 00.03.05 19.9 19.9 0 005.99 3.03.07.07 0 00.08-.03c.46-.64.88-1.32 1.24-2.04a.07.07 0 00-.04-.1 13.07 13.07 0 01-1.9-.9.08.08 0 01-.01-.13c.13-.1.26-.2.38-.3a.07.07 0 01.08-.01c4 1.82 8.33 1.82 12.28 0a.07.07 0 01.08.01c.12.1.25.2.38.3a.08.08 0 01-.01.13 12.54 12.54 0 01-1.9.9.08.08 0 00-.04.1c.37.72.79 1.4 1.25 2.03a.07.07 0 00.08.03 19.83 19.83 0 005.99-3.03.08.08 0 00.03-.05c.5-5.13-.84-9.6-3.45-13.57a.06.06 0 00-.03-.03zM8.02 15.25c-1.2 0-2.18-1.1-2.18-2.45 0-1.35.96-2.45 2.18-2.45s2.2 1.1 2.18 2.45c0 1.35-.96 2.45-2.18 2.45zm7.96 0c-1.2 0-2.18-1.1-2.18-2.45 0-1.35.96-2.45 2.18-2.45s2.2 1.1 2.18 2.45c0 1.35-.96 2.45-2.18 2.45z" />
  </svg>
);

export default function ProjectCard({
  title,
  description,
  image,
  status = "Undeployed",
  technologies = [],
  repositoryUrl,
}) {
  const { setHoveredElement } = useCharacter();
  const playHoverSfx = useHoverSfx();

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -12, transition: { type: "tween", duration: 0.1, ease: "linear" } }}
      transition={{ type: "tween", duration: 0.05, ease: "linear" }}
      onMouseEnter={() => {
        playHoverSfx();
        setHoveredElement("project-card");
      }}
      onMouseLeave={() => setHoveredElement(null)}
      className="group relative border-4 border-retro-green hover:border-white bg-black p-2 transition-colors duration-200 cursor-pointer"
    >
      {/* Window Title Bar */}
      <div className="border-b-2 border-retro-green group-hover:border-white px-3 py-1 text-retro-green group-hover:text-white text-sm flex items-center justify-between mb-2 transition-colors duration-200">
        <span>project.exe</span>
        <span>[ _ □ X ]</span>
      </div>
      <div className="px-3 pb-2">
        <span className="text-retro-green/70 group-hover:text-white/70 text-xs transition-colors duration-200">
          STATUS: {status.toUpperCase()}
        </span>
      </div>

      {/* Image */}
      <div className="relative w-full h-48 border-2 border-retro-green group-hover:border-white overflow-hidden transition-colors duration-200">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-retro-green/30 text-lg">
            {"[ NO SIGNAL ]"}
          </div>
        )}
        {repositoryUrl && (
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${title} repository`}
            onClick={(event) => event.stopPropagation()}
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full border border-retro-green/80 bg-black/90 text-retro-green group-hover:text-white hover:bg-white hover:text-black hover:border-white group-hover:border-white/80 transition-colors duration-200 flex items-center justify-center"
          >
            {discordIcon}
          </a>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-retro-green group-hover:text-white text-2xl mb-2 transition-colors duration-200">{title}</h3>
        <p className="text-retro-green/70 group-hover:text-white/70 text-base leading-relaxed transition-colors duration-200">
          {description}
        </p>
        {technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                title={tech}
                className="w-7 h-7 border border-retro-green/70 text-retro-green/90 group-hover:border-white/70 group-hover:text-white/90 transition-colors duration-200 flex items-center justify-center"
              >
                {techIcons[tech] || <span className="text-[10px] font-bold leading-none">{tech.slice(0, 2).toUpperCase()}</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover arrow */}
      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 leading-none">
        ▲
      </span>
    </motion.div>
  );
}
