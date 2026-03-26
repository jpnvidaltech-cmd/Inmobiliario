/**
 * @file App.jsx
 * @description Componente raíz de la Single Page Application (SPA).
 * Implementa un Layout Dividido (Split View) con galería de propiedades y chat integrado.
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { PropertyCard } from './components/PropertyCard';
import { ChatInterface } from './components/ChatInterface';
import { PROPERTIES } from './data';
import { MessageCircle, X, Search, Filter } from 'lucide-react';

/**
 * Aplicación principal con Split View.
 * @returns {JSX.Element} Composición de la página principal.
 */
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      
      {/* Panel Izquierdo (66% de ancho en Desktop / Full width en Mobile) */}
      <div className={`flex flex-col h-full w-full lg:w-2/3 border-r border-gray-100 transition-all duration-300`}>
        <Header />
        
        {/* Contenido con su propio scroll interno */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
          
          {/* Hero Section / Mini Hero Section */}
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-accent mb-4 tracking-tighter uppercase">
              Descubre Tu <span className="text-primary italic">Nuevo Hogar</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl leading-relaxed">
              Explora una exclusiva selección de propiedades diseñadas para tu estilo de vida. 
              Viviendas únicas con acabados premium y ubicaciones inmejorables.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-0 z-20">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Busca por ubicación o tipo..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-accent rounded-xl hover:bg-gray-100 transition-colors border border-gray-100 font-semibold text-sm">
                <Filter size={16} />
                <span>Filtros</span>
              </button>
              <button className="btn-primary flex items-center gap-2 font-bold text-sm">
                Buscar
              </button>
            </div>
          </div>

          {/* Property Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 mb-12">
            {PROPERTIES.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Footer information inside scrollable panel */}
          <footer className="py-12 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-accent mb-4">Ubicaciones</h4>
                <ul className="text-sm text-muted space-y-2">
                  <li className="hover:text-primary transition-colors cursor-pointer tracking-wide">Pilar Office Park</li>
                  <li className="hover:text-primary transition-colors cursor-pointer tracking-wide">Paseo de la Bahía, Nordelta</li>
                  <li className="hover:text-primary transition-colors cursor-pointer tracking-wide">Puerto Madero Este</li>
                </ul>
              </div>
              <div className="md:col-span-2 text-right">
                <h4 className="font-bold text-accent mb-4">Suscripción Premium</h4>
                <p className="text-xs text-muted mb-4 opacity-70">Recibe las novedades y propiedades off-market antes que nadie.</p>
                <div className="flex justify-end gap-2">
                  <input 
                    type="email" 
                    placeholder="Tu email..." 
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-bold hover:bg-opacity-90 transition-all">OK</button>
                </div>
              </div>
            </div>
            <p className="mt-12 text-center text-xs text-muted font-medium opacity-40 uppercase tracking-widest">
              © 2026 Viglio Real Estate - All rights reserved
            </p>
          </footer>
        </main>
      </div>

      {/* Panel Derecho (33% Chat en Desktop / Hidden en Mobile con Modal logic) */}
      <div className={`hidden lg:block w-1/3 h-full z-40 transform transition-transform duration-500 overflow-hidden`}>
        <ChatInterface />
      </div>

      {/* Floating Chat Button (For Mobile Views) */}
      <button 
        className={`lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 transform hover:scale-110 active:scale-95 transition-all
          ${isChatOpen ? 'rotate-90' : 'rotate-0'}`}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Mobile Chat View (Overlay) */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-white transition-all duration-300 transform ${isChatOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="h-full pt-4">
          <ChatInterface />
        </div>
      </div>

    </div>
  );
}

export default App;
