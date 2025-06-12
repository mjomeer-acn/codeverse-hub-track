
import React, { useState } from 'react';
import TeamSidebar from '@/components/team/TeamSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Save } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

const TeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    { name: 'Alex Rodriguez', role: 'Team Lead & AI Specialist', avatar: '/placeholder.svg' },
    { name: 'Sarah Chen', role: 'Machine Learning Engineer', avatar: '/placeholder.svg' },
    { name: 'Mike Johnson', role: 'Data Scientist', avatar: '/placeholder.svg' },
    { name: 'Emily Davis', role: 'Backend Developer', avatar: '/placeholder.svg' },
  ]);
  
  const [newMember, setNewMember] = useState({ name: '', role: '', avatar: '/placeholder.svg' });
  const { toast } = useToast();

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role) {
      toast({
        title: "Error",
        description: "Please fill in member name and role",
        variant: "destructive",
      });
      return;
    }

    setMembers([...members, newMember]);
    setNewMember({ name: '', role: '', avatar: '/placeholder.svg' });
    
    toast({
      title: "Success",
      description: "Team member added successfully",
    });
  };

  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
    toast({
      title: "Success",
      description: "Team member removed",
    });
  };

  const handleSaveTeam = () => {
    // In a real app, this would make an API call
    console.log('Saving team members:', members);
    
    toast({
      title: "Success",
      description: "Team updated successfully",
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <TeamSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text">Manage Team</h1>
            <p className="text-muted-foreground">Add and manage your team members</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Team Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {members.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveMember(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button onClick={handleSaveTeam} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Team Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add New Member</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="memberName">Member Name</Label>
                  <Input
                    id="memberName"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Enter member name"
                  />
                </div>

                <div>
                  <Label htmlFor="memberRole">Role</Label>
                  <Input
                    id="memberRole"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    placeholder="e.g., Frontend Developer, Designer"
                  />
                </div>

                <Button onClick={handleAddMember} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>

                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Team Guidelines:</p>
                  <ul className="space-y-1">
                    <li>• Maximum 6 members per team</li>
                    <li>• All members must be internal employees</li>
                    <li>• Diverse skill sets are encouraged</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamManagement;
