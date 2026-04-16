# Retro Portfolio Website

A personal portfolio built with React + Vite, styled with a retro game-inspired UI and animated interactions.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- EmailJS

## Features

- Retro-themed interface with window-like cards and neon accents
- Scroll-reactive sections and animated transitions
- Horizontal projects carousel with controls and wheel support
- Character companion sprite + contextual dialogue
- Contact form integration via EmailJS
- Responsive behavior for desktop and mobile layouts

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` - Run local dev server
- `npm run build` - Create production build
- `npm run preview` - Preview built app
- `npm run lint` - Run ESLint checks

## Project Structure

```text
src/
  components/
    Navbar.jsx
    Hero.jsx
    About.jsx
    Experience.jsx
    Projects.jsx
    Contact.jsx
    SpriteAvatar.jsx
    SpriteCompanion.jsx
  context/
    CharacterContext.jsx
  hooks/
    useSectionObserver.js
    useHoverSfx.js
  App.jsx
```

## Customization Guide

- Update page sections in `src/components/` (`Hero`, `About`, `Experience`, `Projects`, `Contact`)
- Update companion dialogue and character behavior in `src/context/CharacterContext.jsx`
- Update contact delivery settings in `src/components/Contact.jsx` (EmailJS IDs/keys)
- Adjust visual theme and base styles in `src/index.css`

## Notes

- This project uses client-side EmailJS for form submissions.
- Keep sensitive keys and account values out of public repos when possible.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
