import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
    >
      <div className="relative">
        <motion.svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="stroke-blue-500"
        >
          <path
            d="M20 50 L50 20 L80 50 L110 20 L140 50 L170 20"
            fill="none"
            strokeWidth="2"
            className="text-blue-500"
          />
          <motion.path
            d="M20 50 L50 20 L80 50 L110 20 L140 50 L170 20"
            fill="none"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.svg>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 text-gray-400"
        >
          LOADING ECOSYSTEM
        </motion.p>
      </div>
    </motion.div>
  );
}