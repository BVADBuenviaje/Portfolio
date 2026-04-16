import { useState } from "react";
import Rain from "./components/Rain";
import AmbientParticles from "./components/AmbientParticles";
import Noise from "./components/Noise";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import SpriteCompanion from "./components/SpriteCompanion";
import Contact from "./components/Contact";
import { CharacterProvider } from "./context/CharacterContext";
import useSectionObserver from "./hooks/useSectionObserver";

function AppContent() {
  useSectionObserver();
  const [rainEnabled, setRainEnabled] = useState(true);

  return (
    <>
      {/* Background Layer — z-0 */}
      <Rain enabled={rainEnabled} />
      <AmbientParticles active={!rainEnabled} />
      <Noise />

      {/* Overlay Layer — z-50 */}
      <Navbar rainEnabled={rainEnabled} onRainToggle={() => setRainEnabled((v) => !v)} />
      <SpriteCompanion />

      {/* Content Layer — z-10 */}
      <main className="relative z-10">
        <Hero />

        {/* About */}
        <About />

        {/* Experience */}
        <Experience />

        {/* Projects */}
        <Projects />

        {/* Contact */}
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
    <CharacterProvider>
      <AppContent />
    </CharacterProvider>
  );
}

export default App;
