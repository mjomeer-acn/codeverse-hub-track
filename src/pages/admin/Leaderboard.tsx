
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { dataService } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

const AdminLeaderboard = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const { data: teams } = useQuery({
    queryKey: ['admin-teams'],
    queryFn: dataService.getTeams,
  });

  const { data: challenges } = useQuery({
    queryKey: ['admin-challenges'],
    queryFn: dataService.getChallenges,
  });

  const { data: leaderboard } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: dataService.getLeaderboard,
  });

  const handleAssignPoints = () => {
    if (!selectedTeam || !points || !selectedChallenge) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API call to update points
    console.log('Assigning points:', {
      teamId: selectedTeam,
      challengeId: selectedChallenge,
      points: parseInt(points),
      description
    });

    toast({
      title: "Success",
      description: "Points assigned successfully",
    });

    // Reset form
    setSelectedTeam('');
    setSelectedChallenge('');
    setPoints('');
    setDescription('');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text">Manage Leaderboard</h1>
            <p className="text-muted-foreground">Assign points to teams for completed challenges</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assign Points Form */}
            <Card>
              <CardHeader>
                <CardTitle>Assign Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="team">Team *</Label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams?.map((team) => (
                        <SelectItem key={team.id} value={team.id.toString()}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="challenge">Challenge *</Label>
                  <Select value={selectedChallenge} onValueChange={setSelectedChallenge}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a challenge" />
                    </SelectTrigger>
                    <SelectContent>
                      {challenges?.map((challenge) => (
                        <SelectItem key={challenge.id} value={challenge.id.toString()}>
                          {challenge.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="points">Points *</Label>
                  <Input
                    id="points"
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    placeholder="Enter points to assign"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional description or notes"
                    rows={3}
                  />
                </div>

                <Button onClick={handleAssignPoints} className="w-full">
                  Assign Points
                </Button>
              </CardContent>
            </Card>

            {/* Current Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Current Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard?.map((team, index) => (
                    <div key={team.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="font-bold text-lg">#{index + 1}</div>
                        <div>
                          <div className="font-medium">{team.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {team.members.length} members
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{team.totalPoints}</div>
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLeaderboard;
