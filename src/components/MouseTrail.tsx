import { useEffect, useRef } from "react";

export default function MouseTrail() {
  const lastTime = useRef(0);

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Disable on touch/mobile devices
    if (window.matchMedia("(hover: none)").matches) return;

    const colors = ["#14b8a6", "#0d9488", "#0f766e", "#5eead4", "#99f6e4"];

    const spawnParticle = (x: number, y: number) => {
      const size = Math.random() * 9 + 5;
      const xOffset = (Math.random() - 0.5) * 18;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const particle = document.createElement("div");
      particle.style.cssText = `
        position: fixed;
        left: ${x + xOffset}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50% 50% 50% 0;
        background: ${color};
        box-shadow: 0 0 ${size}px ${color};
        pointer-events: none;
        z-index: 9999;
        transform: rotate(-45deg);
        opacity: 0.85;
        will-change: transform, opacity;
      `;

      document.body.appendChild(particle);

      const duration = 550 + Math.random() * 350;
      const dy = -(35 + Math.random() * 55);
      const dx = (Math.random() - 0.5) * 25;

      particle
        .animate(
          [
            { transform: `translate(0,0) rotate(-45deg) scale(1)`, opacity: 0.85 },
            { transform: `translate(${dx}px,${dy}px) rotate(-45deg) scale(0)`, opacity: 0 },
          ],
          { duration, easing: "ease-out", fill: "forwards" }
        )
        .addEventListener("finish", () => particle.remove());
    };

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const now = performance.now();
        // Throttle: at most one burst every 40 ms (~25 fps)
        if (now - lastTime.current < 40) return;
        lastTime.current = now;
        // Spawn 2 particles per burst (was 3)
        spawnParticle(e.clientX, e.clientY);
        spawnParticle(e.clientX, e.clientY);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
