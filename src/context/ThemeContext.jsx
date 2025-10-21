import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  neonBlue: {
    name: 'Neon Blue',
    id: 'neonBlue',
    primary: '#06b6d4',
    secondary: '#0891b2',
    accent: '#22d3ee',
    background: 'from-slate-900 via-cyan-900 to-slate-900',
    cardBg: 'bg-slate-800/50',
    cardBorder: 'border-cyan-500/30',
    text: 'text-cyan-50',
    textSecondary: 'text-cyan-100/80',
    buttonBg: 'bg-cyan-600 hover:bg-cyan-500',
    buttonText: 'text-white',
    inputBg: 'bg-slate-700/50',
    inputBorder: 'border-cyan-500/50',
    inputText: 'text-cyan-50',
    inputPlaceholder: 'placeholder-cyan-300/50',
    navBg: 'bg-slate-900/90',
    shadow: 'shadow-cyan-500/50',
    badgeBg: 'bg-cyan-500/20',
    badgeText: 'text-cyan-300',
    badgeBorder: 'border-cyan-400/50',
  },
  hackerGreen: {
    name: 'Hacker Green',
    id: 'hackerGreen',
    primary: '#00ff41',
    secondary: '#00cc33',
    accent: '#39ff14',
    background: 'from-black via-green-950 to-black',
    cardBg: 'bg-black/70',
    cardBorder: 'border-green-500/40',
    text: 'text-green-400',
    textSecondary: 'text-green-300/80',
    buttonBg: 'bg-green-600 hover:bg-green-500',
    buttonText: 'text-black',
    inputBg: 'bg-black/80',
    inputBorder: 'border-green-500/50',
    inputText: 'text-green-400',
    inputPlaceholder: 'placeholder-green-500/50',
    navBg: 'bg-black/90',
    shadow: 'shadow-green-500/50',
    badgeBg: 'bg-green-500/20',
    badgeText: 'text-green-300',
    badgeBorder: 'border-green-400/50',
  },
  light: {
    name: 'Light Mode',
    id: 'light',
    primary: '#3b82f6',
    secondary: '#2563eb',
    accent: '#60a5fa',
    background: 'from-slate-50 via-blue-50 to-slate-100',
    cardBg: 'bg-white/90',
    cardBorder: 'border-blue-200',
    text: 'text-slate-800',
    textSecondary: 'text-slate-600',
    buttonBg: 'bg-blue-600 hover:bg-blue-500',
    buttonText: 'text-white',
    inputBg: 'bg-white',
    inputBorder: 'border-slate-300',
    inputText: 'text-slate-800',
    inputPlaceholder: 'placeholder-slate-400',
    navBg: 'bg-white/90',
    shadow: 'shadow-blue-200',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    badgeBorder: 'border-blue-300',
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('neonBlue');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('codesphere-theme');
      if (savedTheme && themes[savedTheme]) {
        setCurrentTheme(savedTheme);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changeTheme = (themeName) => {
    if (!themes[themeName]) {
      console.error(`Theme "${themeName}" does not exist`);
      return;
    }
    
    setCurrentTheme(themeName);
    
    try {
      localStorage.setItem('codesphere-theme', themeName);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  };

  const theme = themes[currentTheme];

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
