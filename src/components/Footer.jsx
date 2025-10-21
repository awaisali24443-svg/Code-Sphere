import { useTheme } from '../context/ThemeContext';
import { Github, Linkedin, Heart, Code2, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className={`${theme.text} text-xl font-bold mb-3 flex items-center gap-2`}>
              CodeSphere ⚡
            </div>
            <p className={`${theme.textSecondary} text-sm mb-4`}>
              A modern developer toolkit — simple, beautiful, and built for everyone.
            </p>
            <p className={`${theme.textSecondary} text-xs`}>
              Developed by <span className={`${theme.text} font-semibold`}>Awais Ali</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`${theme.text} font-semibold mb-3`}>Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Tools', path: '/tools' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block ${theme.textSecondary} hover:${theme.text} transition-colors text-sm`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className={`${theme.text} font-semibold mb-3`}>Connect</h3>
            <div className="flex items-center gap-3 mb-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${theme.cardBg} border ${theme.cardBorder} ${theme.text} p-2 rounded-lg hover:${theme.shadow} transition-all`}
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${theme.cardBg} border ${theme.cardBorder} ${theme.text} p-2 rounded-lg hover:${theme.shadow} transition-all`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:awais.codesphere@example.com"
                className={`${theme.cardBg} border ${theme.cardBorder} ${theme.text} p-2 rounded-lg hover:${theme.shadow} transition-all`}
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>
            <p className={`${theme.textSecondary} text-xs`}>
              Feel free to reach out for collaborations or questions.
            </p>
          </div>
        </div>

        <div className={`border-t ${theme.cardBorder} pt-6`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`${theme.text} text-center md:text-left`}>
              <p className="font-semibold flex items-center justify-center md:justify-start gap-2 text-sm">
                <Code2 size={18} />
                © {currentYear} CodeSphere — Developed by Awais Ali
              </p>
              <p className={`text-xs ${theme.textSecondary} mt-1`}>
                v1.0.0 · All rights reserved
              </p>
            </div>

            <div className={`text-center ${theme.textSecondary} text-xs`}>
              <p className="flex items-center justify-center gap-1">
                No login required · Works entirely in your browser
                <Heart size={14} className="text-red-500 animate-pulse" fill="currentColor" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
