import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "¡Salve María! Soy San Luis María Grignion de Montfort. Estoy aquí para guiarte en tu camino hacia la consagración total a Jesús por María. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockResponses = [
    "La consagración total a María es el camino más seguro para llegar a Jesús. Como escribí en mi 'Tratado de la Verdadera Devoción': 'Dios Padre reunió todas las aguas y las llamó mar; reunió todas las gracias y las llamó María.'",
    "El Rosario es la oración más poderosa después de la Santa Misa. A través de él, contemplamos los misterios de la vida de Cristo junto a su Madre Santísima.",
    "La humildad es la base de toda virtud. María, siendo la más humilde de todas las criaturas, fue elevada a ser la Madre de Dios. Imitemos su humildad en nuestra vida diaria.",
    "La consagración total significa entregar todo lo que somos y tenemos a María, para que ella nos conduzca a Jesús. Es un acto de amor y confianza total.",
    "Los 33 días de preparación son fundamentales. Cada día nos acerca más a Jesús a través de María. Persevera en la oración y la meditación.",
  ];

  const generateResponse = (userMessage: string): string => {
    // Simple keyword-based responses
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("consagración") ||
      lowerMessage.includes("consagrar")
    ) {
      return mockResponses[0];
    } else if (
      lowerMessage.includes("rosario") ||
      lowerMessage.includes("rezar")
    ) {
      return mockResponses[1];
    } else if (
      lowerMessage.includes("humildad") ||
      lowerMessage.includes("humilde")
    ) {
      return mockResponses[2];
    } else if (
      lowerMessage.includes("total") ||
      lowerMessage.includes("entregar")
    ) {
      return mockResponses[3];
    } else if (
      lowerMessage.includes("33") ||
      lowerMessage.includes("días") ||
      lowerMessage.includes("preparación")
    ) {
      return mockResponses[4];
    } else {
      // Random response for other messages
      return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputMessage),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-white rounded-lg shadow-xl border border-yellow-200 flex flex-col">
          {/* Header */}
          <div className="bg-yellow-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">San Luis de Montfort</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-yellow-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {!message.isUser && (
                      <Bot className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.isUser && (
                      <User className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Bot className="w-4 h-4 text-yellow-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
