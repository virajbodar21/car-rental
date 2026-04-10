import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Our Fleet', href: '/cars' },
        { label: 'Pricing', href: '/cars' },
        { label: 'Features', href: '/about' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/about' },
        { label: 'Careers', href: '/about' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/contact' },
        { label: 'Help Center', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-hyper-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-orange p-2">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="text-text-primary font-bold text-lg bg-gradient-to-r from-neon-blue to-neon-orange bg-clip-text text-transparent">
                HYPERDRIVE
              </span>
            </div>
            <p className="text-text-secondary text-sm mb-6">
              Experience premium car rentals at your fingertips.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="text-text-secondary hover:text-neon-blue transition-colors duration-300"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-text-primary font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-text-secondary hover:text-neon-blue transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: Phone, text: '+1 (555) 123-4567' },
                { icon: Mail, text: 'support@hyperdrive.com' },
                { icon: MapPin, text: '123 Premium Lane, NYC' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx} className="flex items-center gap-2 text-text-secondary text-sm hover:text-neon-blue transition-colors duration-300 cursor-pointer">
                    <Icon size={16} className="flex-shrink-0" />
                    <span>{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-secondary text-sm text-center md:text-left">
              © {currentYear} HYPERDRIVE. All rights reserved. Designed with ⚡ for car enthusiasts.
            </p>
            <div className="flex gap-6 text-sm text-text-secondary">
              <a href="#" className="hover:text-neon-blue transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-neon-blue transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-neon-blue transition-colors duration-300">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;