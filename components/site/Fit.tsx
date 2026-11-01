"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Desenha o filho no tamanho natural e reduz para caber na caixa, centralizado.
export default function Fit({ children, padding = 0.9 }: { children: ReactNode; padding?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useLayoutEffect(() => {
    const b = box.current;
    const c = inner.current;
    if (!b || !c) return;
    const fit = () => {
      if (!c.offsetWidth || !c.offsetHeight) return;
      const k = Math.min(b.clientWidth / c.offsetWidth, b.clientHeight / c.offsetHeight) * padding;
      setScale(Math.min(1, k));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    ro.observe(c);
    return () => ro.disconnect();
  }, [padding]);

  return (
    <div ref={box} className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div ref={inner} style={{ transform: `scale(${scale})` }} className="w-max shrink-0 origin-center">
        {children}
      </div>
    </div>
  );
}
