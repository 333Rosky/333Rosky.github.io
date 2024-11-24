import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, FileText } from 'lucide-react';

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1 
          className="text-xl font-light tracking-wider text-gray-100"
          whileHover={{ scale: 1.02 }}
        >
          ROMAIN BASTIANI
        </motion.h1>
        <nav className="flex items-center gap-6">
          <a href="#research" className="text-gray-400 hover:text-gray-100 transition-colors">Research</a>
          <a href="#projects" className="text-gray-400 hover:text-gray-100 transition-colors">Projects</a>
          <a href="#publications" className="text-gray-400 hover:text-gray-100 transition-colors">Publications</a>
          <div className="flex items-center gap-4 ml-6">
            <motion.a
              href="https://github.com/hlemonnier/Projet-Quant"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-gray-100"
            >
              <GithubIcon size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-gray-100"
            >
              <LinkedinIcon size={20} />
            </motion.a>
            <motion.a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-gray-100"
            >
              <FileText size={20} />
            </motion.a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}