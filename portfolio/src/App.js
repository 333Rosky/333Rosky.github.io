import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import LoadingScreen from './components/LoadingScreen';
import Research from './components/Research';
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

      <div className="min-h-screen bg-gray-900">
        <Header />
        <main>
          <div className="relative min-h-screen">
            <div className="relative z-10">
              <Hero />
            </div>
          </div>
          <Projects />
          <Research />
          <Contact />
        </main>

        <footer className="bg-gray-800 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Romain Bastiani. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;