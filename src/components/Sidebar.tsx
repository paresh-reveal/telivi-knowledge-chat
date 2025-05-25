
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  Settings,
  LogOut,
  PanelLeft,
  Bot,
  LayoutDashboard,
  Database,
  BarChart3,
  ChevronDown,
  Github,
  FileText,
  Webhook,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MainSidebar = () => {
  const location = useLocation();
  const { toast } = useToast();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out of your account.",
    });
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" data-state="expanded">
        <SidebarHeader className="py-4 px-2">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Telivi.ai</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Chat" isActive={isActive("/")}>
                  <Link to="/">
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Knowledge Base</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/knowledge/confluence">
                      <FileText className="h-4 w-4" />
                      <span>Confluence</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/knowledge/jira">
                      <Webhook className="h-4 w-4" />
                      <span>Jira</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/knowledge/github">
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/knowledge/sharepoint">
                      <Database className="h-4 w-4" />
                      <span>SharePoint</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild onClick={handleLogout}>
                <button className="w-full flex items-center">
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default MainSidebar;
