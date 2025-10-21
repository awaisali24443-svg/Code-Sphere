import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Copy, Check, Code, RotateCcw, AlertCircle } from 'lucide-react';
import { js_beautify } from 'js-beautify';

const CodeFormatter = () => {
  const { theme } = useTheme();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const formatCode = () => {
    if (!input.trim()) {
      setOutput('// Please enter some code to format');
      setError(true);
      return;
    }

    try {
      const formatted = js_beautify(input, {
        indent_size: 2,
        space_in_empty_paren: true,
        preserve_newlines: true,
        max_preserve_newlines: 2,
        brace_style: 'collapse',
        break_chained_methods: false,
      });
      setOutput(formatted);
      setError(false);
    } catch (err) {
      setOutput(`// Error: Unable to format code\n// ${err.message}`);
      setError(true);
    }
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
    setError(false);
  };

  return (
    <div className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-6 shadow-xl`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`${theme.buttonBg} p-2 rounded-lg`}>
            <Code className={theme.buttonText} size={28} />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${theme.text}`}>Code Formatter</h2>
            <p className={`text-sm ${theme.textSecondary}`}>Beautify JavaScript, JSON & more</p>
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
            Unformatted Code
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="// Paste your messy code here...&#10;function example(){console.log('Hello World');return true;}"
            className={`w-full h-48 ${theme.inputBg} ${theme.inputText} ${theme.inputPlaceholder} border ${theme.inputBorder} rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-current resize-none`}
          />
          {input && (
            <p className={`text-xs ${theme.textSecondary} mt-1`}>
              Characters: {input.length} | Lines: {input.split('\n').length}
            </p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={formatCode}
          disabled={!input.trim()}
          className={`w-full ${theme.buttonBg} ${theme.buttonText} py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
        >
          Format Code
        </motion.button>

        {output && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error && (
              <div className={`flex items-center gap-2 ${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} p-3 rounded-lg mb-3`}>
                <AlertCircle size={16} />
                <span className="text-xs">There was an issue formatting your code</span>
              </div>
            )}
            <div className="flex justify-between items-center mb-2">
              <label className={`block ${theme.text} font-medium`}>
                Formatted Output
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
            <pre className={`w-full h-48 ${theme.inputBg} ${theme.inputText} border ${theme.inputBorder} rounded-lg p-4 overflow-auto text-sm`}>
              {output}
            </pre>
            {!error && (
              <p className={`text-xs ${theme.textSecondary} mt-1`}>
                Lines: {output.split('\n').length}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CodeFormatter;