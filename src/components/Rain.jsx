import { useEffect, useRef } from "react";

const DROP_COUNT = 300;
const MIN_SPEED = 6;
const MAX_SPEED = 16;
const DROP_WIDTHS = [1, 2];
const DROP_HEIGHTS = [10, 14, 18];
const COLOR = "rgba(50, 186, 125, 0.35)";

function createDrop(canvasWidth, canvasHeight) {
  const width = DROP_WIDTHS[Math.floor(Math.random() * DROP_WIDTHS.length)];
  const height = DROP_HEIGHTS[Math.floor(Math.random() * DROP_HEIGHTS.length)];
  return {
    x: Math.floor(Math.random() * (canvasWidth - width)),
    y: Math.random() * -canvasHeight,
    speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
    width,
    height,
  };
}

export default function Rain({ enabled = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled) {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const ctx = canvas.getContext("2d");
    let animId;
    let drops = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array.from({ length: DROP_COUNT }, () =>
        createDrop(canvas.width, canvas.height)
      );
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = COLOR;
      for (const drop of drops) {
        ctx.fillRect(drop.x, drop.y, drop.width, drop.height);

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          Object.assign(drop, createDrop(canvas.width, canvas.height));
          drop.y = -drop.height;
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
