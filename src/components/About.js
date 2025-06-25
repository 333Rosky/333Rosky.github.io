import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Award, Code, BarChart3, Brain, Calculator, Terminal, Shield, Database, Zap, Target, Activity } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Quantitative Analysis",
      description: "Factor models and portfolio optimization using Python",
      files: ["quant_models.py", "portfolio_analysis.py"]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Risk Management",
      description: "Investment risk assessment and VaR modeling",
      files: ["risk_analyzer.py", "var_models.py"]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Analysis",
      description: "Financial data processing with SQL and Python",
      files: ["data_pipeline.py", "sql_queries.sql"]
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Market Research",
      description: "Market data analysis and trend identification",
      files: ["market_analysis.py", "data_viz.py"]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Python Development",
      description: "Financial modeling and automation scripts",
      files: ["trading_tools.py", "financial_calcs.py"]
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Reporting & Automation",
      description: "Automated financial reports and data workflows",
      files: ["report_generator.py", "automation.py"]
    }
  ];

  const capabilities = [
    { type: "PYTHON_ANALYTICS", desc: "Financial data analysis with Python", status: "ACTIVE" },
    { type: "SQL_PROCESSING", desc: "Database queries and data extraction", status: "RUNNING" },
    { type: "RISK_MODELING", desc: "Portfolio risk assessment tools", status: "DEPLOYED" },
    { type: "DATA_AUTOMATION", desc: "Automated reporting workflows", status: "OPERATIONAL" }
  ];

  return (
    <section id="about" className="py-20 bg-black relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300ff00' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
                    <h2 className="text-3xl font-light text-white mb-6">About</h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Quantitative researcher specializing in Python and SQL for financial data analysis.
            Experience in risk management, portfolio optimization, and automated reporting.
            Focus on practical implementation of quantitative models and data-driven solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900 border border-green-400/30 rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-700">
              <Activity className="text-green-400" size={20} />
              <h3 className="text-xl font-semibold text-white font-mono">system_status.log</h3>
            </div>
            
            <div className="space-y-4 font-mono text-sm">
              <div className="text-green-400">
                <span className="text-gray-500">[STATUS]</span> Operational systems online...
              </div>
              <div className="space-y-3">
                {capabilities.map((cap, index) => (
                  <motion.div
                    key={cap.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex justify-between items-center bg-black/50 border border-green-400/20 rounded p-3"
                  >
                    <div>
                      <div className="text-green-400 font-medium">{cap.type}</div>
                      <div className="text-gray-400 text-xs">{cap.desc}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs">{cap.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-green-400 mt-4">
                <span className="text-gray-500">[INFO]</span> All systems operational
              </div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900 border border-green-400/30 rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-700">
              <Database className="text-green-400" size={20} />
              <h3 className="text-xl font-semibold text-white font-mono">tech_arsenal.db</h3>
            </div>
            
            <div className="space-y-4 font-mono text-sm">
              <div className="text-green-400">
                <span className="text-gray-500">$</span> cat stack.config
              </div>
              
                             <div className="grid grid-cols-2 gap-4">
                 {[
                   { category: "CORE", tools: ["Python", "SQL", "Java"] },
                   { category: "DATA", tools: ["Pandas", "NumPy", "Azure API"] },
                   { category: "ML", tools: ["Scikit-Learn", "TensorFlow", "Jupyter"] },
                   { category: "TOOLS", tools: ["Git", "Excel", "Bloomberg"] }
                 ].map((stack, index) => (
                  <div key={stack.category} className="bg-black/50 border border-green-400/20 rounded p-3">
                    <div className="text-green-400 font-medium mb-2 flex items-center gap-2">
                      <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                      {stack.category}
                    </div>
                    <div className="space-y-1">
                      {stack.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="text-gray-300 text-xs">
                          └── {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-green-400">
                <span className="text-gray-500">[OK]</span> Arsenal loaded successfully
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Modules */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gray-900 border border-green-400 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-700">
              <Terminal className="text-green-400" size={20} />
              <h3 className="text-xl font-semibold text-white font-mono">ls /core_modules/</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="bg-black border border-green-400/30 rounded-lg p-4 hover:border-green-400 transition-colors group"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-green-400/20 p-2 rounded text-green-400 mr-3">
                      {skill.icon}
                    </div>
                    <h4 className="text-white font-mono text-sm">{skill.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 font-mono">{skill.description}</p>
                  <div className="space-y-1">
                    {skill.files.map((file, fileIndex) => (
                      <div key={fileIndex} className="text-green-400 text-xs font-mono flex items-center gap-2">
                        <span className="text-gray-500">└──</span>
                        {file}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        
      </div>
    </section>
  );
} 