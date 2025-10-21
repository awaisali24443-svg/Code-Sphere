import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  Search, Code, Palette, Type, Sparkles, Filter, 
  Binary, Image, FileJson, Terminal, Hash, 
  Link2, QrCode, Calculator, Clock, Database,
  FileText, Globe, Lock as LockIcon, Key, FileSearch,
  Scissors, Braces, FileCode, Repeat
} from 'lucide-react';
import ToolCard from '../components/ToolCard';
import CodeFormatter from '../tools/CodeFormatter';
import ColorPicker from '../tools/ColorPicker';
import TextConverter from '../tools/TextConverter';
import AICodeExplainer from '../tools/AICodeExplainer';

const Tools = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = [
    // ✅ ACTIVE TOOLS
    {
      id: 'code-formatter',
      icon: Code,
      title: 'Code Formatter',
      description: 'Beautify and format your messy code instantly',
      category: 'Formatter',
      component: CodeFormatter,
      badge: 'Popular'
    },
    {
      id: 'color-picker',
      icon: Palette,
      title: 'Color Picker',
      description: 'Pick colors and get HEX, RGB, HSL values',
      category: 'Color Tools',
      component: ColorPicker,
    },
    {
      id: 'text-converter',
      icon: Type,
      title: 'Text Converter',
      description: 'Convert text case and format easily',
      category: 'Text Tools',
      component: TextConverter,
    },
    
    // 🔒 COMING SOON TOOLS
    {
      id: 'ai-explainer',
      icon: Sparkles,
      title: 'AI Code Explainer',
      description: 'AI-powered code explanation and analysis',
      category: 'AI Tools',
      comingSoon: true,
      component: AICodeExplainer,
    },
    {
      id: 'base64-encoder',
      icon: Binary,
      title: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 strings',
      category: 'Converters',
      comingSoon: true,
    },
    {
      id: 'image-compressor',
      icon: Image,
      title: 'Image Compressor',
      description: 'Compress images without quality loss',
      category: 'Image Tools',
      comingSoon: true,
    },
    {
      id: 'json-validator',
      icon: FileJson,
      title: 'JSON Validator & Formatter',
      description: 'Validate, format and beautify JSON data',
      category: 'Formatter',
      comingSoon: true,
    },
    {
      id: 'terminal-emulator',
      icon: Terminal,
      title: 'Terminal Emulator',
      description: 'Browser-based command line interface',
      category: 'Developer Tools',
      comingSoon: true,
    },
    {
      id: 'hash-generator',
      icon: Hash,
      title: 'Hash Generator',
      description: 'Generate MD5, SHA-1, SHA-256 hashes',
      category: 'Security',
      comingSoon: true,
    },
    {
      id: 'url-shortener',
      icon: Link2,
      title: 'URL Shortener',
      description: 'Create short, shareable links',
      category: 'Utilities',
      comingSoon: true,
    },
    {
      id: 'qr-generator',
      icon: QrCode,
      title: 'QR Code Generator',
      description: 'Generate QR codes for any data',
      category: 'Utilities',
      comingSoon: true,
    },
    {
      id: 'unit-converter',
      icon: Calculator,
      title: 'Unit Converter',
      description: 'Convert between different measurement units',
      category: 'Converters',
      comingSoon: true,
    },
    {
      id: 'timestamp-converter',
      icon: Clock,
      title: 'Timestamp Converter',
      description: 'Convert between timestamp formats',
      category: 'Converters',
      comingSoon: true,
    },
    {
      id: 'sql-formatter',
      icon: Database,
      title: 'SQL Formatter',
      description: 'Format and beautify SQL queries',
      category: 'Formatter',
      comingSoon: true,
    },
    {
      id: 'markdown-preview',
      icon: FileText,
      title: 'Markdown Preview',
      description: 'Live markdown editor and preview',
      category: 'Text Tools',
      comingSoon: true,
    },
    {
      id: 'lorem-ipsum',
      icon: Globe,
      title: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for designs',
      category: 'Text Tools',
      comingSoon: true,
    },
    {
      id: 'password-generator',
      icon: Key,
      title: 'Password Generator',
      description: 'Generate secure random passwords',
      category: 'Security',
      comingSoon: true,
    },
    {
      id: 'regex-tester',
      icon: FileSearch,
      title: 'Regex Tester',
      description: 'Test and validate regular expressions',
      category: 'Developer Tools',
      comingSoon: true,
    },
    {
      id: 'css-minifier',
      icon: Scissors,
      title: 'CSS Minifier',
      description: 'Minify and optimize CSS code',
      category: 'Formatter',
      comingSoon: true,
    },
    {
      id: 'html-formatter',
      icon: Braces,
      title: 'HTML Formatter',
      description: 'Format and beautify HTML code',
      category: 'Formatter',
      comingSoon: true,
    },
    {
      id: 'xml-formatter',
      icon: FileCode,
      title: 'XML Formatter',
      description: 'Format and validate XML documents',
      category: 'Formatter',
      comingSoon: true,
    },
    {
      id: 'diff-checker',
      icon: Repeat,
      title: 'Diff Checker',
      description: 'Compare two text files for differences',
      category: 'Developer Tools',
      comingSoon: true,
    },
  ];

  const filters = ['All', 'Formatter', 'Converters', 'Color Tools', 'Text Tools', 'AI Tools', 'Security', 'Developer Tools', 'Utilities', 'Image Tools'];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || tool.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const activeToolsCount = tools.filter(t => !t.comingSoon).length;
  const comingSoonCount = tools.filter(t => t.comingSoon).length;

  if (selectedTool) {
    const ToolComponent = selectedTool.component;
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} pt-24 px-4 pb-12`}>
        <div className="max-w-4xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedTool(null)}
            className={`${theme.buttonBg} ${theme.buttonText} px-6 py-2 rounded-lg mb-6 font-semibold`}
          >
            ← Back to Tools
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {ToolComponent && <ToolComponent />}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} pt-24 px-4 pb-12`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-4`}>
            Developer Tools 🛠️
          </h1>
          <p className={`${theme.textSecondary} text-lg mb-4`}>
            Choose from our collection of powerful utilities
          </p>
          <div className="flex flex-wrap gap-4">
            <span className={`${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} px-4 py-2 rounded-lg font-semibold`}>
              {activeToolsCount} Active Tools
            </span>
            <span className={`${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} px-4 py-2 rounded-lg font-semibold`}>
              {comingSoonCount} Coming Soon
            </span>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={20} />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full ${theme.inputBg} ${theme.inputText} border ${theme.inputBorder} rounded-lg pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-current`}
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <div className={`flex items-center gap-2 ${theme.text}`}>
            <Filter size={20} />
            <span className="font-semibold">Filter:</span>
          </div>
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === filter
                  ? `${theme.buttonBg} ${theme.buttonText}`
                  : `${theme.cardBg} ${theme.text} border ${theme.cardBorder}`
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <ToolCard
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                comingSoon={tool.comingSoon}
                badge={tool.badge}
                onClick={() => tool.component && setSelectedTool(tool)}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-12 ${theme.text}`}
          >
            <p className="text-xl mb-2">No tools found matching your search.</p>
            <p className={theme.textSecondary}>Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Tools;