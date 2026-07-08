import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, Plus, Trash2, ArrowLeft, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ChatBubble from '../../components/ChatBubble';
import ScalesOfJustice from '../../components/ScalesOfJustice';
import VoiceWaveform from '../../components/VoiceWaveform';
import Modal from '../../components/Modal';
import { apiService } from '../../services/api';
import { SUGGESTED_PROMPTS } from '../../services/mockData';
import { useAppContext } from '../../context/AppContext';

export default function ChatAssistant() {
  const { chats, setChats } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voiceState, setVoiceState] = useState('idle'); // 'idle' | 'listening' | 'thinking' | 'speaking'
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (text) => {
    const promptText = text || input;
    if (!promptText.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: promptText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await apiService.chat(promptText, history);
      
      const aiMessage = {
        role: 'assistant',
        content: response.content,
        sections: response.sections,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Add to sidebar chat history if it is a new chat
      if (messages.length === 0) {
        const newChat = {
          id: Date.now().toString(),
          title: promptText.length > 30 ? promptText.substring(0, 30) + '...' : promptText,
          date: new Date().toLocaleDateString(),
          messages: [...messages, userMessage, aiMessage]
        };
        setChats(prev => [newChat, ...prev]);
      } else {
        // Update existing chat log
        setChats(prev => prev.map(c => {
          if (c.messages[0].content === messages[0].content) {
            return { ...c, messages: [...c.messages, userMessage, aiMessage] };
          }
          return c;
        }));
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  const loadChat = (chat) => {
    setMessages(chat.messages);
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    setChats(prev => prev.filter(c => c.id !== chatId));
    setMessages([]);
  };

  // Simulate voice assistant conversation loop
  const startVoiceMode = () => {
    setVoiceOpen(true);
    setVoiceState('idle');
  };

  const handleVoiceMicClick = () => {
    if (voiceState === 'idle') {
      setVoiceState('listening');
      // Simulate listening to user for 3 seconds
      setTimeout(() => {
        setVoiceState('thinking');
        // Simulate thinking for 2 seconds
        setTimeout(() => {
          setVoiceState('speaking');
          // Simulate speaking reply for 4 seconds
          setTimeout(() => {
            setVoiceState('idle');
            // Inject a mock voice reply into the message log
            const userMsg = { role: 'user', content: 'Voice query: My landlord refuses deposit return', timestamp: new Date().toISOString() };
            const aiMsg = {
              role: 'assistant',
              content: 'Mock Voice Response: Your landlord is required under Section 11 of the Model Tenancy Act to refund the deposit. Please consult the dashboard cards for detailed procedures.',
              timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, userMsg, aiMsg]);
          }, 4000);
        }, 2000);
      }, 3000);
    } else {
      setVoiceState('idle');
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex border border-slate-200/50 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-900/40 backdrop-blur-md overflow-hidden relative max-w-7xl mx-auto shadow-xl">
      
      {/* Side chat log history */}
      <div className="hidden md:flex flex-col w-64 border-r border-slate-200/50 dark:border-slate-850 bg-slate-50/30 dark:bg-slate-950/20">
        <div className="p-4 border-b border-slate-200/50 dark:border-slate-850">
          <Button variant="outline" size="sm" className="w-full gap-2 border-slate-200 dark:border-slate-800" onClick={handleNewChat}>
            <Plus className="w-4 h-4" />
            <span>New Case Chat</span>
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {chats.length === 0 ? (
            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-6">No past consults found</p>
          ) : (
            chats.map(chat => (
              <button
                key={chat.id}
                onClick={() => loadChat(chat)}
                className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-850 text-xs text-slate-650 dark:text-slate-350 cursor-pointer group"
              >
                <div className="truncate pr-2">
                  <p className="font-semibold truncate">{chat.title}</p>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">{chat.date}</p>
                </div>
                <Trash2
                  className="w-3.5 h-3.5 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  onClick={(e) => deleteChat(chat.id, e)}
                />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main chat window container */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-50/10 dark:bg-slate-950/5">
        
        {/* Messages viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.length === 0 ? (
            /* Suggestion view for new chats */
            <div className="h-full flex flex-col justify-center items-center max-w-2xl mx-auto text-center space-y-8">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-900 flex items-center justify-center border border-blue-800 shadow-xl mb-4">
                  <Sparkles className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-850 dark:text-slate-100">AI Legal Assistant</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm">
                  Powered by a local Gemma model. Describe your grievance or use a suggested prompt below.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {SUGGESTED_PROMPTS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p)}
                    className="glass-card glass-card-hover p-4 border border-slate-200/50 dark:border-slate-850 text-left rounded-xl text-xs font-semibold cursor-pointer w-full text-slate-700 dark:text-slate-300"
                  >
                    "{p}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Message Bubbles list */
            <div className="w-full max-w-4xl mx-auto">
              {messages.map((m, i) => (
                <ChatBubble key={i} message={m} onRegenerate={() => handleSend(m.content)} />
              ))}
              
              {loading && (
                <div className="flex justify-start w-full">
                  <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center border border-blue-800 text-blue-400 flex-shrink-0 mr-4">
                    <Scale className="w-5 h-5 text-emerald-400 animate-pulse" />
                  </div>
                  <Card className="glass-card p-4 max-w-md border border-slate-200 dark:border-slate-800 shadow-md">
                    <ScalesOfJustice />
                  </Card>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Action input bar */}
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-850 bg-white/70 dark:bg-slate-900/30 backdrop-blur-md">
          <div className="max-w-4xl mx-auto flex gap-3">
            <button
              onClick={startVoiceMode}
              title="Voice Assistant Mode"
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                placeholder="Ask Gemma about leases, notices, fines, trademark filings..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/25 text-xs sm:text-sm text-slate-850 dark:text-slate-100 placeholder:text-slate-400"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="absolute right-2 p-2 rounded-lg bg-blue-600 dark:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Mode Dialog */}
      <Modal isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} title="Interactive Voice Mode">
        <VoiceWaveform state={voiceState} onClick={handleVoiceMicClick} />
      </Modal>
    </div>
  );
}
