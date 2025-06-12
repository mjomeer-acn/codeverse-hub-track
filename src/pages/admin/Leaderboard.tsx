
import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { dataService, Team, Challenge } from '@/services/dataService';

const AdminLeaderboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [leaderboard, setLeaderboard] = useState<(Team & { totalPoints: number })[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teamsData, challengesData, leaderboardData] = await Promise.all([
        dataService.getTeams(),
        dataService.getAllChallenges(),
        dataService.getLeaderboard()
      ]);
      
      setTeams(teamsData);
      setChallenges(challengesData);
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const data = await dataService.getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const handleAssignPoints = async () => {
    if (!selectedTeam || !points) {
      toast({
        title: "Error",
        description: "Please fill in team and points fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await dataService.assignPoints(parseInt(selectedTeam), parseInt(points), description);

      toast({
        title: "Success",
        description: "Points assigned successfully",
      });

      // Reset form
      setSelectedTeam('');
      setSelectedChallenge('');
      setPoints('');
      setDescription('');
      
      fetchLeaderboard();
    } catch (error) {
      console.error('Error assigning points:', error);
      toast({
        title: "Error",
        description: "Failed to assign points",
        variant: "destructive",
      });
    }
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
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id.toString()}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="challenge">Challenge (Optional)</Label>
                  <Select value={selectedChallenge} onValueChange={setSelectedChallenge}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a challenge" />
                    </SelectTrigger>
                    <SelectContent>
                      {challenges.map((challenge) => (
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

            <Card>
              <CardHeader>
                <CardTitle>Current Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((team, index) => (
                    <div key={team.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="font-bold text-lg">#{index + 1}</div>
                        <div>
                          <div className="font-medium">{team.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {team.members?.length || 0} members
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
