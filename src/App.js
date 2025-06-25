import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import LoadingScreen from './components/LoadingScreen';

import Contact from './components/Contact';

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <div className="min-h-screen bg-black">
        <Header />
        <main>
          <div id="home" className="relative min-h-screen">
            <div className="relative z-10">
              <Hero />
            </div>
          </div>
          <About />
          <Projects />
          <Contact />
        </main>

        <footer className="bg-black border-t border-green-400/30 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 text-green-400 font-mono mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>SYSTEM ONLINE</span>
            </div>
            <p className="text-gray-400 font-mono">© {new Date().getFullYear()} 333Rosky. All rights reserved.</p>
            <p className="text-gray-600 text-sm mt-2 font-mono">[END_OF_TRANSMISSION]</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;