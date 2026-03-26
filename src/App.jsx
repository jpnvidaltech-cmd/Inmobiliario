/**
 * @file App.jsx
  * @description Componente raiz de la Single Page Application (SPA).
   */

   import React, { useState } from 'react';
   import { Header } from './components/Header';
   import { PropertyCard } from './components/PropertyCard';
   import { ChatInterface } from './components/ChatInterface';
   import { PROPERTIES } from './data';
   import { MessageCircle, X, Search, Filter } from 'lucide-react';

   function App() {
     const [isChatOpen, setIsChatOpen] = useState(false);

       return (
           <div className="flex h-screen bg-background overflow-hidden relative">
                 <div className="flex flex-col h-full w-full lg:w-2/3 border-r border-gray-100 transition-all duration-300">
                         <Header />
                                 <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
                                           <div className="mb-12">
                                                       <h2 className="text-4xl lg:text-5xl font-black text-accent mb-4 tracking-tighter uppercase">
                                                                     Descubre Tu <span className="text-primary italic">Nuevo Hogar</span>
                                                                                 </h2>
                                                                                             <p className="text-muted text-lg max-w-2xl leading-relaxed">
                                                                                                           Explora una exclusiva seleccion de propiedades disenadas para tu estilo de vida. 
                                                                                                                       </p>
                                                                                                                                 </div>
                                                                                                                                           <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-0 z-20">
                                                                                                                                                       <div className="flex-1 relative">
                                                                                                                                                                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                                                                                                                                                                   <input type="text" placeholder="Busca por ubicacion..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none" />
                                                                                                                                                                                               </div>
                                                                                                                                                                                                         </div>
                                                                                                                                                                                                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                                                                                                                                                                                                               {PROPERTIES.map((property) => (
                                                                                                                                                                                                                                             <PropertyCard key={property.id} property={property} />
                                                                                                                                                                                                                                                         ))}
                                                                                                                                                                                                                                                                   </div>
                                                                                                                                                                                                                                                                           </main>
                                                                                                                                                                                                                                                                                 </div>
                                                                                                                                                                                                                                                                                       <div className={`hidden lg:block w-1/3 h-full z-40`}>
                                                                                                                                                                                                                                                                                               <ChatInterface />
                                                                                                                                                                                                                                                                                                     </div>
                                                                                                                                                                                                                                                                                                         </div>
                                                                                                                                                                                                                                                                                                           );
                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                           export default App;
