
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Plus, Search, Trash, Edit, UserCog } from "lucide-react";

// Mock user data
interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Maintainer" | "Member";
  isActive: boolean;
  teams: string[];
  lastLogin: string;
}

const initialUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@telivi.ai", role: "Admin", isActive: true, teams: ["Dev Team"], lastLogin: "2023-05-22 14:30" },
  { id: "2", name: "Jane Smith", email: "jane@telivi.ai", role: "Maintainer", isActive: true, teams: ["Sales Team"], lastLogin: "2023-05-21 09:15" },
  { id: "3", name: "Mark Wilson", email: "mark@telivi.ai", role: "Member", isActive: false, teams: ["Interns"], lastLogin: "2023-05-20 16:45" },
  { id: "4", name: "Sarah Johnson", email: "sarah@telivi.ai", role: "Member", isActive: true, teams: ["Marketing Team"], lastLogin: "2023-05-22 11:20" },
  { id: "5", name: "Michael Brown", email: "michael@telivi.ai", role: "Maintainer", isActive: true, teams: ["CXO"], lastLogin: "2023-05-21 13:10" },
];

const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Form values for add/edit
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    role: "Member" as User["role"],
    isActive: true,
    teams: [] as string[]
  });

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setFormValues({
      name: "",
      email: "",
      role: "Member",
      isActive: true,
      teams: []
    });
    setIsAddUserDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setFormValues({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      teams: user.teams
    });
    setIsEditUserDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "The user has been successfully removed.",
    });
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive } 
        : user
    ));
    
    const userToUpdate = users.find(u => u.id === userId);
    const newStatus = userToUpdate ? !userToUpdate.isActive : false;
    
    toast({
      title: `User ${newStatus ? 'Activated' : 'Deactivated'}`,
      description: `The user has been ${newStatus ? 'activated' : 'deactivated'} successfully.`,
    });
  };

  const saveUser = (isNew: boolean) => {
    if (isNew) {
      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        name: formValues.name,
        email: formValues.email,
        role: formValues.role,
        isActive: formValues.isActive,
        teams: formValues.teams,
        lastLogin: "Never"
      };
      
      setUsers([...users, newUser]);
      setIsAddUserDialogOpen(false);
      
      toast({
        title: "User Created",
        description: "New user has been added successfully.",
      });
    } else if (currentUser) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === currentUser.id 
          ? { 
              ...user, 
              name: formValues.name,
              email: formValues.email,
              role: formValues.role,
              isActive: formValues.isActive,
              teams: formValues.teams
            } 
          : user
      ));
      
      setIsEditUserDialogOpen(false);
      
      toast({
        title: "User Updated",
        description: "User details have been updated successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={handleAddUser}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "Admin" ? "bg-purple-100 text-purple-800" :
                      user.role === "Maintainer" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.teams.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {user.teams.map(team => (
                          <span key={team} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100">
                            {team}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "No teams"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Switch
                        checked={user.isActive}
                        onCheckedChange={() => handleToggleUserStatus(user.id)}
                      />
                      <span className="ml-2 text-sm">
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No users found. Try adjusting your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. The user will receive an email invitation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formValues.name}
                onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formValues.email}
                onChange={(e) => setFormValues({...formValues, email: e.target.value})}
                placeholder="john@telivi.ai"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formValues.role}
                onValueChange={(value: any) => setFormValues({...formValues, role: value})}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Maintainer">Maintainer</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="teams">Teams</Label>
              <Select>
                <SelectTrigger id="teams">
                  <SelectValue placeholder="Select teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dev Team">Dev Team</SelectItem>
                  <SelectItem value="Sales Team">Sales Team</SelectItem>
                  <SelectItem value="Marketing Team">Marketing Team</SelectItem>
                  <SelectItem value="CXO">CXO</SelectItem>
                  <SelectItem value="Interns">Interns</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground mt-1">
                Note: Multiple team selection will be implemented in the next version.
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="active"
                checked={formValues.isActive}
                onCheckedChange={(checked) => setFormValues({...formValues, isActive: checked})}
              />
              <Label htmlFor="active">Active account</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => saveUser(true)}>
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user account details and permissions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formValues.name}
                onChange={(e) => setFormValues({...formValues, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formValues.email}
                onChange={(e) => setFormValues({...formValues, email: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={formValues.role}
                onValueChange={(value: any) => setFormValues({...formValues, role: value})}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Maintainer">Maintainer</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-teams">Teams</Label>
              <Select>
                <SelectTrigger id="edit-teams">
                  <SelectValue placeholder="Select teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dev Team">Dev Team</SelectItem>
                  <SelectItem value="Sales Team">Sales Team</SelectItem>
                  <SelectItem value="Marketing Team">Marketing Team</SelectItem>
                  <SelectItem value="CXO">CXO</SelectItem>
                  <SelectItem value="Interns">Interns</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground mt-1">
                Current teams: {formValues.teams.join(", ") || "None"}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="edit-active"
                checked={formValues.isActive}
                onCheckedChange={(checked) => setFormValues({...formValues, isActive: checked})}
              />
              <Label htmlFor="edit-active">Active account</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => saveUser(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManagement;
