import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Volume2 } from 'lucide-react';
import { useDeepgram } from '../hooks/useDeepgram';
import { useTTS } from '../hooks/useTTS';
import { sendMessage } from '../services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isRecording, startRecording, stopRecording, transcript } = useDeepgram();
  const { speak, isSpeaking, stopSpeaking } = useTTS();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleSendMessage = async () => {
    const messageText = inputText.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendMessage(userId, messageText);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Speak the response
      speak(response);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto border-x border-black">
      {/* Header */}
      <header className="border-b border-black p-6">
        <h1 className="text-2xl font-bold text-black">Mental Health Companion</h1>
        <p className="text-sm text-gray-600 mt-1">Your AI mental health support</p>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-lg">Start a conversation</p>
            <p className="text-sm mt-2">Type or use voice input to begin</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-black text-white'
                  : 'bg-white border-2 border-black text-black'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
              <span className="text-xs opacity-60 mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-black rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-black p-4 bg-white">
        <div className="flex gap-2 items-end">
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-lg border-2 border-black transition-colors ${
              isRecording
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
            disabled={isLoading}
          >
            {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="p-3 rounded-lg border-2 border-black bg-black text-white hover:bg-gray-800"
            >
              <Volume2 size={24} />
            </button>
          )}

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message or use voice..."
            className="flex-1 p-3 border-2 border-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
            rows={1}
            disabled={isLoading}
          />

          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="p-3 rounded-lg border-2 border-black bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={24} />
          </button>
        </div>

        {isRecording && (
          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-2 text-sm text-black">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Recording...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
