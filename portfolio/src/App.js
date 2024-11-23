import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

function App() {
  const [projectRef, projectInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen relative flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
            R.B.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Romain Bastiani
          </p>
          <div className="flex space-x-6 justify-center mb-12">
            <a href="https://github.com" className="hover:text-yellow-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" className="hover:text-yellow-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:contact@example.com" className="hover:text-yellow-400 transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </motion.div>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10"
        >
          <ChevronDown size={32} className="text-gray-400" />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectRef}
        className="min-h-screen py-20 px-4 md:px-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={projectInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-yellow-400">
            Selected Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProjectCard
              title="Project One"
              description="A revolutionary web application built with React and Node.js"
              tech="React • Node.js • MongoDB"
            />
            <ProjectCard
              title="Project Two"
              description="Mobile-first e-commerce platform with real-time updates"
              tech="Vue.js • Python • Django"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function ProjectCard({ title, description, tech }: {
  title: string;
  description: string;
  tech: string;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 p-8 rounded-lg hover:bg-gray-800 transition-colors"
    >
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <p className="text-sm text-yellow-400">{tech}</p>
    </motion.div>
  );
}

export default App;