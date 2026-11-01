"use client";

import { useSyncExternalStore } from "react";
import { currentTheme, toggleTheme } from "@/lib/theme";

// Acompanha a troca pelo botão, pelo terminal do monitor e pelo sistema.
function subscribe(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("theme:change", cb);
  mq.addEventListener("change", cb);
  return () => {
    window.removeEventListener("theme:change", cb);
    mq.removeEventListener("change", cb);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => null);
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      title={dark ? "Tema claro" : "Tema escuro"}
      className="grid size-10 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--fg)] transition-transform duration-300 hover:rotate-12 active:scale-90"
    >
      {dark ? (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
          <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
        </svg>
      )}
    </button>
  );
}
