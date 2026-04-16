import { useEffect, useRef } from "react";

const PARTICLE_COUNT_DESKTOP = 52;
const PARTICLE_COUNT_MOBILE = 34;
const MOUSE_RADIUS = 130;
const MOUSE_FORCE = 3.2;
const SPRING = 0.022;
const DAMPING = 0.91;
const FLOAT = 14;
const GREEN = "50, 186, 125";

function randomRadius() {
  const u = Math.random();
  if (u < 0.38) return 0.75 + Math.random() * 1.35;
  if (u < 0.78) return 1.85 + Math.random() * 2.1;
  return 3.35 + Math.random() * 3.15;
}

function initParticles(width, height, count) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = randomRadius();
    const alpha = 0.18 + Math.random() * 0.22 + (r < 1.6 ? 0.06 : 0);
    list.push({
      x,
      y,
      vx: 0,
      vy: 0,
      bx: x,
      by: y,
      phase: Math.random() * Math.PI * 2,
      r,
      alpha: Math.min(0.52, alpha),
    });
  }
  return list;
}

export default function AmbientParticles({ active }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animId;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let reducedGpu =
      window.matchMedia("(pointer: coarse)").matches || w < 768;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      reducedGpu =
        window.matchMedia("(pointer: coarse)").matches || w < 768;
      const dprCap = Math.min(window.devicePixelRatio || 1, reducedGpu ? 1.5 : 2);
      canvas.width = Math.floor(w * dprCap);
      canvas.height = Math.floor(h * dprCap);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dprCap, 0, 0, dprCap, 0, 0);
      const count = reducedGpu ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
      particlesRef.current = initParticles(w, h, count);
    };

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const onTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) mouseRef.current = { x: touch.clientX, y: touch.clientY };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onLeave);

    const draw = () => {
      const { x: mx, y: my } = mouseRef.current;
      const particles = particlesRef.current;
      if (!particles) {
        animId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const time = performance.now() * 0.001;

      for (const p of particles) {
        p.bx += Math.sin(time * 0.12 + p.phase) * 0.12;
        p.by += Math.cos(time * 0.1 + p.phase * 1.3) * 0.1;
        if (p.bx < 0) p.bx += w;
        if (p.bx > w) p.bx -= w;
        if (p.by < 0) p.by += h;
        if (p.by > h) p.by -= h;

        const tx =
          p.bx + Math.sin(time * 0.35 + p.phase) * FLOAT;
        const ty =
          p.by + Math.cos(time * 0.31 + p.phase * 0.9) * FLOAT;

        let ax = (tx - p.x) * SPRING;
        let ay = (ty - p.y) * SPRING;

        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        const r2 = MOUSE_RADIUS * MOUSE_RADIUS;
        if (d2 < r2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const push = ((MOUSE_RADIUS - d) / MOUSE_RADIUS) * MOUSE_FORCE;
          ax += (dx / d) * push;
          ay += (dy / d) * push;
        }

        p.vx = (p.vx + ax) * DAMPING;
        p.vy = (p.vy + ay) * DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (!reducedGpu && p.r > 2.6) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${GREEN}, ${p.alpha * 0.45})`;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `rgba(${GREEN}, ${p.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onLeave);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
