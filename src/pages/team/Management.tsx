
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeamSidebar from '@/components/team/TeamSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Save, Upload } from 'lucide-react';
import { dataService, Team, TeamMember } from '@/services/dataService';

const TeamManagement = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [teamPhoto, setTeamPhoto] = useState('');
  const [newMember, setNewMember] = useState<TeamMember>({ name: '', role: '', avatar: '👨‍💻' });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (teamId) {
      fetchTeam();
    }
  }, [teamId]);

  const fetchTeam = async () => {
    try {
      const data = await dataService.getTeamById(parseInt(teamId!));
      setTeam(data);
      setTeamName(data?.name || '');
      setDescription(data?.description || '');
      setTeamPhoto(data?.photo || '');
    } catch (error) {
      console.error('Error fetching team:', error);
      toast({
        title: "Error",
        description: "Failed to fetch team data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!team) return;
    
    try {
      await dataService.updateTeam(team.id, { 
        name: teamName,
        description,
        photo: teamPhoto
      });
      
      toast({
        title: "Success",
        description: "Team profile updated successfully",
      });
      
      fetchTeam();
    } catch (error) {
      console.error('Error updating team:', error);
      toast({
        title: "Error",
        description: "Failed to update team profile",
        variant: "destructive",
      });
    }
  };

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.role || !team) {
      toast({
        title: "Error",
        description: "Please fill in member name and role",
        variant: "destructive",
      });
      return;
    }

    if (team.members.length >= 4) {
      toast({
        title: "Error",
        description: "Maximum 4 members per team",
        variant: "destructive",
      });
      return;
    }

    try {
      await dataService.addTeamMember(team.id, newMember);
      setNewMember({ name: '', role: '', avatar: '👨‍💻' });
      
      toast({
        title: "Success",
        description: "Team member added successfully",
      });
      
      fetchTeam();
    } catch (error) {
      console.error('Error adding member:', error);
      toast({
        title: "Error",
        description: "Failed to add team member",
        variant: "destructive",
      });
    }
  };

  const handleRemoveMember = async (memberIndex: number) => {
    if (!team) return;
    
    try {
      await dataService.removeTeamMember(team.id, memberIndex);
      toast({
        title: "Success",
        description: "Team member removed",
      });
      fetchTeam();
    } catch (error) {
      console.error('Error removing member:', error);
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // For demo purposes, we'll use a placeholder URL
    // In a real app, you'd upload to a file storage service
    const placeholderUrl = `https://images.unsplash.com/photo-${Date.now()}`;
    setTeamPhoto(placeholderUrl);
    
    toast({
      title: "Success",
      description: "Photo uploaded successfully",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <TeamSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex min-h-screen bg-background">
        <TeamSidebar />
        <main className="flex-1 p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Team not found</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <TeamSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text">Manage Team</h1>
            <p className="text-muted-foreground">Update team information, photo, and manage members</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Team Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe your team's mission, skills, and approach..."
                  />
                </div>

                <Button onClick={handleSaveProfile} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Photo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {teamPhoto ? (
                    <img
                      src={teamPhoto}
                      alt="Team photo"
                      className="max-w-full h-48 object-cover mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="h-48 flex items-center justify-center text-muted-foreground">
                      No team photo uploaded
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="photo">Upload Team Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload a high-quality photo of your team (max 5MB)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Team Members ({team.members.length}/4)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {team.members.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                        {member.avatar}
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
                
                {team.members.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    No team members added yet
                  </p>
                )}
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

                <Button 
                  onClick={handleAddMember} 
                  className="w-full"
                  disabled={team.members.length >= 4}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>

                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Team Guidelines:</p>
                  <ul className="space-y-1">
                    <li>• Maximum 4 members per team</li>
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
