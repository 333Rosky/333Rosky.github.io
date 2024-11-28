import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import RotatingCube from './RotatingCube';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 pt-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12">
            <RotatingCube />
          </div>
          <h1 className="text-5xl font-light mb-6 tracking-tight text-gray-100">
            Quantitative Research & Financial Analysis
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Exploring the intersection of mathematics, finance, and technology
            through rigorous quantitative analysis and innovative research methodologies.
          </p>
          <div className="flex justify-center gap-4">
            <motion.a
              href="#research"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Research
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-gray-600 rounded-lg hover:border-gray-500 hover:bg-gray-800 transition-colors"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={24} className="text-gray-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}