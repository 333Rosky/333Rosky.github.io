import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import LoadingScreen from './components/LoadingScreen';

function App() {
 const [loading, setLoading] = useState(true);

 useEffect(() => {
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
         
         {/* Research Section */}
         <section id="research" className="py-20 bg-gray-800">
           <div className="max-w-6xl mx-auto px-4">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="max-w-3xl mx-auto text-center"
             >
               <h2 className="text-3xl font-light mb-8 text-gray-100">Research Focus</h2>
               <p className="text-gray-400 mb-12 leading-relaxed">
                 My research focuses on quantitative methods in financial markets, 
                 particularly in areas of market microstructure, algorithmic trading, 
                 and systematic risk assessment.
               </p>
             </motion.div>
             
             <div className="grid md:grid-cols-2 gap-8">
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="card p-6"
               >
                 <h3 className="text-xl font-medium mb-4 text-gray-100">Current Research</h3>
                 <ul className="space-y-3 text-gray-400">
                   <li>• Portfolio Optimization through Monte Carlo Simulations</li>
                   <li>• Risk Assessment and Management Systems</li>
                   <li>• Financial Data Analytics and Modeling</li>
                 </ul>
               </motion.div>
               
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="card p-6"
               >
                 <h3 className="text-xl font-medium mb-4 text-gray-100">Technical Expertise</h3>
                 <ul className="space-y-3 text-gray-400">
                   <li>• Python for Financial Analysis</li>
                   <li>• Statistical Modeling and Simulation</li>
                   <li>• Database Design and Management</li>
                 </ul>
               </motion.div>
             </div>
           </div>
         </section>

         {/* Contact Section */}
         <section className="py-20 bg-gray-900">
           <div className="max-w-4xl mx-auto px-4 text-center">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
               <h2 className="text-3xl font-light mb-8 text-gray-100">Get in Touch</h2>
               <p className="text-gray-400 mb-8">
                 Interested in collaboration or have questions about my research? 
                 Feel free to reach out.
               </p>
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
               >
                 Contact Me
               </motion.button>
             </motion.div>
           </div>
         </section>
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