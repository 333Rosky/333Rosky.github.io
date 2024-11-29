import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 mb-12">
          {/* Animated lines */}
          <motion.div
            className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-500"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
              translateY: [-20, 0, 20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-500"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
              translateY: [0, 20, -20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-500"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
              translateY: [20, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1,
              ease: "easeInOut",
            }}
          />

          {/* Animated dots */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="text-center space-y-2">
          <motion.p
            className="text-xl font-light tracking-widest text-blue-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LOADING
          </motion.p>
          <motion.p
            className="text-sm tracking-wider text-gray-500"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            PORTFOLIO
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}