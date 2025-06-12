
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { dataService } from '@/services/dataService';
import { Edit, Save, X } from 'lucide-react';

const AdminTeams = () => {
  const [editingTeam, setEditingTeam] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});

  const { data: teams, isLoading } = useQuery({
    queryKey: ['admin-teams'],
    queryFn: dataService.getTeams,
  });

  const handleEdit = (team: any) => {
    setEditingTeam(team.id);
    setEditData({ ...team });
  };

  const handleSave = async () => {
    // In a real app, this would make an API call
    console.log('Saving team:', editData);
    setEditingTeam(null);
  };

  const handleCancel = () => {
    setEditingTeam(null);
    setEditData({});
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text">Manage Teams</h1>
            <p className="text-muted-foreground">Edit team details, members, and credentials</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teams?.map((team) => (
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
                      team.name
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
                        <Button size="sm" variant="outline" onClick={() => handleEdit(team)}>
                          <Edit className="h-4 w-4" />
                        </Button>
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
                      <p className="text-sm text-muted-foreground">{team.description}</p>
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
                      <p className="text-sm font-mono">{team.accountId}</p>
                    )}
                  </div>

                  <div>
                    <Label>Members ({team.members.length})</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {team.members.map((member, index) => (
                        <div key={index} className="bg-muted px-2 py-1 rounded text-sm">
                          {member.name} - {member.role}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Points:</span> {team.points}
                    </div>
                    <div>
                      <span className="font-medium">Challenges:</span> {team.challenges.length}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminTeams;
