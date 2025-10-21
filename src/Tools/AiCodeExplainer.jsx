import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Lock, Zap, Brain, Code2, CheckCircle, Rocket } from 'lucide-react';

const AICodeExplainer = () => {
  const { theme } = useTheme();

  const features = [
    { icon: Brain, text: 'AI-powered code analysis', color: '#8b5cf6' },
    { icon: Code2, text: 'Line-by-line explanation', color: '#06b6d4' },
    { icon: Zap, text: 'Performance optimization tips', color: '#f59e0b' },
    { icon: CheckCircle, text: 'Bug detection suggestions', color: '#10b981' },
  ];

  return (
    <div className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-6 shadow-xl relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10">
        <div className="absolute top-4 right-4">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1`}
          >
            <Lock size={12} />
            Coming Soon
          </motion.span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className={`${theme.buttonBg} p-2 rounded-lg`}>
            <Sparkles className={theme.buttonText} size={28} />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${theme.text}`}>AI Code Explainer</h2>
            <p className={`text-sm ${theme.textSecondary}`}>Powered by artificial intelligence</p>
          </div>
        </div>

        <div className="text-center py-8">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            🤖
          </motion.div>

          <h3 className={`${theme.text} text-xl font-bold mb-3`}>
            AI-Powered Code Explanation
          </h3>
          <p className={`${theme.textSecondary} max-w-md mx-auto mb-8`}>
            This feature will use artificial intelligence to explain your code in plain English.
            Perfect for learning and understanding complex code snippets.
          </p>

          <div className={`${theme.inputBg} border ${theme.inputBorder} rounded-lg p-6 text-left mb-6`}>
            <h4 className={`${theme.text} font-semibold mb-4 flex items-center gap-2`}>
              <Rocket size={20} />
              Planned Features:
            </h4>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 ${theme.textSecondary}`}
                >
                  <div className={`${theme.buttonBg} p-1.5 rounded`}>
                    <feature.icon size={18} className={theme.buttonText} />
                  </div>
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} p-4 rounded-lg`}
          >
            <p className="text-sm font-medium">
              🚀 Currently in development • Expected release: Q2 2025
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AICodeExplainer;