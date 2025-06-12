
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeamSidebar from '@/components/team/TeamSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Save } from 'lucide-react';
import { teamsService, teamMembersService } from '@/services/supabaseService';
import { supabase } from '@/integrations/supabase/client';

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  avatar: string;
}

const TeamManagement = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState<any>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [description, setDescription] = useState('');
  const [newMember, setNewMember] = useState<TeamMember>({ name: '', role: '', avatar: '👨‍💻' });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (teamId) {
      fetchTeam();
    }

    // Set up real-time subscription for team members
    const channel = supabase
      .channel('team-members-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_members',
          filter: `team_id=eq.${teamId}`
        },
        () => {
          fetchTeam();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [teamId]);

  const fetchTeam = async () => {
    try {
      const data = await teamsService.getTeamById(teamId!);
      setTeam(data);
      setMembers(data.team_members || []);
      setDescription(data.description || '');
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

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.role) {
      toast({
        title: "Error",
        description: "Please fill in member name and role",
        variant: "destructive",
      });
      return;
    }

    if (members.length >= 4) {
      toast({
        title: "Error",
        description: "Maximum 4 members per team",
        variant: "destructive",
      });
      return;
    }

    try {
      await teamMembersService.addMember(teamId!, newMember);
      setNewMember({ name: '', role: '', avatar: '👨‍💻' });
      
      toast({
        title: "Success",
        description: "Team member added successfully",
      });
    } catch (error) {
      console.error('Error adding member:', error);
      toast({
        title: "Error",
        description: "Failed to add team member",
        variant: "destructive",
      });
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await teamMembersService.deleteMember(memberId);
      toast({
        title: "Success",
        description: "Team member removed",
      });
    } catch (error) {
      console.error('Error removing member:', error);
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive",
      });
    }
  };

  const handleSaveTeam = async () => {
    try {
      await teamsService.updateTeam(teamId!, { description });
      
      toast({
        title: "Success",
        description: "Team updated successfully",
      });
    } catch (error) {
      console.error('Error updating team:', error);
      toast({
        title: "Error",
        description: "Failed to update team",
        variant: "destructive",
      });
    }
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

  return (
    <div className="flex min-h-screen bg-background">
      <TeamSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text">Manage Team</h1>
            <p className="text-muted-foreground">Add and manage your team members</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Team Description/Tagline</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your team's mission, skills, and approach..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleSaveTeam}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Description
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Team Members ({members.length}/4)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
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
                        onClick={() => handleRemoveMember(member.id!)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {members.length === 0 && (
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
                    disabled={members.length >= 4}
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
        </div>
      </main>
    </div>
  );
};

export default TeamManagement;
