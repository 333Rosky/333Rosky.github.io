import React from 'react';
import { motion } from 'framer-motion';

export default function RotatingCube() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-40 h-40 perspective-1000">
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Front */}
          <div 
            className="absolute w-full h-full backface-hidden"
            style={{ transform: 'translateZ(80px)' }}
          >
            <div className="w-full h-full border-2 border-blue-500/50 relative">
              {/* Horizontal lines */}
              <div className="absolute top-1/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-2/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-3/4 w-full h-px bg-blue-400/30" />
              {/* Vertical lines */}
              <div className="absolute left-1/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-2/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-3/4 h-full w-px bg-blue-400/30" />
            </div>
          </div>

          {/* Back */}
          <div 
            className="absolute w-full h-full backface-hidden"
            style={{ transform: 'translateZ(-80px) rotateY(180deg)' }}
          >
            <div className="w-full h-full border-2 border-blue-500/50 relative">
              <div className="absolute top-1/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-2/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-3/4 w-full h-px bg-blue-400/30" />
              <div className="absolute left-1/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-2/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-3/4 h-full w-px bg-blue-400/30" />
            </div>
          </div>

          {/* Right */}
          <div 
            className="absolute w-full h-full backface-hidden"
            style={{ transform: 'translateX(80px) rotateY(90deg)' }}
          >
            <div className="w-full h-full border-2 border-blue-500/50 relative">
              <div className="absolute top-1/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-2/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-3/4 w-full h-px bg-blue-400/30" />
              <div className="absolute left-1/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-2/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-3/4 h-full w-px bg-blue-400/30" />
            </div>
          </div>

          {/* Left */}
          <div 
            className="absolute w-full h-full backface-hidden"
            style={{ transform: 'translateX(-80px) rotateY(-90deg)' }}
          >
            <div className="w-full h-full border-2 border-blue-500/50 relative">
              <div className="absolute top-1/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-2/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-3/4 w-full h-px bg-blue-400/30" />
              <div className="absolute left-1/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-2/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-3/4 h-full w-px bg-blue-400/30" />
            </div>
          </div>

          {/* Top */}
          <div 
            className="absolute w-full h-full backface-hidden"
            style={{ transform: 'translateY(-80px) rotateX(90deg)' }}
          >
            <div className="w-full h-full border-2 border-blue-500/50 relative">
              <div className="absolute top-1/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-2/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-3/4 w-full h-px bg-blue-400/30" />
              <div className="absolute left-1/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-2/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-3/4 h-full w-px bg-blue-400/30" />
            </div>
          </div>

          {/* Bottom */}
          <div 
            className="absolute w-full h-full backface-hidden"
            style={{ transform: 'translateY(80px) rotateX(-90deg)' }}
          >
            <div className="w-full h-full border-2 border-blue-500/50 relative">
              <div className="absolute top-1/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-2/4 w-full h-px bg-blue-400/30" />
              <div className="absolute top-3/4 w-full h-px bg-blue-400/30" />
              <div className="absolute left-1/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-2/4 h-full w-px bg-blue-400/30" />
              <div className="absolute left-3/4 h-full w-px bg-blue-400/30" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}