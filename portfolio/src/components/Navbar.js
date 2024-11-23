import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-extralight">
            Romain Bastiai
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-zinc-400 transition-colors">Projects</Link>
            <Link to="/contact" className="hover:text-zinc-400 transition-colors">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-zinc-900">
            <Link to="/" className="block px-3 py-2 hover:bg-zinc-800 rounded-md" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/projects" className="block px-3 py-2 hover:bg-zinc-800 rounded-md" onClick={() => setIsOpen(false)}>
              Projects
            </Link>
            <Link to="/contact" className="block px-3 py-2 hover:bg-zinc-800 rounded-md" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;