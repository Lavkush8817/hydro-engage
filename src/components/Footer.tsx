import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg md:text-xl font-heading font-bold mb-3 md:mb-4 text-secondary">A&S Engineering services</h3>
            <p className="text-white/80 font-paragraph text-xs md:text-sm leading-relaxed">
              Delivering innovative engineering solutions with expertise across industries. Your trusted partner for product engineering and manufacturing excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-heading font-semibold mb-3 md:mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/80 hover:text-secondary transition-colors duration-200 font-paragraph text-xs md:text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-white/80 hover:text-secondary transition-colors duration-200 font-paragraph text-xs md:text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/80 hover:text-secondary transition-colors duration-200 font-paragraph text-xs md:text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/80 hover:text-secondary transition-colors duration-200 font-paragraph text-xs md:text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base md:text-lg font-heading font-semibold mb-3 md:mb-4 text-white">
              Our Services
            </h4>
            <ul className="space-y-1.5 md:space-y-2">
              <li className="text-white/80 font-paragraph text-xs md:text-sm">Product Engineering</li>
              <li className="text-white/80 font-paragraph text-xs md:text-sm">Manufacturing Solutions</li>
              <li className="text-white/80 font-paragraph text-xs md:text-sm">Research & Development</li>
              <li className="text-white/80 font-paragraph text-xs md:text-sm">Technical Publications</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base md:text-lg font-heading font-semibold mb-3 md:mb-4 text-white">
              Contact Us
            </h4>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 md:h-5 md:w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/80 font-paragraph text-xs md:text-sm">+91 7909455907</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/80 font-paragraph text-xs md:text-sm break-words">
                  asengineeringservices41wn@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/80 font-paragraph text-xs md:text-sm">
                  India
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-base md:text-lg font-heading font-semibold mb-3 md:mb-4 text-white">
              Follow Us
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://x.com/services44311"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-secondary transition-colors duration-200 font-paragraph text-xs md:text-sm"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/asengineeringservices41wn/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-secondary transition-colors duration-200 font-paragraph text-xs md:text-sm"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-white/60 font-paragraph text-xs md:text-sm">Copyright © a&sengineeringservices.com 2026 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
