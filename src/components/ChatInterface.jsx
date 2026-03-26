/**
 * @file ChatInterface.jsx
 * @description Componente que gestiona la interfaz de chat.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';

export const ChatInterface = () => {
    const [messages, setMessages] = useState([
      { id: 1, text: "Hola, como puedo ayudarte hoy?", sender: 'bot', timestamp: new Date() }
        ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    const [sessionID] = useState(() => {
          const saved = localStorage.getItem('real_estate_session_id');
          if (saved) return saved;
          const newID = `usr_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
          localStorage.setItem('real_estate_session_id', newID);
          return newID;
    });

    useEffect(() => {
          if (scrollRef.current) {
                  scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
    }, [messages]);

    const handleSendMessage = async (text) => {
          if (!text.trim()) return;
          const userMessage = { id: Date.now(), text, sender: 'user', timestamp: new Date() };
          setMessages(prev => [...prev, userMessage]);
          setInput('');
          setIsLoading(true);

          try {
                  const N8N_ENDPOINT = 'https://prototipos.jpvidaldesign.com/webhook/agenteinmobiliario';
                  const response = await fetch(N8N_ENDPOINT, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ message: text, messageId: sessionID })
                  });
                  const data = await response.json();
                  const botText = Array.isArray(data) ? (data[0].output || data[0].message || "") : (data.output || data.message || "");
                  setMessages(prev => [...prev, { id: Date.now() + 1, text: botText || "He procesado tu busqueda.", sender: 'bot', timestamp: new Date() }]);
          } catch (error) {
                  setMessages(prev => [...prev, { id: Date.now() + 1, text: "Error de conexion.", sender: 'bot', timestamp: new Date() }]);
          } finally {
                  setIsLoading(false);
          }
    };

    return (
          <div className="flex flex-col h-full bg-white shadow-xl border-l border-gray-100">
                <div className="p-4 bg-primary text-white flex items-center gap-3">
                        <Bot size={24} />
                        <div>
                                  <h3 className="text-sm font-bold m-0 uppercase tracking-wider">Asistente Inteligente</h3>h3>
                                  <p className="text-xs opacity-80">En linea ahora</p>p>
                        </div>div>
                </div>div>
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-accent text-white' : 'bg-primary text-white'}`}>
                                                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                                </div>div>
                                                <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-accent text-white' : 'bg-white border border-gray-100'}`}>
                                                  {msg.text}
                                                </div>div>
                                  </div>div>
                      </div>div>
                    ))}
                </div>div>
                <div className="p-4 bg-white border-t border-gray-100">
                        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="relative flex items-center">
                                  <input type="text" placeholder="Escribe..." className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" value={input} onChange={(e) => setInput(e.target.value)} />
                                  <button type="submit" className="absolute right-2 p-2 bg-primary text-white rounded-lg">
                                              <Send size={18} />
                                            <</div>
