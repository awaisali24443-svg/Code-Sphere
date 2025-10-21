import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, Lock } from 'lucide-react';

const ToolCard = ({ icon: Icon, title, description, comingSoon, onClick, badge }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: comingSoon ? 1.02 : 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-6 cursor-pointer ${theme.shadow} hover:shadow-xl transition-all relative overflow-hidden group ${
        comingSoon ? 'opacity-75' : ''
      }`}
      onClick={!comingSoon ? onClick : undefined}
      style={{ cursor: comingSoon ? 'not-allowed' : 'pointer' }}
    >
      {/* Coming Soon Badge */}
      {comingSoon && (
        <div className="absolute top-3 right-3 z-10">
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
      )}

      {/* Custom Badge */}
      {badge && !comingSoon && (
        <div className="absolute top-3 right-3 z-10">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className={`${theme.buttonBg} ${theme.buttonText} text-xs px-3 py-1 rounded-full font-semibold`}
          >
            {badge}
          </motion.span>
        </div>
      )}

      {/* Icon */}
      <motion.div
        whileHover={!comingSoon ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
        transition={{ duration: 0.5 }}
        className={`${theme.text} mb-4`}
      >
        {Icon && <Icon size={48} strokeWidth={1.5} />}
      </motion.div>

      {/* Content */}
      <h3 className={`text-xl font-bold ${theme.text} mb-2`}>{title}</h3>
      <p className={`${theme.textSecondary} text-sm mb-4 min-h-[40px]`}>{description}</p>

      {/* Action */}
      <motion.div
        className={`flex items-center gap-2 ${theme.text} font-medium text-sm`}
        whileHover={!comingSoon ? { x: 5 } : {}}
      >
        {comingSoon ? (
          <>
            <span>In Development</span>
            <Lock size={16} />
          </>
        ) : (
          <>
            <span>Launch Tool</span>
            <ArrowRight size={16} />
          </>
        )}
      </motion.div>

      {/* Hover Effect Overlay */}
      {!comingSoon && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${theme.background} opacity-0 group-hover:opacity-5 pointer-events-none`}
        />
      )}
    </motion.div>
  );
};

export default ToolCard;