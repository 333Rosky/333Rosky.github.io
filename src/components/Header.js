import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-sm border-b border-green-400/30' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-2xl font-mono text-white flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Terminal size={20} className="text-green-400" />
            <span className="text-green-400 font-bold">333</span>R
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-green-400 transition-colors duration-300 relative group font-mono"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-green-400 border border-green-400/50 rounded hover:bg-green-400/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 bg-black/95 border border-green-400/30 rounded-lg backdrop-blur-sm"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-gray-300 hover:text-green-400 hover:bg-green-400/10 transition-colors font-mono"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}