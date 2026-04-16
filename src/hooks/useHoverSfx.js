import { useCallback, useEffect, useRef } from "react";

let sharedAudioContext = null;
let activeHookInstances = 0;
let globalUnlockHandler = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioContext) {
    sharedAudioContext = new AudioCtx();
  }
  return sharedAudioContext;
}

export default function useHoverSfx() {
  const lastPlayedAtRef = useRef(0);

  useEffect(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    activeHookInstances += 1;

    if (!globalUnlockHandler) {
      globalUnlockHandler = () => {
        const currentCtx = getAudioContext();
        if (currentCtx && currentCtx.state === "suspended") {
          currentCtx.resume().catch(() => {});
        }
      };
      window.addEventListener("pointerdown", globalUnlockHandler, { passive: true });
      window.addEventListener("keydown", globalUnlockHandler);
    }

    return () => {
      activeHookInstances -= 1;
      if (activeHookInstances > 0) return;

      if (!globalUnlockHandler) return;
      window.removeEventListener("pointerdown", globalUnlockHandler);
      window.removeEventListener("keydown", globalUnlockHandler);
      globalUnlockHandler = null;
    };
  }, []);

  const playHoverSfx = useCallback(async () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = performance.now();
    if (now - lastPlayedAtRef.current < 70) return;
    lastPlayedAtRef.current = now;

    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        return;
      }
    }

    if (ctx.state !== "running") return;

    const start = ctx.currentTime;
    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0.0001, start);
    gainNode.gain.exponentialRampToValueAtTime(0.2, start + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);

    const oscA = ctx.createOscillator();
    oscA.type = "square";
    oscA.frequency.setValueAtTime(440, start);
    oscA.frequency.exponentialRampToValueAtTime(660, start + 0.14);
    oscA.connect(gainNode);

    const oscB = ctx.createOscillator();
    oscB.type = "triangle";
    oscB.frequency.setValueAtTime(660, start);
    oscB.frequency.exponentialRampToValueAtTime(880, start + 0.14);
    oscB.connect(gainNode);

    oscA.start(start);
    oscB.start(start);
    oscA.stop(start + 0.16);
    oscB.stop(start + 0.16);
  }, []);

  return playHoverSfx;
}
