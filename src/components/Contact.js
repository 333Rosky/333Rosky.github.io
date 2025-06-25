import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Mail, MessageSquare, Github, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-black relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300ff00' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Terminal-style header */}
          <div className="bg-gray-900 border border-green-400 rounded-lg p-6 mb-8 font-mono max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
              <Terminal className="text-green-400" size={16} />
              <span className="text-gray-400 text-sm">./initiate_contact.sh</span>
            </div>
            <div className="text-left">
              <div className="text-green-400 mb-2">
                <span className="text-gray-500">$</span> establishing secure connection...
              </div>
              <h2 className="text-2xl font-light text-white mb-4">
                <span className="text-green-400">[CONNECTION_READY]</span> Contact Interface
              </h2>
              <div className="text-gray-300">
                Ready to collaborate on quantitative research projects
                <span className="text-green-400 animate-pulse">|</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Professional Contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 border border-green-400/30 rounded-lg p-6 hover:border-green-400 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-400/20 p-3 rounded text-green-400">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-white font-mono">Professional Inquiries</h3>
            </div>
            <p className="text-gray-400 mb-4 font-mono text-sm">
              For collaboration on quantitative research, consulting opportunities, 
              or professional discussions.
            </p>
            <div className="text-green-400 font-mono text-sm">
              <span className="text-gray-500">contact@</span>333rosky<span className="text-gray-500">.dev</span>
            </div>
          </motion.div>

          {/* Research Collaboration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 border border-green-400/30 rounded-lg p-6 hover:border-green-400 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-400/20 p-3 rounded text-green-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-white font-mono">Research & Projects</h3>
            </div>
            <p className="text-gray-400 mb-4 font-mono text-sm">
              Open to discussing quantitative finance research, 
              Python development, and data analysis projects.
            </p>
            <div className="text-green-400 font-mono text-sm">
              <span className="text-gray-500">research@</span>333rosky<span className="text-gray-500">.dev</span>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900 border border-green-400 rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-700">
            <Terminal className="text-green-400" size={16} />
            <h3 className="text-white font-mono">network_links.json</h3>
          </div>
          
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { 
                  name: "GitHub", 
                  icon: <Github className="w-5 h-5" />, 
                  handle: "@333Rosky",
                  status: "ACTIVE",
                  url: "https://github.com/333Rosky"
                },
                { 
                  name: "Twitter/X", 
                  icon: <Twitter className="w-5 h-5" />, 
                  handle: "@333Rosky",
                  status: "ACTIVE",
                  url: "https://x.com/333Rosky"
                },
                { 
                  name: "Research", 
                  icon: <Terminal className="w-5 h-5" />, 
                  handle: "publications",
                  status: "COMING_SOON",
                  url: "#"
                },
                { 
                  name: "Portfolio", 
                  icon: <MessageSquare className="w-5 h-5" />, 
                  handle: "333rosky.dev",
                  status: "LIVE",
                  url: "#"
                }
              ].map((link, index) => (
                              <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black border border-green-400/20 rounded p-4 text-center hover:border-green-400/50 transition-colors"
                >
                  {link.url && link.url !== "#" ? (
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block hover:scale-105 transition-transform"
                    >
                      <div className="flex justify-center mb-2 text-green-400">
                        {link.icon}
                      </div>
                      <div className="text-white text-sm font-mono mb-1">{link.name}</div>
                      <div className="text-gray-400 text-xs font-mono mb-2">{link.handle}</div>
                      <div className={`text-xs font-mono px-2 py-1 rounded ${
                        link.status === 'ACTIVE' || link.status === 'LIVE'
                          ? 'bg-green-400/20 text-green-400'
                          : link.status === 'PROFESSIONAL'
                          ? 'bg-blue-400/20 text-blue-400'
                          : 'bg-yellow-400/20 text-yellow-400'
                      }`}>
                        {link.status}
                      </div>
                    </a>
                  ) : (
                    <>
                      <div className="flex justify-center mb-2 text-green-400">
                        {link.icon}
                      </div>
                      <div className="text-white text-sm font-mono mb-1">{link.name}</div>
                      <div className="text-gray-400 text-xs font-mono mb-2">{link.handle}</div>
                      <div className={`text-xs font-mono px-2 py-1 rounded ${
                        link.status === 'ACTIVE' || link.status === 'LIVE'
                          ? 'bg-green-400/20 text-green-400'
                          : link.status === 'PROFESSIONAL'
                          ? 'bg-blue-400/20 text-blue-400'
                          : 'bg-yellow-400/20 text-yellow-400'
                      }`}>
                        {link.status}
                      </div>
                    </>
                  )}
                </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Status Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-green-400 font-mono text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>STATUS: AVAILABLE FOR COLLABORATION</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}