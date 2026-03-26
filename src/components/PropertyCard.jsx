/**
 * @file PropertyCard.jsx
 * @description Componente de tarjeta para mostrar detalles individuales de una propiedad.
 * Sigue el estilo lujoso detectado en las imágenes de diseño.
 */

import React from 'react';
import { Bed, Bath, Move, MapPin } from 'lucide-react';

/**
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.property - Objeto con datos de la propiedad.
 * @returns {JSX.Element}
 */
export const PropertyCard = ({ property }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
      {/* Property Image with Badge */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            {property.type}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-primary text-white font-bold px-4 py-2 rounded-lg shadow-lg">
          {property.price}
        </div>
      </div>
      
      {/* Property Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors line-clamp-1">
            {property.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 text-muted text-sm mb-3">
          <MapPin size={14} className="text-primary" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        
        <p className="text-sm text-muted mb-4 line-clamp-2 leading-relaxed h-[2.5rem]">
          {property.description}
        </p>
        
        {/* Features Row */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-muted text-xs font-medium uppercase tracking-tight">
          <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
            <Bed size={16} className="text-primary opacity-70" />
            <span>{property.beds} Hab</span>
          </div>
          <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
            <Bath size={16} className="text-primary opacity-70" />
            <span>{property.baths} Baños</span>
          </div>
          <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
            <Move size={16} className="text-primary opacity-70" />
            <span>{property.area}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
