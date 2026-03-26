/**
 * @file Header.jsx
 * @description Cabecera minimalista para la página de la inmobiliaria.
 */

import React from 'react';
import { Home, Phone, Mail, Menu, Search } from 'lucide-react';

/**
 * Cabecera con navegación y contacto.
 * @returns {JSX.Element}
 */
export const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      {/* Brand Section */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 rotate-3 transition-transform hover:rotate-0 cursor-pointer">
          JV
        </div>
        <div>
          <h1 className="text-xl font-black text-accent m-0 leading-tight uppercase tracking-tighter">
            Viglio <span className="text-primary">Real Estate</span>
          </h1>
          <p className="text-[10px] text-muted font-bold uppercase tracking-widest -mt-1 opacity-80">Premium Services Since 1998</p>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden lg:flex items-center gap-8">
        {['Inicio', 'Propiedades', 'Sobre Nosotros', 'Servicios'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            className="text-sm font-semibold text-muted hover:text-primary transition-colors relative group py-2"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </nav>

      {/* Contact & Action Section */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Phone size={14} />
            <span>+54 (11) 4567-8901</span>
          </div>
          <div className="flex items-center gap-2 text-muted text-xs font-medium">
            <Mail size={12} />
            <span>info@viglioestate.com</span>
          </div>
        </div>
        <button className="p-2.5 bg-gray-50 text-accent rounded-xl hover:bg-gray-100 transition-colors border border-gray-100 md:hidden">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
};
