import { createContext, useContext, useState } from "react";

const CharacterContext = createContext();

const CHARACTERS = [
  {
    name: "WIZARD",
    idle: { src: "/sprite.png", frames: 6 },
    run: { src: "/wizard-run.png", frames: 8 },
    w: 64,
    h: 64,
  },
  {
    name: "KNIGHT",
    idle: { src: "/knight-idle.png", frames: 6 },
    run: { src: "/knight-run.png", frames: 8 },
    w: 64,
    h: 64,
  },
  {
    name: "SKELETON",
    idle: { src: "/skeleton-idle.png", frames: 10 },
    run: { src: "/skeleton-walk.png", frames: 10 },
    w: 64,
    h: 64,
  },
  {
    name: "BOSS",
    idle: { src: "/boss-idle.png", frames: 7 },
    run: { src: "/boss-fly.png", frames: 6 },
    w: 64,
    h: 64,
  },
  {
    name: "SLIME",
    idle: { src: "/slime-idle.png", frames: 4 },
    run: { src: "/slime-walk.png", frames: 4 },
    w: 64,
    h: 64,
  },
];

const SECTION_DIALOGUE = {
  home: {
    WIZARD: "Welcome, traveler! This is Brian's domain. Look around!",
    KNIGHT: "You stand at the gates of Brian's portfolio. Enter with honor!",
    SKELETON: "Oh, a visitor! I've been rattling around here for ages.",
    BOSS: "So you dare approach Brian's lair? Interesting...",
    SLIME: "Boing! Hi there! Brian makes cool stuff here!",
  },
  about: {
    WIZARD: "Ah, the ancient scrolls of Brian's backstory. Read carefully!",
    KNIGHT: "Here lies the tale of Brian — a warrior of code.",
    SKELETON: "Brian's origin story? I was there... well, in spirit.",
    BOSS: "Even I must respect Brian's skill tree. Impressive stats.",
    SLIME: "Ooh! This is where you learn all about Brian! He's great!",
  },
  projects: {
    WIZARD: "Behold! The artifacts Brian has conjured into existence!",
    KNIGHT: "These are the battles Brian has won. Each project, a victory.",
    SKELETON: "Some of these projects kept Brian up so late, he looked like me.",
    BOSS: "Hmph. These projects are almost as powerful as me. Almost.",
    SLIME: "Look at all the shiny things Brian built! So cool!",
  },
  experience: {
    WIZARD: "These chapters hold the trials that forged Brian's craft.",
    KNIGHT: "A warrior's service record. Every role earned through discipline.",
    SKELETON: "Ah yes, the timeline of coffee, bugs, and late-night commits.",
    BOSS: "Impressive. Brian's path shows real growth, not empty titles.",
    SLIME: "Ooh! This is Brian's adventure log! So many cool milestones!",
  },
  contact: {
    WIZARD: "Send a raven! Or... an email. That works too.",
    KNIGHT: "If you wish to summon Brian, this is the place.",
    SKELETON: "Don't be shy! Brian doesn't bite. I might, though.",
    BOSS: "You want to contact Brian? He's braver than most who face me.",
    SLIME: "Message Brian! He's really friendly, I promise!",
  },
};

const HOVER_DIALOGUE = {
  "view-projects": {
    WIZARD: "Click to see the spells Brian has cast!",
    KNIGHT: "This leads to the armory of projects!",
    SKELETON: "Go on, click it! I dare you.",
    BOSS: "Hmm, curious about Brian's power? Smart.",
    SLIME: "Ooh ooh! Click it! The projects are fun!",
  },
  "get-in-touch": {
    WIZARD: "A portal to reach Brian directly!",
    KNIGHT: "Send word to Brian through this channel!",
    SKELETON: "Go ahead, say hello. He won't ghost you... unlike me.",
    BOSS: "Brave enough to contact Brian? Respect.",
    SLIME: "Brian loves hearing from people! Do it!",
  },
  "project-card": {
    WIZARD: "A fine creation! Examine it closely.",
    KNIGHT: "One of Brian's proud conquests!",
    SKELETON: "This one kept Brian up past midnight...",
    BOSS: "Not bad for a mere mortal's work.",
    SLIME: "Ooh, shiny project! Look look!",
  },
  "social-facebook": {
    WIZARD: "Brian's Facebook portal! Follow the signal!",
    KNIGHT: "Connect with Brian on the social battlefield!",
    SKELETON: "Facebook? Even I have an account. I never post though.",
    BOSS: "Social media? I prefer intimidation, but sure.",
    SLIME: "Brian posts stuff there! Check it out!",
  },
  "social-linkedin": {
    WIZARD: "The professional realm! Brian's LinkedIn awaits.",
    KNIGHT: "A knight's resume — LinkedIn style!",
    SKELETON: "LinkedIn? My profile pic is... unfortunate.",
    BOSS: "Brian's professional side. Even villains network.",
    SLIME: "Brian's work stuff is there! So official!",
  },
  "social-instagram": {
    WIZARD: "Visual chronicles of Brian's adventures!",
    KNIGHT: "Instagram — the gallery of a true warrior!",
    SKELETON: "Do I look good in selfies? Don't answer that.",
    BOSS: "Brian's Instagram. I'm not jealous of his followers.",
    SLIME: "Pretty pictures! Brian has good taste!",
  },
  "social-github": {
    WIZARD: "The source code archives! Brian's GitHub grimoire!",
    KNIGHT: "Where Brian forges his code. GitHub, the armory!",
    SKELETON: "GitHub? My commit history is... dead.",
    BOSS: "Brian's code vault. Even I can't breach it.",
    SLIME: "All the code lives there! So many repos!",
  },
  "social-personal-email": {
    WIZARD: "Send a magical message to Brian's personal inbox!",
    KNIGHT: "A direct line to Brian. Write with honor!",
    SKELETON: "Email Brian! He actually responds, unlike most.",
    BOSS: "A personal email? Bold move. I approve.",
    SLIME: "Write to Brian! He's super nice!",
  },
  "social-school-email": {
    WIZARD: "The academic channel! Brian's scholarly mailbox.",
    KNIGHT: "His school email — for matters of learning!",
    SKELETON: "School email? Brian's still studying? Impressive.",
    BOSS: "Academic correspondence. Even villains respect education.",
    SLIME: "Brian's school email! He's so studious!",
  },
};

export function CharacterProvider({ children }) {
  const [characterIndex, setCharacterIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState("home");
  const [hoveredElement, setHoveredElement] = useState(null);

  const character = CHARACTERS[characterIndex];

  const dialogue = hoveredElement && HOVER_DIALOGUE[hoveredElement]
    ? HOVER_DIALOGUE[hoveredElement][character.name]
    : SECTION_DIALOGUE[currentSection]?.[character.name] || "...";

  return (
    <CharacterContext.Provider
      value={{
        characters: CHARACTERS,
        characterIndex,
        setCharacterIndex,
        character,
        currentSection,
        setCurrentSection,
        hoveredElement,
        setHoveredElement,
        dialogue,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  return useContext(CharacterContext);
}
