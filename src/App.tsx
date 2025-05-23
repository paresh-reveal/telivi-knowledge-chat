
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { PanelLeft } from "lucide-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import MainSidebar from "./components/Sidebar";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    // Load IBM Plex Sans font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Apply the font to the body
    document.body.style.fontFamily = "'IBM Plex Sans', sans-serif";
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex h-screen">
            {sidebarVisible && (
              <div className="flex-shrink-0">
                <MainSidebar />
              </div>
            )}
            
            <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarVisible ? 'pl-0' : 'pl-0'}`}>
              <div className="fixed top-4 left-4 z-10">
                <button
                  onClick={() => setSidebarVisible(!sidebarVisible)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <PanelLeft size={20} />
                </button>
              </div>
              
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
