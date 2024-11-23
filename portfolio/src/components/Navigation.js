import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const links = [
    { path: '/projects', label: 'Projects' },
    { path: '/info', label: 'Info' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' },
    { path: '/copycats', label: 'Copycats' },
  ];

  return (
    <nav className="fixed top-0 left-0 p-12 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="block text-2xl font-light mb-8">
          Romain Basnai
        </Link>
        <p className="text-sm text-zinc-500 mb-8">Developer & Designer</p>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
}

export default Navigation;