import React from 'react';
import { motion } from 'framer-motion';
// eslint-disable-next-line 
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "Neoma Venture - Portfolio Optimization",
    description: "A sophisticated web platform leveraging Monte Carlo simulations for portfolio optimization. Features investor profiling, real-time analytics, and personalized investment recommendations.",
    tags: ["Python", "Flask", "Monte Carlo", "SQL"],
    github: "https://github.com/hlemonnier/Projet-Quant",
    technologies: ["Python", "Flask", "SQL", "JavaScript"]
  },
  {
    title: "Financial Data Analytics",
    description: "Advanced financial data analysis platform focusing on market trends and investment strategies using modern analytical tools and methodologies.",
    tags: ["Data Analysis", "Python", "Financial Markets"],
    github: "https://github.com/Finance-data-analytics/Financial-Data-Analytics",
    technologies: ["Python", "Data Analysis", "Statistics"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-light mb-12 text-center text-gray-100"
        >
          Research Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <h3 className="text-xl font-medium mb-3 text-gray-100">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-gray-100 transition-colors"
                >
                  <Github size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}