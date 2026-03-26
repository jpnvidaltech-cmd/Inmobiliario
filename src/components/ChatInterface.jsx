/**
 * @file ChatInterface.jsx
 * @description Componente que gestiona la interfaz de chat de altura completa.
 * Incluye un estado para los mensajes y una función para enviar mensajes a un endpoint de n8n.
 * 
 * @example
 * <ChatInterface />
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';

/**
 * Componente principal de Chat.
 * @returns {JSX.Element} El contenedor del chat con entrada de texto y lista de mensajes.
 */
export const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola, ¿en qué puedo ayudarte hoy con tu búsqueda de propiedad?", sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  
  // Generar o recuperar un ID único de sesión para identificar al usuario en n8n
  const [sessionID] = useState(() => {
    const saved = localStorage.getItem('real_estate_session_id');
    if (saved) return saved;
    const newID = `usr_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
    localStorage.setItem('real_estate_session_id', newID);
    return newID;
  });

  /**
   * Asegura que el scroll se mantenga en el último mensaje recibido o enviado.
   */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  /**
   * Envía un mensaje al endpoint de n8n y actualiza el estado local.
   * @param {string} text - El texto del mensaje que el usuario desea enviar.
   */
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Agregar mensaje del usuario a la lista local
    const userMessage = { id: Date.now(), text, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // URL del Webhook de n8n proporcionada por el usuario
      const N8N_ENDPOINT = 'https://prototipos.jpvidaldesign.com/webhook/agenteinmobiliario';
      
      const response = await fetch(N8N_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: text, 
          messageId: sessionID // Identificador único por chat/usuario solicitado
        }),
      });

      if (!response.ok) throw new Error('Fallo en la conexión con el servidor');

      const data = await response.json();
      
      /**
       * Procesamiento de la respuesta de n8n.
       * Priorizamos el campo 'output' para el texto y 'Foto' para la imagen.
       */
      let botText = "";
      let botPhoto = null;

      if (Array.isArray(data) && data.length > 0) {
        botText = data[0].output || data[0].message || data[0].response || "";
        botPhoto = data[0].Foto || null;
      } else {
        botText = data.output || data.message || data.response || "";
        botPhoto = data.Foto || null;
      }

      const botResponse = { 
        id: Date.now() + 1, 
        text: botText || "He procesado tu búsqueda de propiedad.", 
        imageUrl: botPhoto, // Guardamos la URL de la foto si existe
        sender: 'bot', 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      const errorMessage = { 
        id: Date.now() + 1, 
        text: "Hubo un problema al contactar con el asistente. Por favor, verifica tu conexión o intenta nuevamente.", 
        sender: 'bot', 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white bg-opacity-95 shadow-xl border-l border-gray-100">
      {/* Chat Header */}
      <div className="p-4 bg-primary text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <Bot size={24} />
        </div>
        <div>
          <h3 className="text-sm font-bold m-0 uppercase tracking-wider">Asistente Inteligente</h3>
          <p className="text-xs opacity-80">En línea ahora</p>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-accent text-white' : 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20'}`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm ${
                msg.sender === 'user' 
                  ? 'bg-accent text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 shadow-sm rounded-tl-none text-text leading-relaxed'
              }`}>
                {/* 
                  Formatear el mensaje: si es del bot, permitimos HTML básico (n8n),
                  si es del usuario lo tratamos como texto con saltos de línea.
                */}
                {msg.sender === 'bot' ? (
                  <>
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: msg.text
                          .replace(/\n/g, '<br />') // Convertir saltos de línea
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negritas en Markdown
                          .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="mt-3 mb-3 rounded-lg w-full h-auto shadow-sm border border-gray-100 hover:scale-[1.02] transition-transform duration-300" />') // Soporte para imágenes en Markdown
                      }} 
                    />
                    {msg.imageUrl && (
                      <div className="mt-3 overflow-hidden rounded-lg shadow-sm border border-gray-100 bg-gray-50">
                        <img 
                          src={msg.imageUrl} 
                          alt="Vista de la Propiedad" 
                          className="w-full h-auto max-h-60 object-cover hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100">
              <Loader2 size={16} className="animate-spin text-primary" />
              <span className="text-xs text-muted italic">Escribiendo...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }}
          className="relative flex items-center"
        >
          <input 
            type="text" 
            placeholder="Escribe tu consulta..."
            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-2 p-2 bg-primary text-white rounded-lg transition-transform active:scale-90 disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[10px] text-center text-muted mt-2 opacity-60">Sujeto a términos y condiciones de privacidad.</p>
      </div>
    </div>
  );
};
