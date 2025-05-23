
import { User, Bot } from 'lucide-react';
import SupportingDocCard from '@/components/SupportingDocCard';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  supportingDocs?: Array<{
    title: string;
    author: string;
    lastUpdated: string;
    source: string;
  }>;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            message.role === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
          }`}>
            {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
          </div>
        </div>
        
        <div className="flex-1">
          <div className={`rounded-lg p-4 ${
            message.role === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border border-gray-200'
          }`}>
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          
          {message.supportingDocs && message.supportingDocs.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700">Supporting Documents:</p>
              <div className="grid gap-2">
                {message.supportingDocs.map((doc, index) => (
                  <SupportingDocCard key={index} document={doc} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
