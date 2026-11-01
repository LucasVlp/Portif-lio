"use client";

// Tema claro/escuro: segue o sistema até a pessoa escolher; a escolha fica salva.
export type Theme = "light" | "dark";

export function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("lv-theme", theme);
  } catch {}
  window.dispatchEvent(new CustomEvent("theme:change", { detail: theme }));
}

export function toggleTheme() {
  setTheme(currentTheme() === "dark" ? "light" : "dark");
}
