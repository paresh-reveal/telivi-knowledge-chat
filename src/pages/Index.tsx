
import { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return <ChatInterface />;
};

export default Index;
