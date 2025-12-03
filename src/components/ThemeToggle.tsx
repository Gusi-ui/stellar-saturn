import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Verificar el estado inicial
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.classList.contains('dark');
    setIsDark(currentTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    const newIsDark = !isDark;

    if (newIsDark) {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    setIsDark(newIsDark);
  };

  // Estilos consistentes para evitar saltos de tamaño
  const buttonStyles =
    'w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-gray-700 dark:to-gray-600 text-orange-600 dark:text-amber-400 hover:from-orange-200 hover:to-amber-200 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 shadow-md hover:shadow-lg';

  if (!mounted) {
    return (
      <button className={buttonStyles} aria-label="Cambiar tema" disabled>
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={buttonStyles}
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      type="button"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
