import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-black text-white p-8 overflow-hidden">
      {/* Grain effect */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'url("/noise.png")',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Light gradient effect */}
      <div 
        className="fixed top-0 right-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)'
        }}
      />

      {/* Main content */}
      <div className="flex min-h-screen">
        {/* Left side navigation */}
        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed left-8 top-8 flex flex-col"
        >
          <Link to="/" className="text-2xl font-light mb-16">
            Romain Basnai
          </Link>
          
          <div className="space-y-4 text-zinc-400">
            <Link to="/" className="block hover:text-white transition-colors">Home</Link>
            <Link to="/projects" className="block hover:text-white transition-colors">Projects</Link>
            <Link to="/contact" className="block hover:text-white transition-colors">Contact</Link>
          </div>
        </motion.nav>

        {/* Vertical text on left */}
        <div className="fixed left-8 bottom-8 origin-bottom-left -rotate-90 text-zinc-500 tracking-wide text-sm">
          <span>CLIQUER DRAG DENONSPACED</span>
        </div>

        {/* Main content area */}
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-48 mt-24 flex-grow"
        >
          <h1 className="text-6xl font-extralight mb-6">
            Quantitative Analysis<br />
            & Development
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg">
            Exploring financial markets through data-driven approaches and algorithmic strategies. 
            Focused on developing robust quantitative solutions.
          </p>
        </motion.main>

        {/* Right side information */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="fixed right-8 bottom-8 text-right text-zinc-400 text-sm space-y-2"
        >
          <p>Based in France</p>
          <p>Aspiring Quant Engineer</p>
          <p>© 2024 Romain Basnai</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Layout;