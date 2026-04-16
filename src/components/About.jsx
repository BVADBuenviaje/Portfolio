import { motion } from "framer-motion";

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

const rightPanelVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const rightItemVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const specializationBobSpring = { type: "spring", stiffness: 230, damping: 16 };

function specializationItemVariants(index) {
  return {
    hidden: {
      opacity: 0,
      y: 28,
      scale: 0.94,
      transition: { 
        ...specializationBobSpring,
        delay: index * 0.05,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...specializationBobSpring,
        delay: index * 0.09,
      },
    },
  };
}

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative z-10"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-36 items-center"
      >
        {/* Left — Photo Window */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-[450px]"
          >
          <div className="border-4 border-retro-green bg-black p-2 w-full">
            {/* Window Title Bar */}
            <div className="border-b-2 border-retro-green px-3 py-1 text-retro-green text-sm flex items-center justify-between mb-2">
              <span>me.exe</span>
              <span>[ _ □ X ]</span>
            </div>

            {/* Photo with Mask Reveal Effect */}
            <div
              className="w-full h-96 bg-retro-green/5 border-2 border-retro-green/30 flex items-center justify-center overflow-hidden relative group"
              style={{ maxHeight: '22rem' }}
            >
              {/* Profile Image */}
              <img
                src="/me.png"
                alt="Profile"
                className="object-cover w-full h-full rounded-md shadow-lg absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-100 opacity-0"
                style={{ maxHeight: '22rem' }}
              />
              {/* Mask Image */}
              <img
                src="/mask.jfif"
                alt="Mask"
                className="object-cover w-full h-full rounded-md shadow-lg absolute inset-0 z-20 transition-opacity duration-500 group-hover:opacity-0 opacity-100 cursor-pointer"
                style={{ maxHeight: '22rem' }}
              />
            </div>

            {/* Status Bar */}
            <div className="border-t-2 border-retro-green mt-2 pt-1 text-retro-green/50 text-xs text-center">
              STATUS: ONLINE
            </div>
          </div>
          </motion.div>
        </motion.div>

        {/* Right — Info */}
        <motion.div variants={rightPanelVariants} className="text-left">
          <motion.p
            variants={rightItemVariants}
            className="text-retro-green text-xl mb-2"
          >
            {"// ABOUT ME"}
          </motion.p>

          <motion.h2
            variants={rightItemVariants}
            className="text-white text-5xl md:text-6xl leading-none mb-6"
          >
            WHO AM I<span className="text-retro-green">?</span>
          </motion.h2>

          <motion.div variants={rightItemVariants} className="space-y-4 text-retro-green/70 text-lg leading-relaxed max-w-md">
            <p>
              <span className="text-retro-green">{">"}</span> A 3rd-year college student-developer at Ateneo de Davao University.
            </p>
            <p>
              <span className="text-retro-green">{">"}</span> Specializing in high-performance web development, 
              while exploring game and app creation.
            </p>
          </motion.div>

          {/* Skill Bars */}
          <motion.div
            variants={rightItemVariants}
            className="mt-8 space-y-4 max-w-md"
          >
            {[
              { label: "WEB DEVELOPMENT", value: 60 },
              { label: "GAME DEVELOPMENT", value: 30 },
              { label: "APP DEVELOPMENT", value: 10 },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-retro-green">{label}</span>
                  <span className="text-white">{value}%</span>
                </div>
                <div className="w-full h-4 border-2 border-retro-green bg-black">
                  <motion.div
                    className="h-full bg-retro-green"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: "easeOut", delay: 1.05 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Specializations */}
      <div className="max-w-6xl w-full mt-20">
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35, margin: "0px 0px -48px 0px" }}
          className="text-retro-green text-xl mb-6 text-center"
        >
          {"// SPECIALIZATIONS"}
        </motion.p>

        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              name: "HTML",
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.07-.999.206-2.283H6.693l.592 6.747h7.956l-.366 3.523-2.91.804-2.956-.81-.188-2.11H6.89l.39 4.46 4.732 1.315 4.635-1.288.588-7.644H8.531z" />
                </svg>
              ),
            },
            {
              name: "CSS",
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.002l5.355-1.12.564-7.468H8.689L8.53 8.009h8.386l.174-3.596z" />
                </svg>
              ),
            },
            {
              name: "JavaScript",
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                </svg>
              ),
            },
            {
              name: "React",
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.852.2-1.56.793-1.554 4.204.22 8.348C3.28 11.35 1.5 13.084 1.5 14.582c0 1.498 1.78 3.232 4.973 4.682-1.774 4.144-1.78 7.555-.22 8.35.26.13.54.197.85.197 1.346 0 3.108-.96 4.888-2.623 1.78 1.654 3.542 2.603 4.887 2.603.31 0 .592-.068.852-.2 1.56-.794 1.554-4.205-.22-8.349C20.72 17.218 22.5 15.484 22.5 13.986c0-1.498-1.78-3.232-4.973-4.682 1.774-4.144 1.78-7.555.22-8.35a1.724 1.724 0 00-.87-.22zM12 16.878c-2.69 0-4.878-2.189-4.878-4.878S9.31 7.122 12 7.122s4.878 2.189 4.878 4.878-2.189 4.878-4.878 4.878z" />
                </svg>
              ),
            },
            {
              name: "Python",
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.68H3.23l-.21-.03-.28-.07-.34-.12-.37-.17-.36-.21-.33-.25-.29-.27-.24-.28-.18-.27-.13-.24-.09-.19-.06-.12-.03-.05L.1 17.22l.05-.25.1-.26.14-.27.19-.28.24-.29.3-.3.36-.3.43-.3.5-.28.58-.26.66-.22.73-.17.81-.1.87-.04 5.88-.02h.05l.04-.06.03-.11.02-.17-.01-.21-.04-.25-.08-.28-.11-.29-.15-.28-.18-.26-.21-.22-.24-.17-.26-.11-.27-.05h-3.86l-.22-.02-.2-.05-.17-.08-.14-.1-.12-.12-.09-.13-.07-.13-.05-.12-.03-.11L5.8 8.2l.01-.1.03-.13.05-.16.08-.19.11-.22.15-.25.19-.27.24-.28.3-.28.36-.27.42-.24.49-.2.56-.15.63-.09.7-.02L12 4.22h2.25zM11.78 6.22a1.375 1.375 0 100 2.75 1.375 1.375 0 000-2.75z" />
                  <path d="M21.84 11.02l.21.03.28.07.34.12.37.17.36.21.33.25.29.27.24.28.18.27.13.24.09.19.06.12.03.05.18.45-.05.25-.1.26-.14.27-.19.28-.24.29-.3.3-.36.3-.43.3-.5.28-.58.26-.66.22-.73.17-.81.1-.87.04-5.88.02h-.05l-.04.06-.03.11-.02.17.01.21.04.25.08.28.11.29.15.28.18.26.21.22.24.17.26.11.27.05h3.86l.22.02.2.05.17.08.14.1.12.12.09.13.07.13.05.12.03.11.02.09-.01.1-.03.13-.05.16-.08.19-.11.22-.15.25-.19.27-.24.28-.3.28-.36.27-.42.24-.49.2-.56.15-.63.09-.7.02L12 19.78H9.75l-.9-.2-.73-.26-.59-.3-.45-.32-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2.01-.13V15.5l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02h5.47l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21v-3.68h1.54zM12.22 17.78a1.375 1.375 0 100-2.75 1.375 1.375 0 000 2.75z" />
                </svg>
              ),
            },
            {
              name: "Django",
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-3.995 2.688-6.579 6.858-6.579.649 0 1.143.063 1.602.178V0zm0 8.77a3.868 3.868 0 00-1.208-.178c-2.016 0-3.174 1.236-3.174 3.407 0 2.1 1.1 3.263 3.131 3.263.391 0 .707-.025 1.251-.1V8.77zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.63 1.246-1.462 2.029-3.174 2.905L13.47 22.09c1.712-.838 2.544-1.57 3.11-2.712.588-1.17.792-2.52.792-5.907V6.06h3.942zM17.39.021h3.924v4.026H17.39V.021z" />
                </svg>
              ),
            },
            {
              name: "C#",
              icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm-.036 4.286a7.75 7.75 0 01.678.028 7.714 7.714 0 016.644 5.429h-3.107a4.285 4.285 0 00-3.643-2.571 4.286 4.286 0 00-4.286 4.285v1.086A4.286 4.286 0 0012.536 16.83a4.285 4.285 0 003.643-2.573h3.107A7.714 7.714 0 0112 18.857a7.714 7.714 0 01-7.714-7.714v-1.086A7.714 7.714 0 0111.964 4.286zm5.893 6.143h.857v.857h.857v-.857h.858v-.858h-.858v-.857h-.857v.857h-.857zm2.786 0h.857v.857h.857v-.857H24v-.858h-.857v-.857h-.857v.857h-.857z" />
                </svg>
              ),
            },
          ].map(({ name, icon }, index) => (
            <motion.div
              key={name}
              variants={specializationItemVariants(index)}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.5,
                margin: "0px 0px -100px 0px",
              }}
              className="border-2 border-retro-green p-4 w-28 flex flex-col items-center gap-2"
            >
              <span className="text-retro-green">
                {icon}
              </span>
              <span className="text-retro-green/70 text-sm">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
