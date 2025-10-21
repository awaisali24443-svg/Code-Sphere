import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const LoadingScreen = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br ${theme.background}`}
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-7xl mb-6"
        >
          ⚡
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`text-2xl md:text-3xl font-bold ${theme.text}`}
        >
          Initializing CodeSphere...
        </motion.h2>

        {/* Subtitle */}
        <motion.div
          className={`mt-4 ${theme.textSecondary} text-sm`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading your developer toolkit
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className={`mt-8 w-64 h-1 mx-auto ${theme.cardBg} rounded-full overflow-hidden`}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${theme.buttonBg}`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;