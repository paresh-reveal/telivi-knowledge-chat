
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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Plus, Search, Trash, Edit, Users } from "lucide-react";

// Mock team data
interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
}

const initialTeams: Team[] = [
  { id: "1", name: "Dev Team", description: "Software development team", memberCount: 12, createdAt: "2023-01-15" },
  { id: "2", name: "Sales Team", description: "Sales and business development", memberCount: 8, createdAt: "2023-02-20" },
  { id: "3", name: "Marketing Team", description: "Marketing and communications", memberCount: 6, createdAt: "2023-03-10" },
  { id: "4", name: "CXO", description: "Executive leadership team", memberCount: 5, createdAt: "2023-01-05" },
  { id: "5", name: "Interns", description: "Interns and trainees", memberCount: 4, createdAt: "2023-04-01" },
];

const TeamsManagement = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddTeamDialogOpen, setIsAddTeamDialogOpen] = useState(false);
  const [isEditTeamDialogOpen, setIsEditTeamDialogOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  
  // Form values for add/edit
  const [formValues, setFormValues] = useState({
    name: "",
    description: ""
  });

  // Filter teams based on search term
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeam = () => {
    setFormValues({
      name: "",
      description: ""
    });
    setIsAddTeamDialogOpen(true);
  };

  const handleEditTeam = (team: Team) => {
    setCurrentTeam(team);
    setFormValues({
      name: team.name,
      description: team.description
    });
    setIsEditTeamDialogOpen(true);
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter(team => team.id !== teamId));
    toast({
      title: "Team Deleted",
      description: "The team has been successfully removed.",
    });
  };

  const saveTeam = (isNew: boolean) => {
    if (isNew) {
      // Add new team
      const newTeam: Team = {
        id: Date.now().toString(),
        name: formValues.name,
        description: formValues.description,
        memberCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setTeams([...teams, newTeam]);
      setIsAddTeamDialogOpen(false);
      
      toast({
        title: "Team Created",
        description: "New team has been added successfully.",
      });
    } else if (currentTeam) {
      // Edit existing team
      setTeams(teams.map(team => 
        team.id === currentTeam.id 
          ? { 
              ...team, 
              name: formValues.name,
              description: formValues.description
            } 
          : team
      ));
      
      setIsEditTeamDialogOpen(false);
      
      toast({
        title: "Team Updated",
        description: "Team details have been updated successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">Team Management</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search teams..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={handleAddTeam}>
            <Plus className="mr-2 h-4 w-4" />
            Add Team
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {team.name}
                    </div>
                  </TableCell>
                  <TableCell>{team.description}</TableCell>
                  <TableCell>{team.memberCount}</TableCell>
                  <TableCell>{team.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditTeam(team)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteTeam(team.id)}>
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No teams found. Try adjusting your search or create a new team.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Team Dialog */}
      <Dialog open={isAddTeamDialogOpen} onOpenChange={setIsAddTeamDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription>
              Add a new team to organize users and manage access control.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                value={formValues.name}
                onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                placeholder="Engineering Team"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={formValues.description}
                onChange={(e) => setFormValues({...formValues, description: e.target.value})}
                placeholder="Brief description of the team's purpose"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTeamDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => saveTeam(true)}>
              Create Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Team Dialog */}
      <Dialog open={isEditTeamDialogOpen} onOpenChange={setIsEditTeamDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription>
              Update team details and configuration.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Team Name</Label>
              <Input
                id="edit-name"
                value={formValues.name}
                onChange={(e) => setFormValues({...formValues, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                rows={3}
                value={formValues.description}
                onChange={(e) => setFormValues({...formValues, description: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTeamDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => saveTeam(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamsManagement;
