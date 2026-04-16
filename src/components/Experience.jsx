import { useRef } from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const experiences = [
  {
    role: "CCNA: Introduction to Networks",
    companyPeriod: "Cisco Networking Academy | December 2025 - April 2026",
    description:
      "Completed the CCNA: Introduction to Networks course under Cisco Networking Academy, offered through Ateneo de Davao University. Gained foundational knowledge in computer networking, including network architecture, IP addressing, device communication, basic configuration, and core connectivity concepts used in modern network environments.",
    image: "/experiences/CCNA.jpg",
  },
  {
    role: "HydraMed | Technical Intern",
    companyPeriod: "HydraMed | February 2026 - May 2026",
    description:
      "Completed on-the-job training at HydraMed as a Technical Intern contributing to the development of APEX, an integrated telehealth enterprise resource platform. Supported the architecture and implementation of core system modules across healthcare, operations, and business functions, including EHR, CRM, financial systems, hiring, and marketing tools. This experience reflects hands-on involvement in multi-functional software development within a real-world healthcare technology environment.",
    image: "/experiences/HydraMed-Certificate.jfif",
  },
  {
    role: "WebDiner LLC | Website Design Intern",
    companyPeriod: "WebDiner | November 2025 - January 2026",
    description:
      "Completed the Professional Web Development Training Program at WebDiner LLC as a Website Design Intern. Contributed to the end-to-end development of custom web solutions by building responsive interfaces, translating client requirements into functional website features, optimizing site performance and SEO structure, and helping deliver production-ready websites for live deployment.",
    image: "/experiences/WebDiner-Certificate.jpg",
  },
];

export default function Experience() {
  const cardsContainerRef = useRef(null);



  return (
    <section
      id="experience"
      className="min-h-screen flex items-start justify-center px-6 relative z-10 pt-32 pb-24"
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        className="max-w-6xl w-full"
      >
        <motion.p variants={itemVariants} className="text-retro-green text-xl mb-2">
          {"// EXPERIENCE"}
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-white text-5xl md:text-6xl mb-10">
          WHAT I&apos;VE <span className="text-retro-green">EXPERIENCED</span>
        </motion.h2>

        <div ref={cardsContainerRef} className="space-y-6">
          {experiences.map((experience, index) => {
            const isOddInstance = index % 2 === 0;

            return (
              <motion.div
                key={`${experience.role}-${index}`}
                variants={itemVariants}
                className="rounded-[2px]"
              >
                <ExperienceCard
                  role={experience.role}
                  companyPeriod={experience.companyPeriod}
                  description={experience.description}
                  imageLeft={isOddInstance}
                  image={experience.image}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
