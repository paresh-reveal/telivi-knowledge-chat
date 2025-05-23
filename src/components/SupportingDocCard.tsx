
import { FileText, Calendar, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Document {
  title: string;
  author: string;
  lastUpdated: string;
  source: string;
}

interface SupportingDocCardProps {
  document: Document;
}

const SupportingDocCard = ({ document }: SupportingDocCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-3">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 truncate">{document.title}</h4>
            <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>Author: {document.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Last modified: {document.lastUpdated}</span>
              </div>
            </div>
            <div className="mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {document.source}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportingDocCard;
