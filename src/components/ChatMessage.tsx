
import { cn } from "@/lib/utils";
import { User, Bot, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Document {
  title: string;
  author: string;
  lastUpdated: string;
  source: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  supportingDocs?: Document[];
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  // Only render supporting documents section for AI messages
  const hasSupportingDocs = message.role === 'assistant' && message.supportingDocs && message.supportingDocs.length > 0;
  
  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="flex max-w-3xl flex-row-reverse">
          <div className="flex-shrink-0 ml-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white">
              <User className="h-4 w-4" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="rounded-lg p-4 bg-blue-600 text-white">
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex">
        <div className="flex max-w-3xl">
          <div className="flex-shrink-0 mr-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <Bot className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="rounded-lg p-4 bg-white border border-gray-200">
              <div className="flex items-center mb-3">
                <span className="font-semibold text-lg">Telivi Assistant</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-800">{message.content}</p>
            </div>
          </div>
        </div>
      </div>
      
      {hasSupportingDocs && (
        <div className="ml-14">
          <div className="flex items-center mb-2 text-gray-700">
            <FileText className="mr-2 h-4 w-4" />
            <p className="font-medium">Supporting Documents ({message.supportingDocs.length})</p>
          </div>
          <div className="grid gap-3">
            {message.supportingDocs.map((doc, index) => (
              <SupportingDocCard key={index} document={doc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SupportingDocCard = ({ document }: { document: Document }) => {
  // Create a component for the source tag with appropriate background color based on source
  const getSourceBadgeClass = (source: string) => {
    switch(source.toLowerCase()) {
      case 'confluence': return 'bg-blue-100 text-blue-800';
      case 'jira': return 'bg-purple-100 text-purple-800';
      case 'sharepoint': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", getSourceBadgeClass(document.source))}>
                {document.source}
              </span>
            </div>
            <h4 className="text-md font-medium text-gray-900 mb-1">{document.title}</h4>
            <div className="flex flex-col text-xs text-gray-600">
              <span>Author: {document.author}</span>
              <span>Last modified: {document.lastUpdated}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatMessage;
