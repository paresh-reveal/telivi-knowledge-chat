
import { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import UsersManagement from '@/components/admin/UsersManagement';
import TeamsManagement from '@/components/admin/TeamsManagement';
import KnowledgeBaseConnections from '@/components/admin/KnowledgeBaseConnections';
import AnalyticsPanel from '@/components/admin/AnalyticsPanel';

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your organization's users, teams, and settings</p>
        </div>
        <Badge variant="outline" className="self-start md:self-auto px-3 py-1 text-sm">
          Admin Access
        </Badge>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-0">
          <Tabs 
            defaultValue="users" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start px-4 pt-2 rounded-none border-b border-border">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="connections">Knowledge Base</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="users" className="mt-0">
                <UsersManagement />
              </TabsContent>
              
              <TabsContent value="teams" className="mt-0">
                <TeamsManagement />
              </TabsContent>
              
              <TabsContent value="connections" className="mt-0">
                <KnowledgeBaseConnections />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <AnalyticsPanel />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
