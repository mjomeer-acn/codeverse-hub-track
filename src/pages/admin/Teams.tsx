
import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Edit, Save, X, Search, Users } from 'lucide-react';
import { dataService, Team } from '@/services/dataService';
import { useNavigate } from 'react-router-dom';

const AdminTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTeam, setEditingTeam] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Team>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const data = await dataService.getTeams();
      setTeams(data || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast({
        title: "Error",
        description: "Failed to fetch teams",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team.id);
    setEditData({ ...team });
  };

  const handleSave = async () => {
    if (!editingTeam) return;
    
    try {
      await dataService.updateTeam(editingTeam, editData);
      toast({
        title: "Success",
        description: "Team updated successfully",
      });
      setEditingTeam(null);
      fetchTeams();
    } catch (error) {
      console.error('Error updating team:', error);
      toast({
        title: "Error",
        description: "Failed to update team",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingTeam(null);
    setEditData({});
  };

  const handleManageTeam = (teamId: number) => {
    navigate(`/team/${teamId}/management`);
  };

  const filteredTeams = teams.filter(team =>
    team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.accountId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
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
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text">Manage Teams</h1>
            <p className="text-muted-foreground">Edit team details, members, and credentials</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search teams by name or account ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTeams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {editingTeam === team.id ? (
                      <Input
                        value={editData.name || ''}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="text-lg font-bold"
                      />
                    ) : (
                      team.name || 'Unnamed Team'
                    )}
                    <div className="flex space-x-2">
                      {editingTeam === team.id ? (
                        <>
                          <Button size="sm" onClick={handleSave}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(team)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={() => handleManageTeam(team.id)}>
                            <Users className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Description</Label>
                    {editingTeam === team.id ? (
                      <Textarea
                        value={editData.description || ''}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{team.description || 'No description'}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label>Account ID</Label>
                    {editingTeam === team.id ? (
                      <Input
                        value={editData.accountId || ''}
                        onChange={(e) => setEditData({ ...editData, accountId: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm font-mono">{team.accountId || 'No Account ID'}</p>
                    )}
                  </div>

                  <div>
                    <Label>Members ({team.members?.length || 0})</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {team.members && team.members.length > 0 ? (
                        team.members.map((member, index) => (
                          <div key={index} className="bg-muted px-2 py-1 rounded text-sm">
                            {member.avatar} {member.name} - {member.role}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No members</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Points:</span> {team.points || 0}
                    </div>
                    <div>
                      <span className="font-medium">Challenges:</span> {team.challenges?.length || 0}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTeams.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No teams found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminTeams;
