import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, X, Send, Sparkles, Minimize2 } from 'lucide-react';

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'assistant',
    content: "Hi! I'm your AI grant assistant. I can help you with finding grants, writing applications, understanding requirements, or answering questions about the grant process. How can I help you today?",
    timestamp: new Date()
  }
];

export function AIAssistant({ isOpen, onToggle }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your project description, I've identified 3 grants with high match scores. The Tech Innovation Fund has a 95% match and offers up to $250,000. Would you like me to explain why it's a good fit?",
        "I can help you strengthen that section. Here are three key points to include: 1) Specific measurable outcomes, 2) Timeline with milestones, 3) Evaluation methods. Would you like me to draft an example?",
        "Great question! For the budget breakdown, you'll need to include: Personnel costs (salaries, benefits), Equipment and supplies, Travel expenses, Indirect costs. I can help you create a detailed budget template.",
        "The deadline is December 15, 2025. You have 22 days remaining. Based on your current progress (67% complete), you're on track to finish 5 days before the deadline. Would you like tips on prioritizing the remaining sections?"
      ];
      
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedPrompts = [
    "Help me write an executive summary",
    "What grants match my nonprofit?",
    "Review my budget section",
    "Explain eligibility requirements"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group z-50"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col">
      <Card className={`bg-white shadow-2xl transition-all ${
        isMinimized ? 'w-80' : 'w-96 h-[600px]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm">AI Assistant</div>
              <div className="text-xs text-blue-100">Always here to help</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onToggle}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[420px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    <div className="text-sm">{message.content}</div>
                    <div
                      className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="text-xs text-slate-600 mb-2">Try asking:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.slice(0, 2).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setInputValue(prompt)}
                      className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </>
        )}

        {isMinimized && (
          <div className="p-4 text-center">
            <button
              onClick={() => setIsMinimized(false)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Click to expand
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
