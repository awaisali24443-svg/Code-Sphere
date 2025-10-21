import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Mail, Github, Linkedin, Send, User, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} pt-24 px-4 pb-12`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-6`}>
            Get in Touch
          </h1>
          <p className={`${theme.textSecondary} text-lg mb-8`}>
            Have questions, feedback, or collaboration ideas? I'd love to hear from you!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-8 shadow-xl`}>
                <h2 className={`${theme.text} text-2xl font-bold mb-6`}>
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className={`${theme.text} font-semibold mb-2 flex items-center gap-2`}>
                      <User size={20} />
                      Developer
                    </h3>
                    <p className={`${theme.textSecondary} text-lg`}>Awais Ali</p>
                  </div>

                  <div>
                    <h3 className={`${theme.text} font-semibold mb-2 flex items-center gap-2`}>
                      <Mail size={20} />
                      Email
                    </h3>
                    <a
                      href="mailto:awais.codesphere@example.com"
                      className={`${theme.textSecondary} hover:${theme.text} transition-colors`}
                    >
                      awais.codesphere@example.com
                    </a>
                  </div>

                  <div>
                    <h3 className={`${theme.text} font-semibold mb-4`}>
                      Connect with Me
                    </h3>
                    <div className="flex gap-4">
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${theme.buttonBg} ${theme.buttonText} p-3 rounded-lg shadow-lg`}
                        aria-label="GitHub Profile"
                      >
                        <Github size={24} />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${theme.buttonBg} ${theme.buttonText} p-3 rounded-lg shadow-lg`}
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin size={24} />
                      </motion.a>
                    </div>
                  </div>

                  <div className={`${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} p-4 rounded-lg`}>
                    <p className="text-sm">
                      💡 Open to collaborations, freelance work, and exciting projects!
                    </p>
                  </div>
                </div>

                <div className={`mt-8 p-4 ${theme.inputBg} border ${theme.inputBorder} rounded-lg flex gap-3`}>
                  <AlertCircle size={20} className={theme.textSecondary} />
                  <p className={`${theme.textSecondary} text-sm`}>
                    This contact form is for demonstration purposes. Messages are not sent to an actual backend.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className={`${theme.cardBg} backdrop-blur-sm border ${theme.cardBorder} rounded-xl p-8 shadow-xl`}>
                <h2 className={`${theme.text} text-2xl font-bold mb-6`}>
                  Send a Message
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle size={64} className={`${theme.text} mx-auto mb-4`} />
                    </motion.div>
                    <p className={`${theme.text} text-xl font-semibold mb-2`}>
                      Message Sent Successfully!
                    </p>
                    <p className={`${theme.textSecondary} text-sm`}>
                      (Demo mode - no actual email sent)
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className={`block ${theme.text} mb-2 font-medium`}>
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full ${theme.inputBg} ${theme.inputText} ${theme.inputPlaceholder} border ${errors.name ? 'border-red-500' : theme.inputBorder} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-current`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block ${theme.text} mb-2 font-medium`}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className={`w-full ${theme.inputBg} ${theme.inputText} ${theme.inputPlaceholder} border ${errors.email ? 'border-red-500' : theme.inputBorder} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-current`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block ${theme.text} mb-2 font-medium`}>
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Your message or inquiry..."
                        className={`w-full ${theme.inputBg} ${theme.inputText} ${theme.inputPlaceholder} border ${errors.message ? 'border-red-500' : theme.inputBorder} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-current resize-none`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={`w-full ${theme.buttonBg} ${theme.buttonText} py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg`}
                    >
                      <Send size={20} />
                      Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;