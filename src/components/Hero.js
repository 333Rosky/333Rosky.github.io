import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal } from 'lucide-react';

export default function Hero() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const fullText = "> Quantitative Researcher";
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typing);
      }
    }, 100);
    
    return () => clearInterval(typing);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Subtle background effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff00' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zM0 30c0-16.569 13.431-30 30-30v60C13.431 60 0 46.569 0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Terminal Style */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:text-left text-center"
          >
            {/* Terminal Window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-gray-900 border border-green-400 rounded-lg p-6 mb-8 font-mono shadow-2xl shadow-green-400/10"
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm ml-4">terminal@333rosky:~</div>
              </div>
              
              {/* Terminal Content */}
              <div className="space-y-2">
                <div className="text-green-400">
                  <span className="text-gray-500">$</span> whoami
                </div>
                <motion.h1 
                  className="text-2xl lg:text-4xl font-light text-white mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <span className="text-green-400 font-bold">333</span>Rosky
                </motion.h1>
                
                <div className="text-green-400 mt-4">
                  <span className="text-gray-500">$</span> cat role.txt
                </div>
                <motion.div 
                  className="text-gray-300 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  {text}
                  {isTyping && <span className="animate-pulse text-green-400">|</span>}
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-green-600 text-black px-8 py-3 rounded-lg hover:bg-green-500 transition-all duration-300 flex items-center justify-center gap-2 font-semibold border border-green-400"
              >
                <Terminal size={18} />
                View Projects
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-green-400 text-green-400 px-8 py-3 rounded-lg hover:bg-green-400 hover:text-black transition-all duration-300 flex items-center justify-center font-mono"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Photo with Tech Frame */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Tech Frame */}
              <motion.div
                className="relative w-80 h-80"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Outer tech border */}
                <div className="absolute inset-0 border-2 border-green-400 rounded-lg bg-black/20 backdrop-blur-sm">
                  {/* Corner indicators */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-green-400"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-green-400"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-green-400"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
                </div>
                
                {/* Profile Photo */}
                <div className="absolute inset-4 rounded-lg overflow-hidden">
                  <img
                    src="/profile-photo.jpg"
                    alt="333Rosky"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='288' viewBox='0 0 288 288'%3E%3Crect width='288' height='288' fill='%23111111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='monospace' font-size='16' fill='%2300ff00'%3E333ROSKY%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer text-green-400"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}