
import { cn } from "@/lib/utils";
import { User, Bot, FileText, Copy, Volume, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Document {
  title: string;
  author: string;
  lastUpdated: string;
  source: string;
  description?: string;
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
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: "Copied to clipboard",
      description: "The message has been copied to your clipboard.",
      duration: 2000,
    });
  };

  const handleListen = () => {
    // This would be implemented with text-to-speech functionality
    toast({
      title: "Text-to-speech",
      description: "Audio playback started.",
      duration: 2000,
    });
  };

  const handleFeedback = (type: 'up' | 'down') => {
    toast({
      title: type === 'up' ? "Feedback received" : "Feedback received",
      description: type === 'up' ? "Thank you for your positive feedback!" : "Thank you for your feedback. We'll work to improve.",
      duration: 2000,
    });
  };

  const handleRegenerate = () => {
    toast({
      title: "Regenerating response",
      description: "Generating a new response...",
      duration: 2000,
    });
  };
  
  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-4">
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
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex">
        <div className="flex max-w-4xl w-full">
          <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <Bot className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="rounded-lg p-5 bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center mb-3">
                <span className="font-semibold text-lg">Telivi Assistant</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-800">{message.content}</p>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2 mt-2">
              <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleListen}>
                <Volume className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleFeedback('up')}>
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleFeedback('down')}>
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleRegenerate}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {hasSupportingDocs && (
        <div className="ml-14">
          <div className="flex items-center mb-3 text-gray-700">
            <FileText className="mr-2 h-4 w-4" />
            <p className="font-medium">Supporting Documents ({message.supportingDocs.length})</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="mr-3 mt-1">
            <FileText className="h-5 w-5 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", getSourceBadgeClass(document.source))}>
                {document.source}
              </span>
            </div>
            <h4 className="text-md font-medium text-gray-900 mb-1">{document.title}</h4>
            {document.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{document.description}</p>
            )}
            <div className="flex flex-col text-xs text-gray-500">
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
