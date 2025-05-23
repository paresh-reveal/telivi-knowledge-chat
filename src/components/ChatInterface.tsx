
import { useState, useEffect, useRef } from 'react';
import { Menu, MessageSquare, Plus, Settings, User, History, LogOut, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from '@/components/ChatMessage';
import ProfileModal from '@/components/ProfileModal';
import { cn } from '@/lib/utils';
import LoadingDots from '@/components/LoadingDots';

interface Document {
  title: string;
  author: string;
  lastUpdated: string;
  source: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    supportingDocs?: Document[];
  }>;
}

const ChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    setIsLoading(true);
    let chat = currentChat;
    
    if (!chat) {
      // Create new chat with first message as title
      chat = {
        id: Date.now().toString(),
        title: currentInput.length > 50 ? currentInput.substring(0, 50) + '...' : currentInput,
        messages: []
      };
      setChats(prev => [chat!, ...prev]);
      setCurrentChat(chat);
    }

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: currentInput
    };

    const updatedChat = {
      ...chat,
      messages: [...chat.messages, userMessage]
    };

    setCurrentChat(updatedChat);
    setChats(prev => prev.map(c => c.id === chat!.id ? updatedChat : c));
    setCurrentInput('');

    // Simulate AI response with supporting documents after a delay
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: "Based on your organization's knowledge base, here's what I found. This information comes from multiple sources across your integrated platforms.",
        supportingDocs: [
          {
            title: "MCQ PLUS - Collaborative Confluence Space",
            author: "Paresh Sahoo",
            lastUpdated: "2 days ago",
            source: "Confluence"
          },
          {
            title: "Backend Service Documentation",
            author: "Paresh Sahoo", 
            lastUpdated: "1 week ago",
            source: "Confluence"
          },
          {
            title: "Product Requirements Document (PRD)",
            author: "Paresh Sahoo",
            lastUpdated: "3 days ago",
            source: "SharePoint"
          }
        ]
      };

      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiMessage]
      };

      setCurrentChat(finalChat);
      setChats(prev => prev.map(c => c.id === chat!.id ? finalChat : c));
      setIsLoading(false);
    }, 2000);
  };

  const startNewChat = () => {
    setCurrentChat(null);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="font-semibold">Telivi</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <Button onClick={startNewChat} className="w-full justify-start" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Start New Chat
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-4">
            <div className="space-y-2">
              {chats.map((chat) => (
                <Button
                  key={chat.id}
                  variant={currentChat?.id === chat.id ? "secondary" : "ghost"}
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => {
                    setCurrentChat(chat);
                    setSidebarOpen(false);
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setProfileOpen(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          sidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="font-semibold text-lg">
                {currentChat ? currentChat.title : "What is MCQ PLUS?"}
              </h1>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setProfileOpen(true)}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentChat ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {currentChat.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex ml-14 mt-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <LoadingDots className="text-blue-600" />
                  </div>
                </div>
              )}
              <div ref={messageEndRef} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Welcome to Telivi.ai</h2>
                <p className="text-gray-600 mb-6">How can I help you with your organization's knowledge today?</p>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-2 relative">
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 pr-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!currentInput.trim() || isLoading}
                className="absolute right-0 top-0 h-full rounded-l-none"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
    </div>
  );
};

export default ChatInterface;
