import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 text-secondary">A&S Engineering services</h3>
            <p className="text-white/80 font-paragraph text-sm leading-relaxed">
              Delivering innovative engineering solutions with expertise across industries. 
              Your trusted partner for product engineering and manufacturing excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/80 hover:text-secondary transition-colors duration-200 font-paragraph text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-white/80 hover:text-secondary transition-colors duration-200 font-paragraph text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/80 hover:text-secondary transition-colors duration-200 font-paragraph text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/80 hover:text-secondary transition-colors duration-200 font-paragraph text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 text-white">
              Our Services
            </h4>
            <ul className="space-y-2">
              <li className="text-white/80 font-paragraph text-sm">Product Engineering</li>
              <li className="text-white/80 font-paragraph text-sm">Manufacturing Solutions</li>
              <li className="text-white/80 font-paragraph text-sm">Research & Development</li>
              <li className="text-white/80 font-paragraph text-sm">Technical Publications</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 text-white">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-white/80 font-paragraph text-sm">7909455907</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-white/80 font-paragraph text-sm">
                  info@veetechnologies.com
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-white/80 font-paragraph text-sm">
                  United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 font-paragraph text-sm">Copyright © a&sengineeringservices.com 2026 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
