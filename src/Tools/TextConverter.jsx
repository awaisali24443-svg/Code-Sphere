import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Copy, Check, Type, RotateCcw } from 'lucide-react';

const TextConverter = () => {
  const { theme } = useTheme();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [conversionType, setConversionType] = useState('uppercase');
  const [copied, setCopied] = useState(false);

  const convertText = () => {
    if (!input.trim()) {
      setOutput('Please enter some text to convert...');
      return;
    }

    let converted = '';
    switch (conversionType) {
      case 'uppercase':
        converted = input.toUpperCase();
        break;
      case 'lowercase':
        converted = input.toLowerCase();
        break;
      case 'capitalize':
        converted = input.replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case 'sentence':
        converted = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        break;
      case 'reverse':
        converted = input.split('').reverse().join('');
        break;
      case 'remove-spaces':
        converted = input.replace(/\s+/g, '');
        break;
      default:
        converted = input;
    }
    setOutput(converted);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetFields = () => {
    setInput('');
    setOutput('');
    setCopied(false);
  };

  const conversions = [
    { value: 'uppercase', label: 'UPPERCASE', example: 'HELLO WORLD' },
    { value: 'lowercase', label: 'lowercase', example: 'hello world' },
    { value: 'capitalize', label: 'Capitalize Each Word', example: 'Hello World' },
    { value: 'sentence', label: 'Sentence case', example: 'Hello world' },
    { value: 'reverse', label: 'Reverse Text', example: 'dlroW olleH' },
    { value: 'remove-spaces', label: 'Remove Spaces', example: 'HelloWorld' },
  ];

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  return (
    <div className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-6 shadow-xl`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`${theme.buttonBg} p-2 rounded-lg`}>
            <Type className={theme.buttonText} size={28} />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${theme.text}`}>Text Converter</h2>
            <p className={`text-sm ${theme.textSecondary}`}>Transform text in multiple ways</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, rotate: -180 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetFields}
          className={`${theme.cardBg} border ${theme.cardBorder} ${theme.text} p-2 rounded-lg hover:${theme.shadow} transition-all`}
          title="Reset all fields"
        >
          <RotateCcw size={20} />
        </motion.button>
      </div>

      <div className="space-y-4">
        <div>
          <label className={`block ${theme.text} mb-2 font-medium`}>
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert..."
            className={`w-full h-32 ${theme.inputBg} ${theme.inputText} ${theme.inputPlaceholder} border ${theme.inputBorder} rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-current resize-none`}
          />
          {input && (
            <div className={`flex gap-4 text-xs ${theme.textSecondary} mt-2`}>
              <span>Characters: {input.length}</span>
              <span>Words: {wordCount}</span>
              <span>Lines: {input.split('\n').length}</span>
            </div>
          )}
        </div>

        <div>
          <label className={`block ${theme.text} mb-2 font-medium`}>
            Conversion Type
          </label>
          <select
            value={conversionType}
            onChange={(e) => setConversionType(e.target.value)}
            className={`w-full ${theme.inputBg} ${theme.inputText} border ${theme.inputBorder} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-current cursor-pointer`}
          >
            {conversions.map((conversion) => (
              <option key={conversion.value} value={conversion.value}>
                {conversion.label}
              </option>
            ))}
          </select>
          {conversions.find(c => c.value === conversionType) && (
            <p className={`text-xs ${theme.textSecondary} mt-2`}>
              Example: "{conversions.find(c => c.value === conversionType).example}"
            </p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={convertText}
          disabled={!input.trim()}
          className={`w-full ${theme.buttonBg} ${theme.buttonText} py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
        >
          Convert Text
        </motion.button>

        {output && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-2">
              <label className={`block ${theme.text} font-medium`}>
                Output
              </label>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className={`flex items-center gap-2 ${theme.buttonBg} ${theme.buttonText} px-4 py-2 rounded-lg text-sm shadow-lg`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </motion.button>
            </div>
            <textarea
              value={output}
              readOnly
              className={`w-full h-32 ${theme.inputBg} ${theme.inputText} border ${theme.inputBorder} rounded-lg p-4 resize-none`}
            />
            {output && output !== 'Please enter some text to convert...' && (
              <p className={`text-xs ${theme.textSecondary} mt-2`}>
                Characters: {output.length}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TextConverter;