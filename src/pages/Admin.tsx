
import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import UsersManagement from '@/components/admin/UsersManagement';
import TeamsManagement from '@/components/admin/TeamsManagement';
import KnowledgeBaseConnections from '@/components/admin/KnowledgeBaseConnections';
import AnalyticsPanel from '@/components/admin/AnalyticsPanel';

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs 
        defaultValue="users" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="connections">Knowledge Base</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-4">
          <UsersManagement />
        </TabsContent>
        
        <TabsContent value="teams" className="mt-4">
          <TeamsManagement />
        </TabsContent>
        
        <TabsContent value="connections" className="mt-4">
          <KnowledgeBaseConnections />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-4">
          <AnalyticsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
