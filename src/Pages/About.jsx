import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Code, Smartphone, Palette, Calendar, Zap, Users, Globe, Award } from 'lucide-react';

const About = () => {
  const { theme } = useTheme();

  const highlights = [
    {
      icon: Code,
      title: 'Built with React + TailwindCSS',
      description: 'Modern tech stack for optimal performance',
    },
    {
      icon: Smartphone,
      title: 'Fully Responsive',
      description: 'Works seamlessly on all devices',
    },
    {
      icon: Palette,
      title: 'Switchable Themes',
      description: 'Three beautiful themes to choose from',
    },
  ];

  const stats = [
    { icon: Zap, value: '3+', label: 'Active Tools' },
    { icon: Users, value: '15+', label: 'Coming Soon' },
    { icon: Globe, value: '100%', label: 'Browser-Based' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} pt-24 px-4 pb-12`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-6`}>
            About CodeSphere
          </h1>

          {/* Main Description */}
          <div className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-8 mb-8 shadow-xl`}>
            <p className={`${theme.text} text-lg leading-relaxed mb-6`}>
              CodeSphere is a multipurpose web toolkit built for developers and students. 
              It combines simplicity, performance, and beauty — providing tools that make 
              coding tasks faster and cleaner.
            </p>
            <p className={`${theme.text} text-lg leading-relaxed mb-6`}>
              This platform showcases modern web development practices and user-centric 
              design principles. CodeSphere demonstrates how design and functionality can 
              coexist beautifully in a developer tool.
            </p>
            <div className={`${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} p-4 rounded-lg flex items-center gap-3`}>
              <Award size={24} />
              <div>
                <p className="font-bold">Developed by Awais Ali</p>
                <p className="text-sm opacity-90">Full-stack Developer & Designer</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-6 text-center shadow-xl`}
              >
                <stat.icon className={`${theme.text} mx-auto mb-3`} size={32} />
                <div className={`text-3xl font-bold ${theme.text} mb-1`}>{stat.value}</div>
                <div className={`${theme.textSecondary}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-6 text-center shadow-xl`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`${theme.text} inline-block mb-4`}
                >
                  <highlight.icon size={40} />
                </motion.div>
                <h3 className={`${theme.text} font-bold text-lg mb-2`}>
                  {highlight.title}
                </h3>
                <p className={`${theme.textSecondary} text-sm`}>
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Development Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-8 mb-8 shadow-xl`}
          >
            <h2 className={`${theme.text} text-2xl font-bold mb-4`}>
              🚀 Upcoming Updates
            </h2>
            <div className={`${theme.text} space-y-3`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛠️</span>
                <p className="text-lg">15+ more developer tools coming soon</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <p className="text-lg">Performance optimizations underway</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎨</span>
                <p className="text-lg">More theme customization options</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <p className="text-lg">AI-powered features in development</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <p className="text-lg">Progressive Web App (PWA) support</p>
              </div>
            </div>

            <div className={`mt-8 pt-6 border-t ${theme.cardBorder} flex items-center gap-2 ${theme.textSecondary}`}>
              <Calendar size={20} />
              <span>Last updated: January 2025</span>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-8 shadow-xl`}
          >
            <h2 className={`${theme.text} text-2xl font-bold mb-4`}>
              💻 Technology Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                'React 18', 
                'TailwindCSS 3', 
                'Framer Motion', 
                'React Router', 
                'Vite 5', 
                'Lucide Icons', 
                'js-beautify',
                'LocalStorage API',
                'Clipboard API'
              ].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} px-4 py-2 rounded-lg font-semibold text-sm`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
