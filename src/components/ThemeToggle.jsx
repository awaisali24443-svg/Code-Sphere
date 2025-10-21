  import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { currentTheme, changeTheme, theme } = useTheme();

  const themeConfig = {
    neonBlue: { 
      icon: Zap, 
      label: 'Neon Blue', 
      next: 'hackerGreen',
      color: '#06b6d4'
    },
    hackerGreen: { 
      icon: Moon, 
      label: 'Hacker Green', 
      next: 'light',
      color: '#00ff41'
    },
    light: { 
      icon: Sun, 
      label: 'Light Mode', 
      next: 'neonBlue',
      color: '#3b82f6'
    }
  };

  const current = themeConfig[currentTheme];
  const CurrentIcon = current.icon;

  const cycleTheme = () => {
    changeTheme(current.next);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={cycleTheme}
      className={`p-2.5 rounded-lg ${theme.cardBg} border ${theme.cardBorder} ${theme.text} backdrop-blur-sm hover:${theme.shadow} transition-all`}
      title={`Switch theme (Current: ${current.label})`}
      aria-label={`Switch to next theme. Current theme: ${current.label}`}
    >
      <motion.div
        key={currentTheme}
        initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
      >
        <CurrentIcon className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;