import React from 'react';
import { motion } from 'framer-motion';
import { Github, Terminal, Database, TrendingUp, Zap, Shield } from 'lucide-react';

const projects = [
  {
    title: "Portfolio Risk Engine",
    description: "Risk assessment system using Monte Carlo simulations and factor modeling for portfolio analysis and optimization.",
    tags: ["Python", "Pandas", "NumPy", "Finance"],
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    title: "Market Data Pipeline",
    description: "Data processing pipeline for financial market data with automated workflows and signal detection.",
    tags: ["Python", "SQL", "APIs", "Data Analysis"],
    icon: <Database className="w-5 h-5" />
  },
  {
    title: "Quantitative Models",
    description: "Implementation of quantitative finance models for pricing and risk assessment using Python libraries.",
    tags: ["Python", "SciPy", "Financial Models", "Math"],
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: "Financial Analytics Dashboard",
    description: "Interactive dashboard for financial data visualization and reporting with real-time market insights.",
    tags: ["Python", "Data Viz", "SQL", "Analytics"],
    icon: <Shield className="w-5 h-5" />
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-black relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300ff00' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-light text-white mb-4">Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-2">
            Financial engineering and quantitative analysis projects
          </p>
          <p className="text-green-400 font-mono text-sm">
            More projects coming soon... stay tuned!
          </p>
        </motion.div>

                {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gray-900 border border-green-400 rounded-lg p-12 flex flex-col items-center justify-center text-center">
            <div className="bg-green-400/20 p-6 rounded-full text-green-400 mb-8">
              <Terminal className="w-12 h-12" />
            </div>
            <h3 className="text-4xl font-light text-white mb-6 font-mono">Coming Soon</h3>
            <p className="text-green-400 font-mono text-2xl mb-6">
              Stay Tuned!
            </p>
            <p className="text-gray-400 font-mono text-lg mb-8 max-w-md">
              Quantitative research projects currently in development...
            </p>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-mono">PROJECTS_LOADING</span>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
}