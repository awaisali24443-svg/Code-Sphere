import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Copy, Check, Palette, Pipette } from 'lucide-react';

const ColorPicker = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState('#06b6d4');
  const [copied, setCopied] = useState('');

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : 'Invalid color';
  };

  const hexToHsl = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return 'Invalid color';

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
        default: h = 0;
      }
    }

    return `hsl(${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const copyValue = async (value, type) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const presetColors = [
    '#06b6d4', '#00ff41', '#3b82f6', '#ef4444', '#f59e0b',
    '#10b981', '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6'
  ];

  return (
    <div className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-6 shadow-xl`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`${theme.buttonBg} p-2 rounded-lg`}>
          <Palette className={theme.buttonText} size={28} />
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${theme.text}`}>Color Picker</h2>
          <p className={`text-sm ${theme.textSecondary}`}>Pick colors & get values instantly</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Color Display */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-full h-48 rounded-lg border-4 border-white shadow-xl cursor-pointer overflow-hidden group"
            style={{ backgroundColor: color }}
          >
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Pipette className="text-white" size={32} />
            </div>
          </motion.div>

          <input
            type="text"
            value={color}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                setColor(val);
              }
            }}
            className={`w-full ${theme.inputBg} ${theme.inputText} ${theme.inputPlaceholder} border ${theme.inputBorder} rounded-lg px-4 py-3 text-center font-mono text-lg uppercase focus:outline-none focus:ring-2 focus:ring-current`}
            maxLength={7}
            placeholder="#06b6d4"
          />
        </div>

        {/* Preset Colors */}
        <div>
          <label className={`block ${theme.text} mb-3 font-medium`}>
            Preset Colors
          </label>
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((presetColor) => (
              <motion.button
                key={presetColor}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setColor(presetColor)}
                className={`h-12 rounded-lg border-2 transition-all ${
                  color.toLowerCase() === presetColor.toLowerCase()
                    ? 'border-white shadow-lg ring-2 ring-white/50'
                    : 'border-gray-300 hover:border-white'
                }`}
                style={{ backgroundColor: presetColor }}
                title={presetColor}
                aria-label={`Select color ${presetColor}`}
              />
            ))}
          </div>
        </div>

        {/* Color Values */}
        <div className="space-y-3">
          {/* HEX */}
          <div className={`${theme.inputBg} border ${theme.inputBorder} rounded-lg p-4 flex justify-between items-center`}>
            <div>
              <p className={`${theme.textSecondary} text-sm mb-1`}>HEX</p>
              <p className={`${theme.text} font-mono font-semibold uppercase`}>{color}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyValue(color, 'hex')}
              className={`${theme.buttonBg} ${theme.buttonText} px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg`}
            >
              {copied === 'hex' ? <Check size={16} /> : <Copy size={16} />}
              {copied === 'hex' ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>

          {/* RGB */}
          <div className={`${theme.inputBg} border ${theme.inputBorder} rounded-lg p-4 flex justify-between items-center`}>
            <div>
              <p className={`${theme.textSecondary} text-sm mb-1`}>RGB</p>
              <p className={`${theme.text} font-mono font-semibold`}>{hexToRgb(color)}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyValue(hexToRgb(color), 'rgb')}
              className={`${theme.buttonBg} ${theme.buttonText} px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg`}
            >
              {copied === 'rgb' ? <Check size={16} /> : <Copy size={16} />}
              {copied === 'rgb' ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>

          {/* HSL */}
          <div className={`${theme.inputBg} border ${theme.inputBorder} rounded-lg p-4 flex justify-between items-center`}>
            <div>
              <p className={`${theme.textSecondary} text-sm mb-1`}>HSL</p>
              <p className={`${theme.text} font-mono font-semibold`}>{hexToHsl(color)}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyValue(hexToHsl(color), 'hsl')}
              className={`${theme.buttonBg} ${theme.buttonText} px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg`}
            >
              {copied === 'hsl' ? <Check size={16} /> : <Copy size={16} />}
              {copied === 'hsl' ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
