
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Check, Zap, FileText, GitBranch, Webhook, ExternalLink } from "lucide-react";

// Mock connection data
interface Connection {
  id: string;
  name: string;
  type: "confluence" | "jira" | "github" | "sharepoint" | "other";
  status: "active" | "inactive" | "error";
  lastSync: string;
  docsIndexed: number;
  authType: "oauth" | "token" | "basic";
}

const initialConnections: Connection[] = [
  { 
    id: "1", 
    name: "Company Confluence", 
    type: "confluence", 
    status: "active", 
    lastSync: "2023-05-22 14:30",
    docsIndexed: 458,
    authType: "oauth"
  },
  { 
    id: "2", 
    name: "Engineering Jira", 
    type: "jira", 
    status: "active", 
    lastSync: "2023-05-22 10:15",
    docsIndexed: 237,
    authType: "oauth"
  },
  { 
    id: "3", 
    name: "Product Development", 
    type: "github", 
    status: "inactive", 
    lastSync: "2023-05-20 09:45",
    docsIndexed: 0,
    authType: "token"
  },
  { 
    id: "4", 
    name: "Corporate SharePoint", 
    type: "sharepoint", 
    status: "error", 
    lastSync: "2023-05-21 16:20",
    docsIndexed: 122,
    authType: "oauth"
  }
];

const connectionTypes = [
  { id: "confluence", name: "Confluence", icon: FileText },
  { id: "jira", name: "Jira", icon: Webhook },
  { id: "github", name: "GitHub", icon: GitBranch },
  { id: "sharepoint", name: "SharePoint", icon: FileText },
  { id: "other", name: "Other", icon: Zap }
];

const KnowledgeBaseConnections = () => {
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [isAddConnectionDialogOpen, setIsAddConnectionDialogOpen] = useState(false);
  const [selectedConnectionType, setSelectedConnectionType] = useState<string | null>(null);

  const toggleConnectionStatus = (id: string) => {
    setConnections(connections.map(conn => {
      if (conn.id === id) {
        const newStatus = conn.status === 'active' ? 'inactive' : 'active';
        return { ...conn, status: newStatus };
      }
      return conn;
    }));
    
    const conn = connections.find(c => c.id === id);
    const newStatus = conn?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `Connection ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
      description: `The connection has been ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.`,
    });
  };

  const handleSyncNow = (id: string) => {
    toast({
      title: "Sync Started",
      description: "The knowledge base synchronization has started. This may take a few minutes.",
    });
  };

  const handleRemoveConnection = (id: string) => {
    setConnections(connections.filter(conn => conn.id !== id));
    toast({
      title: "Connection Removed",
      description: "The knowledge base connection has been removed successfully.",
    });
  };

  const getConnectionIcon = (type: Connection['type']) => {
    const connectionType = connectionTypes.find(c => c.id === type);
    if (!connectionType) return Zap;
    return connectionType.icon;
  };
  
  const getStatusBadgeClass = (status: Connection['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">Knowledge Base Connections</h2>
        
        <Button onClick={() => setIsAddConnectionDialogOpen(true)}>
          Add Connection
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connections.map((connection) => {
          const Icon = getConnectionIcon(connection.type);
          
          return (
            <Card key={connection.id} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle>{connection.name}</CardTitle>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getStatusBadgeClass(connection.status)
                  }`}>
                    {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                  </span>
                </div>
                <CardDescription>
                  {connectionTypes.find(c => c.id === connection.type)?.name} • 
                  Last synced: {connection.lastSync}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Documents indexed:</span>
                    <span className="font-medium">{connection.docsIndexed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Authentication:</span>
                    <span className="font-medium">{connection.authType.toUpperCase()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center">
                  <Switch
                    checked={connection.status === 'active'}
                    onCheckedChange={() => toggleConnectionStatus(connection.id)}
                  />
                  <span className="ml-2 text-sm">
                    {connection.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSyncNow(connection.id)}
                    disabled={connection.status !== 'active'}
                  >
                    Sync Now
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleRemoveConnection(connection.id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
        
        {/* Empty state card */}
        {connections.length === 0 && (
          <Card className="col-span-full border-dashed border-2 border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Zap className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No connections yet</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Connect your knowledge sources to start indexing documents for your AI assistant.
              </p>
              <Button onClick={() => setIsAddConnectionDialogOpen(true)}>
                Add Connection
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Add Connection Dialog */}
      <Dialog open={isAddConnectionDialogOpen} onOpenChange={setIsAddConnectionDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Knowledge Base</DialogTitle>
            <DialogDescription>
              Connect your organization's knowledge sources to enhance AI responses.
            </DialogDescription>
          </DialogHeader>
          
          {!selectedConnectionType ? (
            <div className="grid grid-cols-1 gap-4 py-4">
              {connectionTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outline"
                  className="flex justify-start items-center gap-3 h-16 px-4"
                  onClick={() => setSelectedConnectionType(type.id)}
                >
                  <div className="p-2 rounded-md bg-primary/10">
                    <type.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Connect to {type.name} knowledge base
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = connectionTypes.find(t => t.id === selectedConnectionType)?.icon || Zap;
                    return <Icon className="h-5 w-5 text-primary" />;
                  })()}
                  <h4 className="font-medium">
                    Connect to {connectionTypes.find(t => t.id === selectedConnectionType)?.name}
                  </h4>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="connection-name">Connection Name</Label>
                  <Input
                    id="connection-name"
                    placeholder="E.g., Engineering Confluence"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="connection-url">URL</Label>
                  <Input
                    id="connection-url"
                    placeholder="https://your-instance.atlassian.net"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Authentication Method</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Check className="mr-2 h-4 w-4" />
                      OAuth 2.0
                    </Button>
                    <Button variant="outline" className="justify-start text-muted-foreground">
                      API Token
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sync schedule</span>
                  <span className="text-sm text-muted-foreground">Daily (default)</span>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedConnectionType(null)}
                  className="sm:mr-auto"
                >
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsAddConnectionDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    setIsAddConnectionDialogOpen(false);
                    toast({
                      title: "Connection Added",
                      description: "The knowledge base connection has been added successfully.",
                    });
                  }}>
                    Connect
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KnowledgeBaseConnections;
