import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ArrowDown, Code2, Palette, Type, Sparkles, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const features = [
    { icon: Code2, title: 'Code Formatter', subtitle: 'Beautify your code', delay: 0.2, active: true },
    { icon: Palette, title: 'Color Picker', subtitle: 'HEX & RGB values', delay: 0.3, active: true },
    { icon: Type, title: 'Text Converter', subtitle: 'Transform text easily', delay: 0.4, active: true },
    { icon: Sparkles, title: 'AI Tools', subtitle: 'Coming Soon', delay: 0.5, active: false },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading */}
          <motion.h1
            className={`text-5xl md:text-7xl font-bold ${theme.text} mb-6`}
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Welcome to{' '}
            <span className="relative inline-block">
              CodeSphere
              <motion.span
                className="absolute -top-2 -right-8 text-4xl"
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-xl md:text-2xl ${theme.textSecondary} mb-8 max-w-3xl mx-auto`}
          >
            A modern developer utility hub crafted for efficiency and elegance.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/tools')}
            className={`${theme.buttonBg} ${theme.buttonText} px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2`}
          >
            Explore Tools
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </motion.button>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center gap-8"
          >
            {[
              { label: 'Active Tools', value: '3+' },
              { label: 'Coming Soon', value: '19+' },
              { label: 'No Login', value: '100%' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-lg px-6 py-3`}
              >
                <div className={`text-2xl font-bold ${theme.text}`}>{stat.value}</div>
                <div className={`text-sm ${theme.textSecondary}`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay }}
              whileHover={{ y: -10 }}
              className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-6 ${theme.shadow} relative`}
            >
              {!feature.active && (
                <div className="absolute top-2 right-2">
                  <Lock size={14} className={theme.textSecondary} />
                </div>
              )}
              <motion.div
                whileHover={feature.active ? { rotate: 360 } : {}}
                transition={{ duration: 0.6 }}
                className={`${theme.text} mb-3 inline-block`}
              >
                <feature.icon size={40} />
              </motion.div>
              <h3 className={`${theme.text} font-semibold text-lg mb-1`}>
                {feature.title}
              </h3>
              <p className={`${theme.textSecondary} text-sm`}>
                {feature.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;