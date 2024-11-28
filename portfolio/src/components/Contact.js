import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900">
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
          <motion.a
            href="mailto:romain.bastiani@neoma-bs.fr"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}