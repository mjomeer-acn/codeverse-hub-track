
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Trophy, Calendar } from 'lucide-react';
import { dataService, Team, Challenge } from '@/services/dataService';

const TeamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<Team | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!id) return;
      
      try {
        const teamData = await dataService.getTeamById(parseInt(id));
        setTeam(teamData);
        
        if (teamData) {
          const teamChallenges = await dataService.getTeamChallenges(teamData.id);
          setChallenges(teamChallenges);
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Team not found</h1>
            <Button asChild className="mt-4">
              <Link to="/teams">Back to Teams</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Back Button */}
          <Button variant="ghost" asChild>
            <Link to="/teams">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Teams
            </Link>
          </Button>

          {/* Team Header */}
          <Card className="relative overflow-hidden">
            {team.photo && (
              <div className="absolute inset-0">
                <img 
                  src={team.photo} 
                  alt={`${team.name} banner`}
                  className="w-full h-full object-cover opacity-10"
                />
              </div>
            )}
            <CardHeader className="relative z-10">
              <div className="flex items-center space-x-4">
                <div className="text-6xl">{team.avatar}</div>
                <div>
                  <CardTitle className="text-3xl font-bold gradient-text">{team.name}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{team.members.length} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4" />
                      <span>{team.points.toLocaleString()} points</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{challenges.length} active challenges</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {team.description}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.members.map((member, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <span className="text-2xl">{member.avatar}</span>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Challenges */}
            <Card>
              <CardHeader>
                <CardTitle>Active Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {challenges.map((challenge) => (
                    <div 
                      key={challenge.id}
                      className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-xl">{challenge.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{challenge.title}</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {challenge.category} • {challenge.difficulty}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {challenge.maxPoints} points
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {challenge.timeRemaining} left
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  {challenges.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      No active challenges
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
