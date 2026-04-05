import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Chatbot from '@/components/Chatbot';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-heading font-bold text-white">A&S Engineering Services</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-white hover:text-secondary transition-colors duration-200 font-paragraph ${
                  isActive('/') ? 'text-secondary' : ''
                }`}
              >
                Home
              </Link>
              
              <div className="relative group">
                <button
                  className="flex items-center text-white hover:text-secondary transition-colors duration-200 font-paragraph"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isServicesOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      to="/services"
                      className="block px-4 py-2 text-foreground hover:bg-secondary/10 hover:text-secondary transition-colors"
                    >
                      All Services
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/products"
                className={`text-white hover:text-secondary transition-colors duration-200 font-paragraph ${
                  isActive('/products') ? 'text-secondary' : ''
                }`}
              >
                Products
              </Link>

              <Link
                to="/about"
                className={`text-white hover:text-secondary transition-colors duration-200 font-paragraph ${
                  isActive('/about') ? 'text-secondary' : ''
                }`}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={`text-white hover:text-secondary transition-colors duration-200 font-paragraph ${
                  isActive('/contact') ? 'text-secondary' : ''
                }`}
              >
                Contact
              </Link>

              <Button
                asChild
                className="bg-secondary hover:bg-secondary/90 text-white font-paragraph"
              >
                <Link to="/contact">Get Started</Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden pb-4 space-y-2">
              <Link
                to="/"
                className="block py-2 text-white hover:text-secondary transition-colors font-paragraph"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="block py-2 text-white hover:text-secondary transition-colors font-paragraph"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/products"
                className="block py-2 text-white hover:text-secondary transition-colors font-paragraph"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="block py-2 text-white hover:text-secondary transition-colors font-paragraph"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-white hover:text-secondary transition-colors font-paragraph"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                asChild
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-paragraph mt-2"
              >
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </nav>
          )}
        </div>
      </header>
      <Chatbot />
    </>
  );
}
