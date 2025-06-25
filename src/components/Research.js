import React from 'react';
import { motion } from 'framer-motion';

export default function Research() {
  return (
    <section id="research" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-light mb-8 text-gray-100">Research Focus</h2>
          <p className="text-gray-400 mb-12 leading-relaxed">
            My research focuses on quantitative methods in financial markets, 
            particularly in areas of market microstructure, algorithmic trading, 
            and systematic risk assessment.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-6"
          >
            <h3 className="text-xl font-medium mb-4 text-gray-100">Current Research</h3>
            <ul className="space-y-3 text-gray-400">
              <li>• Portfolio Optimization through Monte Carlo Simulations</li>
              <li>• Risk Assessment and Management Systems</li>
              <li>• Financial Data Analytics and Modeling</li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-6"
          >
            <h3 className="text-xl font-medium mb-4 text-gray-100">Technical Expertise</h3>
            <ul className="space-y-3 text-gray-400">
              <li>• Python for Financial Analysis</li>
              <li>• Statistical Modeling and Simulation</li>
              <li>• Database Design and Management</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}