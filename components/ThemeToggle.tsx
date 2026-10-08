"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-300/60 text-slate-600 hover:text-[#00B8DB] hover:border-[#00B8DB]/40 hover:bg-[#00B8DB]/[0.06] dark:border-white/[0.12] dark:text-slate-300 dark:hover:text-white dark:hover:border-white/25 dark:hover:bg-white/[0.06] transition-all duration-200"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
