
import { useState } from 'react';
import { X, User, Palette, MessageSquare, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileModal = ({ open, onOpenChange }: ProfileModalProps) => {
  const [theme, setTheme] = useState('light');
  const [role] = useState('Admin');
  const [aiPrompt, setAiPrompt] = useState('You are a helpful AI assistant with access to organizational knowledge.');
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Settings</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <div>
              <h3 className="font-medium">Osama</h3>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium">
              <Shield className="h-4 w-4" />
              <span>Role</span>
            </label>
            <Select value={role} disabled>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Maintainer">Maintainer</SelectItem>
                <SelectItem value="Member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium">
              <Palette className="h-4 w-4" />
              <span>Theme</span>
            </label>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
          </div>

          {/* AI Prompt Customization */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium">
              <MessageSquare className="h-4 w-4" />
              <span>Your AI Prompt</span>
            </label>
            <Textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Customize how the AI should behave..."
              className="min-h-[100px]"
            />
          </div>

          {/* Personalization */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Personalization</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Smart Suggestions</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-save Chats</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                <Switch />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
