
import React, { useState, useEffect } from 'react';
import TeamSidebar from '@/components/team/TeamSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Trophy, Target, Settings } from 'lucide-react';
import { dataService, Team } from '@/services/dataService';

const TeamDashboard = () => {
  const [team, setTeam] = useState<Team | null>(null);
  const [teamRank, setTeamRank] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // For demo purposes, using team ID 1 (Neural Ninjas)
  const teamId = 1;

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      const [teamData, leaderboard] = await Promise.all([
        dataService.getTeamById(teamId),
        dataService.getLeaderboard()
      ]);
      
      setTeam(teamData);
      
      // Find team rank in leaderboard
      const rank = leaderboard.findIndex(t => t.id === teamId) + 1;
      setTeamRank(rank);
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      setLoading(false);
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
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text">Team Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {team.name}!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Rank</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#{teamRank}</div>
                <p className="text-xs text-muted-foreground">Current position</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                <Target className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{team.points.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Points earned</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Challenges</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{team.challenges.length}</div>
                <p className="text-xs text-muted-foreground">Participating in</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">{team.name}</h3>
                  <p className="text-muted-foreground">{team.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Team Members ({team.members.length})</h4>
                  <div className="space-y-2">
                    {team.members.map((member, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span>{member.avatar}</span>
                        <span className="font-medium">{member.name}</span>
                        <span className="text-muted-foreground">- {member.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" asChild>
                  <Link to={`/team/${team.id}/profile`}>
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Team Profile
                  </Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to={`/team/${team.id}/management`}>
                    <Users className="mr-2 h-4 w-4" />
                    Manage Team Members
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  Update your team description, add team members, and upload team photos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamDashboard;
