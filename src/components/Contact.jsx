import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useCharacter } from "../context/CharacterContext";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaUniversity } from "react-icons/fa";
import useHoverSfx from "../hooks/useHoverSfx";

export default function Contact() {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // --- 1. State & Context ---
  const { setHoveredElement } = useCharacter();
  const playHoverSfx = useHoverSfx();
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  // --- 2. Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // --- 3. Socials Data ---
  const socials = [
    {
      label: "Email",
      href: "mailto:brianvincentalfredbuenviaje@gmail.com",
      value: "brianvincentalfredbuenviaje@gmail.com",
      icon: <FaEnvelope />,
    },
    {
      label: "School",
      href: "mailto:bvadbuenviaje@addu.edu.ph",
      value: "bvadbuenviaje@addu.edu.ph",
      icon: <FaUniversity />,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/14YQTLADq47/",
      value: "facebook.com/share/14YQTLADq47/",
      icon: <FaFacebook />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/brian-vincent-alfred-r-buenviaje-690778350/",
      value: "linkedin.com/in/brian-vincent-alfred-r-buenviaje-690778350/",
      icon: <FaLinkedin />,
    },
    {
      label: "GitHub",
      href: "https://github.com/BVADBuenviaje",
      value: "github.com/BVADBuenviaje",
      icon: <FaGithub />,
    },
    {
      label: "X",
      href: "#",
      value: "X (formerly Twitter)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-6.77 7.74L23 22h-6.1l-4.77-6.23L6.7 22H3.6l7.24-8.27L1 2h6.24l4.3 5.68L18.9 2zm-1.07 18h1.69L6.3 3.9H4.47L17.83 20z" />
        </svg>
      ),
    },
    {
      label: "Discord",
      href: "https://discord.com/users/757132276915241034",
      value: "discord.com/users/757132276915241034",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.3 4.37A19.8 19.8 0 0015.4 3l-.23.46a18.3 18.3 0 00-6.34 0L8.6 3a19.72 19.72 0 00-4.9 1.37C.62 9.03-.18 13.55.22 18.01a19.92 19.92 0 006.03 3.04l1.29-1.77a12.95 12.95 0 01-2.03-.98l.49-.37c3.91 1.84 8.16 1.84 12.03 0l.49.37c-.64.38-1.32.71-2.03.98l1.29 1.77a19.9 19.9 0 006.02-3.04c.48-5.18-.82-9.67-3.5-13.64zM8.68 15.27c-1.17 0-2.12-1.08-2.12-2.41s.94-2.41 2.12-2.41 2.13 1.08 2.12 2.41c0 1.33-.95 2.41-2.12 2.41zm6.64 0c-1.17 0-2.12-1.08-2.12-2.41s.94-2.41 2.12-2.41 2.13 1.08 2.12 2.41c0 1.33-.94 2.41-2.12 2.41z" />
        </svg>
      ),
    },
  ];

  // --- 4. Handlers ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSending(true);

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error("Missing EmailJS environment variables.");
      }

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      e.target.reset();
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 pt-28 pb-32"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        className="max-w-6xl w-full"
      >
        <span id="contact-header" className="block -mt-20" />
        <motion.p variants={itemVariants} className="text-retro-green text-xl mb-2">
          {"// CONTACT"}
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-white text-5xl md:text-6xl mb-12">
          GET IN <span className="text-retro-green">TOUCH</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left — Contact Form */}
          <motion.div
            variants={itemVariants}
            className="border-4 border-retro-green bg-black p-2"
          >
            {/* Window Title Bar */}
            <div className="border-b-2 border-retro-green px-3 py-1 text-retro-green text-sm flex items-center justify-between mb-4">
              <span>message.exe</span>
              <span>[ _ □ X ]</span>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 px-4 pb-4"
            >
              <div>
                <label className="text-retro-green text-sm mb-1 block">{">"} NAME</label>
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="Your full name"
                  className="w-full bg-black border-2 border-retro-green text-retro-green px-3 py-2 text-sm focus:outline-none focus:border-white transition-colors duration-200 placeholder:text-retro-green/30"
                />
              </div>

              <div>
                <label className="text-retro-green text-sm mb-1 block">{">"} EMAIL</label>
                <input
                  type="email"
                  name="from_email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-black border-2 border-retro-green text-retro-green px-3 py-2 text-sm focus:outline-none focus:border-white transition-colors duration-200 placeholder:text-retro-green/30"
                />
              </div>

              <div>
                <label className="text-retro-green text-sm mb-1 block">{">"} SUBJECT</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="What's this about?"
                  className="w-full bg-black border-2 border-retro-green text-retro-green px-3 py-2 text-sm focus:outline-none focus:border-white transition-colors duration-200 placeholder:text-retro-green/30"
                />
              </div>

              <div>
                <label className="text-retro-green text-sm mb-1 block">{">"} MESSAGE</label>
                <textarea
                  rows={7}
                  name="message"
                  required
                  placeholder="Type your message here..."
                  className="w-full bg-black border-2 border-retro-green text-retro-green px-3 py-2 text-sm focus:outline-none focus:border-white transition-colors duration-200 resize-none placeholder:text-retro-green/30"
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={sending}
                  onMouseEnter={playHoverSfx}
                  className="border-2 border-retro-green text-retro-green px-8 py-3 text-xl hover:bg-retro-green hover:text-black transition-colors duration-200 disabled:opacity-50"
                >
                  {sending ? "SENDING..." : "▶ SEND MESSAGE"}
                </button>

                {status === "success" && (
                  <p className="text-retro-green text-sm">{">> MESSAGE SENT SUCCESSFULLY!"}</p>
                )}
                {status === "error" && (
                  <p className="text-red-500 text-sm">{">> ERROR: FAILED TO SEND. TRY AGAIN."}</p>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right — Info + Socials */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            {/* Message */}
            <div className="border-4 border-retro-green bg-black p-2">
              <div className="border-b-2 border-retro-green px-3 py-1 text-retro-green text-sm flex items-center justify-between mb-2">
                <span>note.txt</span>
                <span>[ _ □ X ]</span>
              </div>
              <div className="px-4 py-3">
                <p className="text-retro-green text-base leading-relaxed">
                  {">"} Feel free to reach out for collaborations, project ideas, or just to say hello.
                  I&apos;m always open to connecting with fellow developers and creators.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="border-4 border-retro-green bg-black p-2">
              <div className="border-b-2 border-retro-green px-3 py-1 text-retro-green text-sm flex items-center justify-between mb-2">
                <span>links.exe</span>
                <span>[ _ □ X ]</span>
              </div>
              <div className="flex flex-col gap-2 px-4 py-3">
                {socials.map(({ label, href, value, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => {
                      setHoveredElement(`social-${label.toLowerCase().replace(/\s+/g, "-")}`);
                    }}
                    onMouseLeave={() => setHoveredElement(null)}
                    className="flex items-center gap-3 text-retro-green hover:text-white transition-colors duration-200 py-1"
                  >
                    <span className="border-2 border-retro-green p-2 w-10 h-10 flex items-center justify-center hover:border-white transition-colors duration-200">
                      {icon}
                    </span>
                    <span className="text-sm">{value}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}